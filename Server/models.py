from sqlalchemy import Column,Integer,String
from database import Base

class User(Base):
    __tablename__='users_table'
    id=Column(Integer,primary_key=True)
    username=Column(String)
    email=Column(String,unique=True)
    password=Column(String)