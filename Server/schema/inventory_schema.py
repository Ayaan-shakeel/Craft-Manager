from pydantic import BaseModel,Field
from typing import Optional
class InventoryCreate(BaseModel):
    product_name:str=Field(min_length=2,max_length=100)
    quantity:int=Field(gt=0)
    cost_price:int=Field(gt=0)
    selling_price:int=Field(gt=0)
    category:str=Field(min_length=2,max_length=100)
    sku:str=Field(min_length=2,max_length=100)

