from pydantic import BaseModel
from typing import Optional
class userCreate(BaseModel):
    name:str
    email:str
    password:str
class userLogin(BaseModel):
    email:str
    password:str

class CustomerCreate(BaseModel):
    customer_name:str
    customer_email:str
    address:str
    phone:str
    notes:Optional [str]=None
    
class CustomerUpdate(BaseModel):
    customer_name:str
    customer_email:str
    address:str
    phone:str
    notes:Optional [str]=None

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