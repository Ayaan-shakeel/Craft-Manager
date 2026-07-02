from pydantic import BaseModel,Field,EmailStr
class userCreate(BaseModel):
    name:str=Field(min_length=2,max_length=100)
    email:str=EmailStr
    password:str=Field(min_length=6,max_length=20)
class userLogin(BaseModel):
    email:str=EmailStr
    password:str=Field(min_length=6,max_length=20)
