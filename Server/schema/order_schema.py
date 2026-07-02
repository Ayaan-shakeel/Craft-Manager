from pydantic import BaseModel,Field
from typing import Optional
class OrderCreate(BaseModel):
    product_name:str=Field(min_length=2,max_length=100)
    quantity:int=Field(gt=0)
    price:float=Field(gt=0)
    customer_id:int
   
class OrderUpdate(BaseModel):
    product_name:str=Field(min_length=2,max_length=100)
    quantity:int=Field(gt=0)
    price:float=Field(gt=0)
    status:Optional[str]="pending"

class OrderUpdateStatus(BaseModel):
    status:str