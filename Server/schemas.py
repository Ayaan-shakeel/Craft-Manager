from pydantic import BaseModel
class userCreate(BaseModel):
    name:str
    email:str
    password:str
class userLogin(BaseModel):
    email:str
    password:str