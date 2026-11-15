from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user

from model.user_model import User

from schema.supplier_schema import (
    SupplierCreate,
    SupplierUpdate
)

from services.supplier_service import (
    create_supplier,
    get_suppliers,
    get_single_supplier,
    update_supplier,
    delete_supplier
)


router = APIRouter(
    prefix="/api",
    tags=["Suppliers"]
)


# Create Supplier
@router.post("/suppliers", status_code=status.HTTP_201_CREATED)
def create_new_supplier(
    supplier: SupplierCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_supplier = create_supplier(db, supplier, current_user)

    return {
        "status_code": 201,
        "message": "Supplier added successfully",
        "supplier": new_supplier
    }


# Get All Suppliers
@router.get("/suppliers", status_code=status.HTTP_200_OK)
def get_all_suppliers(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    suppliers = get_suppliers(db, current_user)

    return {
        "message": "Suppliers retrieved successfully",
        "count": len(suppliers),
        "suppliers": suppliers
    }


# Get Single Supplier
@router.get("/suppliers/{supplier_id}", status_code=status.HTTP_200_OK)
def get_supplier(
    supplier_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    supplier = get_single_supplier(db, supplier_id, current_user)

    return {
        "message": "Supplier retrieved successfully",
        "supplier": supplier
    }


# Update Supplier
@router.put("/suppliers/{supplier_id}", status_code=status.HTTP_200_OK)
def update_existing_supplier(
    supplier_id: int,
    supplier: SupplierUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    updated_supplier = update_supplier(
        db,
        supplier_id,
        supplier,
        current_user
    )

    return {
        "message": "Supplier updated successfully",
        "supplier": updated_supplier
    }


# Delete Supplier
@router.delete("/suppliers/{supplier_id}", status_code=status.HTTP_200_OK)
def remove_supplier(
    supplier_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    result = delete_supplier(db, supplier_id, current_user)

    return result