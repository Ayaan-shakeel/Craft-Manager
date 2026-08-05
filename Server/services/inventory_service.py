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

def get_inventory(db: Session, current_user):
    inventory = db.query(Inventory).filter(
        Inventory.user_id == current_user.id
    ).all()

    total_products = len(inventory)
    total_stock = sum(item.quantity for item in inventory)
    total_cost = sum(item.quantity * item.cost_price for item in inventory)
    total_value = sum(item.quantity * item.selling_price for item in inventory)

    critical_stock = 0
    low_stock = 0
    out_of_stock = 0

    inventory_data = []

    for item in inventory:

        if item.quantity == 0:
            stock_status = "Out of Stock"
            out_of_stock += 1

        elif item.quantity <= 10:
            stock_status = "Critical"
            critical_stock += 1

        elif item.quantity <= 30:
            stock_status = "Low Stock"
            low_stock += 1

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
            "stock_status": stock_status
        })

    return {
        "inventory": inventory_data,
        "stats": {
            "total_products": total_products,
            "total_stock": total_stock,
            "total_cost": total_cost,
            "total_value": total_value,
            "critical_stock": critical_stock,
            "low_stock": low_stock,
            "out_of_stock": out_of_stock
        }
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
    total_sales=(units_sold * inventory.selling_price) or 0
    estimated_cost=(units_sold * inventory.cost_price) or 0
    estimated_profit=(revenue-estimated_cost) or 0
    profit_margin=0
    if revenue > 0:
        profit_margin=round(
            (estimated_profit/revenue) * 100,
             2
        )
        current_stock=(inventory.quantity) or 0
        inventory_value=(inventory.cost_price * inventory.quantity) or 0
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
