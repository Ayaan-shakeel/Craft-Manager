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

class Orders(Base):
    __tablename__="orders_table"
    id=Column(Integer,primary_key=True)
    product_name=Column(String)
    price=Column(Integer)
    quantity=Column(Integer)
    total_price=Column(Integer)
    status=Column(String,default="pending")

    user_id=Column(Integer,ForeignKey("users_table.id"))
    customer_id=Column(Integer,ForeignKey("customers_table.id"))
