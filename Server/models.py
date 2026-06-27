from sqlalchemy import Column,Integer,String,ForeignKey
from database import Base

class User(Base):
    __tablename__='users_table'
    id=Column(Integer,primary_key=True)
    username=Column(String)
    email=Column(String,unique=True)
    password=Column(String)

class Customers(Base):
    __tablename__="customers_table"
    id=Column(Integer,primary_key=True)
    customer_name=Column(String)
    customer_email=Column(String)
    address=Column(String)
    notes=Column(String)
    phone=Column(String)
    user_id=Column(Integer,ForeignKey("users_table.id"))


