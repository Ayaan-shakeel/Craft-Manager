from model.inventory_model import Inventory
from sqlalchemy.orm import Session
from fastapi import HTTPException
from model.order_model import Orders
from sqlalchemy import func

def create_inventory(db:Session,inventory,current_user):
    new_inventory=Inventory(
        product_name=inventory.product_name,
        quantity=inventory.quantity,
        cost_price=inventory.cost_price,
        selling_price=inventory.selling_price,
        category=inventory.category,
        sku=inventory.sku,
        user_id=current_user.id
    )
    db.add(new_inventory)
    db.commit()
    db.refresh(new_inventory)
    return new_inventory

def get_inventory(
    db: Session,
    current_user,
    search: str = "",
    page: int = 1,
    limit: int = 10,
    sort_by: str = "id",
    sort_order: str = "desc",
):
    # 1. Validate pagination
    if page < 1:
        raise HTTPException(
            status_code=400,
            detail="Page must be at least 1",
        )

    if limit < 1 or limit > 100:
        raise HTTPException(
            status_code=400,
            detail="Limit must be between 1 and 100",
        )

    # 2. Validate sorting
    sort_columns = {
        "id": Inventory.id,
        "product_name": Inventory.product_name,
        "quantity": Inventory.quantity,
        "cost_price": Inventory.cost_price,
        "selling_price": Inventory.selling_price,
    }

    if sort_by not in sort_columns:
        raise HTTPException(
            status_code=400,
            detail="Invalid sort_by field",
        )

    if sort_order.lower() not in ["asc", "desc"]:
        raise HTTPException(
            status_code=400,
            detail="sort_order must be 'asc' or 'desc'",
        )

    # 3. Get only the logged-in user's inventory
    base_query = db.query(Inventory).filter(
        Inventory.user_id == current_user.id
    )

    # 4. Apply search
    if search and search.strip():
        search_term = f"%{search.strip()}%"

        base_query = base_query.filter(
            or_(
                Inventory.product_name.ilike(search_term),
                Inventory.sku.ilike(search_term),
                Inventory.category.ilike(search_term),
            )
        )

    # 5. Calculate statistics for ALL the user's inventory
    # These statistics are independent of the search and pagination.
    all_inventory = db.query(Inventory).filter(
        Inventory.user_id == current_user.id
    ).all()

    total_products = len(all_inventory)

    total_stock = sum(
        item.quantity for item in all_inventory
    )

    total_cost = sum(
        item.quantity * item.cost_price
        for item in all_inventory
    )

    total_value = sum(
        item.quantity * item.selling_price
        for item in all_inventory
    )

    critical_stock = sum(
        1 for item in all_inventory
        if 0 < item.quantity <= 10
    )

    low_stock = sum(
        1 for item in all_inventory
        if 10 < item.quantity <= 30
    )

    out_of_stock = sum(
        1 for item in all_inventory
        if item.quantity == 0
    )

    # 6. Count products matching the search BEFORE pagination
    total = base_query.count()

    # 7. Apply sorting
    sort_column = sort_columns[sort_by]

    if sort_order.lower() == "asc":
        base_query = base_query.order_by(sort_column.asc())
    else:
        base_query = base_query.order_by(sort_column.desc())

    # 8. Apply pagination
    offset = (page - 1) * limit

    inventory = (
        base_query
        .offset(offset)
        .limit(limit)
        .all()
    )

    # 9. Format the current page
    inventory_data = []

    for item in inventory:
        if item.quantity == 0:
            stock_status = "Out of Stock"
        elif item.quantity <= 10:
            stock_status = "Critical"
        elif item.quantity <= 30:
            stock_status = "Low Stock"
        else:
            stock_status = "In Stock"

        inventory_data.append({
            "id": item.id,
            "product_name": item.product_name,
            "quantity": item.quantity,
            "cost_price": item.cost_price,
            "selling_price": item.selling_price,
            "category": item.category,
            "sku": item.sku,
            "stock_status": stock_status,
        })

    # 10. Return the result
    return {
        "inventory": inventory_data,
        "count": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit,
        "stats": {
            "total_products": total_products,
            "total_stock": total_stock,
            "total_cost": total_cost,
            "total_value": total_value,
            "critical_stock": critical_stock,
            "low_stock": low_stock,
            "out_of_stock": out_of_stock,
        },
    }
