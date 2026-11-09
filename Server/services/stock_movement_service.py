from sqlalchemy.orm import Session
from model.stock_movement_model import StockMovement


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