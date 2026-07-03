from sqlalchemy import Column,Integer,String,ForeignKey
from sqlalchemy.orm import relationship
from database import Base

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
    customer=relationship("Customer",back_populates="orders")
