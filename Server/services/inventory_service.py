from model.inventory_model import Inventory
from sqlalchemy.orm import Session
from fastapi import HTTPException

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

def get_inventory(db:Session,current_user):
    inventory=db.query(Inventory).filter(
        Inventory.user_id==current_user.id   
    ).all()
    total_products = len(inventory)

    total_stock = sum(item.quantity for item in inventory)

    total_cost = sum(item.quantity * item.cost_price for item in inventory)

    total_value = sum(item.quantity * item.selling_price for item in inventory)
    return {
    "inventory": inventory,
    "stats": {
        "total_products": total_products,
        "total_stock": total_stock,
        "total_cost": total_cost,
        "total_value": total_value
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
    return inventory
