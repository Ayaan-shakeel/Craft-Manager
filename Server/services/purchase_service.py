from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from fastapi import HTTPException
from decimal import Decimal
from uuid import uuid4

from model.purchase_model import Purchase
from model.purchase_item_model import PurchaseItem
from model.inventory_model import Inventory
from model.supplier_model import Supplier

from schema.purchase_schema import PurchaseCreate
from services.stock_movement_service import record_stock_movement
from sqlalchemy import func, extract

def create_purchase(db: Session, purchase_data: PurchaseCreate, current_user):

    if not purchase_data.items:
        raise HTTPException(
            status_code=400,
            detail="Purchase must contain at least one item"
        )

    # Validate supplier ownership
    supplier = db.query(Supplier).filter(
        Supplier.id == purchase_data.supplier_id,
        Supplier.user_id == current_user.id
    ).first()

    if supplier is None:
        raise HTTPException(
            status_code=404,
            detail="Supplier not found"
        )

    try:

        total_amount = Decimal("0.00")

        # Create purchase record
        new_purchase = Purchase(
            purchase_number=f"PUR-{uuid4().hex[:10].upper()}",
            supplier_id=supplier.id,
            user_id=current_user.id,
            total_amount=Decimal("0.00"),
            status="received",
            notes=purchase_data.notes
        )

        db.add(new_purchase)
        db.flush()

        # Process purchase items
        for item_data in purchase_data.items:

            if item_data.quantity <= 0:
                raise HTTPException(
                    status_code=400,
                    detail="Purchase quantity must be greater than zero"
                )

            if item_data.unit_cost < 0:
                raise HTTPException(
                    status_code=400,
                    detail="Unit cost cannot be negative"
                )

            # Validate inventory ownership
            inventory = db.query(Inventory).filter(
                Inventory.id == item_data.inventory_id,
                Inventory.user_id == current_user.id
            ).first()

            if inventory is None:
                raise HTTPException(
                    status_code=404,
                    detail=f"Inventory item {item_data.inventory_id} not found"
                )

            previous_quantity = inventory.quantity

            unit_cost = Decimal(str(item_data.unit_cost))

            subtotal = unit_cost * item_data.quantity

            # Increase inventory quantity
            inventory.quantity += item_data.quantity

            # Create purchase item
            purchase_item = PurchaseItem(
                purchase_id=new_purchase.id,
                inventory_id=inventory.id,
                quantity=item_data.quantity,
                unit_cost=unit_cost,
                subtotal=subtotal
            )

            db.add(purchase_item)

            # Record stock movement
            record_stock_movement(
                db=db,
                current_user=current_user,
                inventory=inventory,
                movement_type="purchase",
                previous_quantity=previous_quantity,
                quantity_changed=item_data.quantity,
                reason=f"Stock received from purchase {new_purchase.purchase_number}"
            )

            total_amount += subtotal

        new_purchase.total_amount = total_amount

        db.commit()

        db.refresh(new_purchase)

        return new_purchase

    except HTTPException:
        db.rollback()
        raise

    except SQLAlchemyError:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail="Failed to create purchase"
        )


def get_purchases(db: Session, current_user):

    purchases = db.query(Purchase).filter(
        Purchase.user_id == current_user.id
    ).order_by(
        Purchase.created_at.desc()
    ).all()

    return purchases


def get_single_purchase(db: Session, purchase_id: int, current_user):

    purchase = db.query(Purchase).filter(
        Purchase.id == purchase_id,
        Purchase.user_id == current_user.id
    ).first()

    if purchase is None:
        raise HTTPException(
            status_code=404,
            detail="Purchase not found"
        )

    return purchase


def get_purchase_items(db: Session, purchase_id: int, current_user):

    purchase = get_single_purchase(
        db,
        purchase_id,
        current_user
    )

    items = db.query(PurchaseItem).filter(
        PurchaseItem.purchase_id == purchase.id
    ).all()

    return items

