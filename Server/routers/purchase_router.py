from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user
from model.user_model import User

from schema.purchase_schema import PurchaseCreate

from services.purchase_service import (
    create_purchase,
    get_purchases,
    get_single_purchase,
    get_purchase_items
)

router = APIRouter(prefix="/api", tags=["Purchases"])


@router.post("/purchases", status_code=status.HTTP_201_CREATED)
def create_new_purchase(
    purchase: PurchaseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    new_purchase = create_purchase(
        db,
        purchase,
        current_user
    )

    return {
        "message": "Purchase created successfully",
        "purchase": new_purchase
    }


@router.get("/purchases", status_code=status.HTTP_200_OK)
def get_all_purchases(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    purchases = get_purchases(db, current_user)

    return {
        "message": "Purchases retrieved successfully",
        "count": len(purchases),
        "purchases": purchases
    }


@router.get("/purchases/{purchase_id}", status_code=status.HTTP_200_OK)
def get_purchase(
    purchase_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    purchase = get_single_purchase(
        db,
        purchase_id,
        current_user
    )

    return {
        "message": "Purchase retrieved successfully",
        "purchase": purchase
    }


@router.get("/purchases/{purchase_id}/items", status_code=status.HTTP_200_OK)
def get_purchase_item_list(
    purchase_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    items = get_purchase_items(
        db,
        purchase_id,
        current_user
    )

    return {
        "message": "Purchase items retrieved successfully",
        "count": len(items),
        "items": items
    }