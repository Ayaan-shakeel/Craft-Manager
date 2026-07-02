from pydantic import BaseModel,Field,EmailStr
from typing import Optional
class CustomerCreate(BaseModel):
    customer_name:str=Field(min_length=2,max_length=100)
    customer_email:str=EmailStr
    address:str=Field(min_length=2,max_length=100)
    phone:str=Field(min_length=10,max_length=15)
    notes:Optional [str]=None
    
class CustomerUpdate(BaseModel):
    customer_name:str=Field(min_length=2,max_length=100)
    customer_email:str=EmailStr
    address:str=Field(min_length=2,max_length=100)
    phone:str=Field(min_length=10,max_length=15)
    notes:Optional [str]| None=None
