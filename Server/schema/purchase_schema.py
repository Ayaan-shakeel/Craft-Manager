from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import datetime


class PurchaseItemCreate(BaseModel):
    inventory_id: int
    quantity: int
    unit_cost: float


class PurchaseCreate(BaseModel):
    supplier_id: int
    items: List[PurchaseItemCreate]
    notes: Optional[str] = None


class PurchaseItemResponse(BaseModel):
    id: int
    purchase_id: int
    inventory_id: int
    quantity: int
    unit_cost: float
    subtotal: float

    model_config = ConfigDict(from_attributes=True)


class PurchaseResponse(BaseModel):
    id: int
    purchase_number: str
    supplier_id: int
    user_id: int
    total_amount: float
    status: str
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class PurchaseDetailResponse(PurchaseResponse):
    items: List[PurchaseItemResponse]