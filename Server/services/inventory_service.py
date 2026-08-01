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
    return inventory

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
