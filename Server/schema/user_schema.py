from pydantic import BaseModel
# from typing import Optional
class userCreate(BaseModel):
    name:str
    email:str
    password:str
class userLogin(BaseModel):
    email:str
    password:str
