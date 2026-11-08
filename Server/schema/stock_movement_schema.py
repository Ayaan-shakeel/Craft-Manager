from pydantic import BaseModel, ConfigDict
from datetime import datetime


class StockMovementResponse(BaseModel):
    id: int
    inventory_id: int
    product_name: str
    movement_type: str
    previous_quantity: int
    quantity_changed: int
    new_quantity: int
    reason: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)