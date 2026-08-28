from pydantic import BaseModel, Field
from typing import Optional, Literal


class OrderItemCreate(BaseModel):
    inventory_id: int
    quantity: int = Field(gt=0)


class OrderCreate(BaseModel):
    customer_id: int
    items: list[OrderItemCreate] = Field(min_length=1)
    discount: float = Field(ge=0)
    tax: float = Field(ge=0)
    shipping_charges: float = Field(ge=0)
    other_charges: float = Field(ge=0)
    payment_status: Literal["unpaid", "partial", "paid"]="unpaid"
    amount_paid: float = Field(ge=0)


class OrderUpdate(BaseModel):
    product_name: str = Field(min_length=2, max_length=100)
    quantity: int = Field(gt=0)
    price: float = Field(gt=0)
    status: Optional[str] = "pending"


class OrderUpdateStatus(BaseModel):
    status: str = Field(min_length=2, max_length=100)