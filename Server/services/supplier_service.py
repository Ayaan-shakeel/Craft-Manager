from sqlalchemy.orm import Session
from fastapi import HTTPException

from model.supplier_model import Supplier
from schema.supplier_schema import SupplierCreate, SupplierUpdate


# Create Supplier
def create_supplier(
    db: Session,
    supplier_data: SupplierCreate,
    current_user
):
    new_supplier = Supplier(
        **supplier_data.model_dump(),
        user_id=current_user.id
    )

    db.add(new_supplier)
    db.commit()
    db.refresh(new_supplier)

    return new_supplier


# Get All Suppliers
def get_suppliers(db: Session, current_user):

    suppliers = db.query(Supplier).filter(
        Supplier.user_id == current_user.id
    ).order_by(
        Supplier.created_at.desc()
    ).all()

    return suppliers


# Get Single Supplier
def get_single_supplier(
    db: Session,
    supplier_id: int,
    current_user
):
    supplier = db.query(Supplier).filter(
        Supplier.id == supplier_id,
        Supplier.user_id == current_user.id
    ).first()

    if supplier is None:
        raise HTTPException(
            status_code=404,
            detail="Supplier not found"
        )

    return supplier


# Update Supplier
def update_supplier(
    db: Session,
    supplier_id: int,
    supplier_data: SupplierUpdate,
    current_user
):
    supplier = get_single_supplier(db, supplier_id, current_user)

    update_data = supplier_data.model_dump()

    for key, value in update_data.items():
        setattr(supplier, key, value)

    db.commit()
    db.refresh(supplier)

    return supplier


# Delete Supplier
def delete_supplier(
    db: Session,
    supplier_id: int,
    current_user
):
    supplier = get_single_supplier(db, supplier_id, current_user)

    db.delete(supplier)
    db.commit()

    return {"message": "Supplier deleted successfully"}