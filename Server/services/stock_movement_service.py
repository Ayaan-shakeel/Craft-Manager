from sqlalchemy.orm import Session
from model.stock_movement_model import StockMovement
from fastapi import HTTPException
from model.inventory_model import Inventory


def record_stock_movement(
    db: Session,
    current_user,
    inventory,
    movement_type: str,
    previous_quantity: int,
    quantity_changed: int,
    reason: str
):

    new_quantity = inventory.quantity

    movement = StockMovement(
        user_id=current_user.id,
        inventory_id=inventory.id,
        product_name=inventory.product_name,
        movement_type=movement_type,
        previous_quantity=previous_quantity,
        quantity_changed=quantity_changed,
        new_quantity=new_quantity,
        reason=reason
    )

    db.add(movement)

    return movement


def get_stock_movements(db: Session, inventory_id: int, current_user):

    inventory = db.query(Inventory).filter(
        Inventory.id == inventory_id,
        Inventory.user_id == current_user.id
    ).first()

    if inventory is None:
        raise HTTPException(
            status_code=404,
            detail="Inventory not found"
        )
    movements = db.query(StockMovement).filter(
        StockMovement.inventory_id == inventory_id,
        StockMovement.user_id == current_user.id
    ).order_by(
        StockMovement.created_at.desc()
    ).all()

    return movements