def purchase_analytics(db: Session, current_user):

    # 1. Total purchases
    total_purchases = db.query(Purchase).filter(
        Purchase.user_id == current_user.id
    ).count()

    # 2. Total spending
    total_spending = (
        db.query(func.sum(Purchase.total_amount))
        .filter(
            Purchase.user_id == current_user.id,
            Purchase.status != "cancelled"
        )
        .scalar() or 0
    )

    # 3. Average purchase value
    average_purchase_value = (
        total_spending / total_purchases
        if total_purchases > 0 else 0
    )

    # 4. Monthly spending
    monthly_spending = (
        db.query(
            extract("month", Purchase.created_at).label("month"),
            func.sum(Purchase.total_amount).label("spending")
        )
        .filter(
            Purchase.user_id == current_user.id,
            Purchase.status != "cancelled"
        )
        .group_by(extract("month", Purchase.created_at))
        .order_by(extract("month", Purchase.created_at))
        .all()
    )

    months = [
        "",
        "Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"
    ]

    monthly_spending = [
        {
            "month": months[int(row.month)],
            "spending": float(row.spending or 0)
        }
        for row in monthly_spending
    ]

    # 5. Top suppliers
    top_suppliers = (
        db.query(
            Supplier.id.label("supplier_id"),
            Supplier.supplier_name.label("supplier_name"),
            func.sum(Purchase.total_amount).label("total_spending"),
            func.count(Purchase.id).label("purchase_count")
        )
        .join(
            Purchase,
            Purchase.supplier_id == Supplier.id
        )
        .filter(
            Purchase.user_id == current_user.id,
            Purchase.status != "cancelled"
        )
        .group_by(
            Supplier.id,
            Supplier.supplier_name
        )
        .order_by(
            func.sum(Purchase.total_amount).desc()
        )
        .limit(5)
        .all()
    )

    top_suppliers = [
        {
            "supplier_id": row.supplier_id,
            "supplier_name": row.supplier_name,
            "total_spending": float(row.total_spending or 0),
            "purchase_count": row.purchase_count
        }
        for row in top_suppliers
    ]

    # 6. Top purchased products
    top_products = (
        db.query(
            Inventory.id.label("inventory_id"),
            Inventory.product_name.label("product_name"),
            func.sum(PurchaseItem.quantity).label("total_quantity"),
            func.sum(PurchaseItem.subtotal).label("total_spending")
        )
        .join(
            PurchaseItem,
            PurchaseItem.inventory_id == Inventory.id
        )
        .join(
            Purchase,
            Purchase.id == PurchaseItem.purchase_id
        )
        .filter(
            Purchase.user_id == current_user.id,
            Purchase.status != "cancelled",
            Inventory.user_id == current_user.id
        )
        .group_by(
            Inventory.id,
            Inventory.product_name
        )
        .order_by(
            func.sum(PurchaseItem.quantity).desc()
        )
        .limit(5)
        .all()
    )

    top_products = [
        {
            "inventory_id": row.inventory_id,
            "product_name": row.product_name,
            "total_quantity": int(row.total_quantity or 0),
            "total_spending": float(row.total_spending or 0)
        }
        for row in top_products
    ]

    # 7. Recent purchases
    recent_purchases = (
        db.query(Purchase)
        .filter(
            Purchase.user_id == current_user.id
        )
        .order_by(Purchase.created_at.desc())
        .limit(5)
        .all()
    )

    recent_purchases_data = [
        {
            "id": purchase.id,
            "purchase_number": purchase.purchase_number,
            "supplier_id": purchase.supplier_id,
            "total_amount": float(purchase.total_amount or 0),
            "status": purchase.status,
            "created_at": purchase.created_at
        }
        for purchase in recent_purchases
    ]

    return {
        "total_purchases": total_purchases,
        "total_spending": float(total_spending),
        "average_purchase_value": float(average_purchase_value),
        "monthly_spending": monthly_spending,
        "top_suppliers": top_suppliers,
        "top_products": top_products,
        "recent_purchases": recent_purchases_data
    }