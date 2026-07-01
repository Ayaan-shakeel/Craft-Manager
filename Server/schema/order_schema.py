from pydantic import BaseModel
from typing import Optional
class OrderCreate(BaseModel):
    product_name:str
    quantity:int
    price:int
    customer_id:int
   
class OrderUpdate(BaseModel):
    product_name:str
    quantity:int
    price:int
    status:Optional[str]="pending"

class OrderUpdateStatus(BaseModel):
    status:str