def get_single_inventory(db:Session,inventory_id:int,current_user):
    inventory=db.query(Inventory).filter(
        Inventory.id==inventory_id,
        Inventory.user_id==current_user.id
    ).first()
    if inventory is None:
        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )
    units_sold=(
        db.query(func.sum(Orders.quantity)
                ).filter(
                   Orders.inventory_id==inventory.id,
                   Orders.user_id==current_user.id
                   ).scalar()
          ) or 0
    orders_count=(
        db.query(func.count(Orders.id)
                 ).filter(
                      Orders.inventory_id==inventory.id,
                      Orders.user_id==current_user.id
                 ).scalar()
    ) or 0
    revenue=(
        db.query(func.sum(Orders.total_price)
                 ).filter(
                      Orders.inventory_id==inventory.id,
                      Orders.user_id==current_user.id
                 ).scalar()
    ) or 0
    total_sales=units_sold * inventory.selling_price 
    estimated_cost=units_sold * inventory.cost_price 
    estimated_profit=revenue-estimated_cost 
    current_stock=inventory.quantity
    inventory_value=inventory.cost_price * inventory.quantity
    profit_margin=0
    if revenue > 0:
        profit_margin=round(
            (estimated_profit/revenue) * 100,
             2
        )
    recent_orders=(
        db.query(Orders)
        .filter(
             Orders.inventory_id==inventory.id,
             Orders.user_id==current_user.id
        ).order_by(Orders.created_at.desc())
        .limit(5)
        .all()
    )

    return {
  "inventory":{
          "id":inventory.id,
          "product_name":inventory.product_name,
          "quantity":inventory.quantity,
          "cost_price":inventory.cost_price,
          "selling_price":inventory.selling_price,
          "category":inventory.category,
          "sku":inventory.sku
     },
        "analytics":{
            "units_sold":units_sold,
            "orders_count":orders_count,
            "revenue":revenue,
            "total_sales":total_sales,
            "estimated_cost":estimated_cost,
            "estimated_profit":estimated_profit,
            "profit_margin":profit_margin,
            "current_stock":current_stock,
            "inventory_value":inventory_value
        },
        "recent_orders":[{
            "order_id":order.id,
            "customer_name":order.customer.customer_name if order.customer else "Unknown Customer",
            "order_quantity":order.quantity,
            "total_price":order.total_price,
            "order_status":order.status,
            "order.created_at":order.created_at
        }
        for order in recent_orders
        ]
    }

def update_inventory(db:Session,inventory_id:int,inventory_data,current_user):
    inventory=db.query(Inventory).filter(
        Inventory.id==inventory_id,
        Inventory.user_id==current_user.id
    ).first()
    if inventory is None:
        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )
    inventory.product_name=inventory_data.product_name
    inventory.quantity=inventory_data.quantity
    inventory.cost_price=inventory_data.cost_price
    inventory.selling_price=inventory_data.selling_price
    inventory.sku=inventory_data.sku
    inventory.category=inventory_data.category    
    # inventory.stock_status=inventory_data.stock_status  
    db.commit()
    db.refresh(inventory)
    return inventory

def delete_inventory(db:Session,inventory_id:int,current_user):
    inventory=db.query(Inventory).filter(
        Inventory.id == inventory_id,
        Inventory.user_id == current_user.id
    ).first()
    if inventory is None:
        raise HTTPException(
            status_code = 404,
            detail = "Inventory not found"
        )
    db.delete(inventory)
    db.commit()