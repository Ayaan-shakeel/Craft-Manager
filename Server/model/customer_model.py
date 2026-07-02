from sqlalchemy import String,Integer,Column,ForeignKey
from sqlalchemy.orm import relationship
from database import Base
class Customers(Base):
    __tablename__="customers_table"
    id=Column(Integer,primary_key=True)
    customer_name=Column(String)
    customer_email=Column(String)
    address=Column(String)
    notes=Column(String)
    phone=Column(String)
    user_id=Column(Integer,ForeignKey("users_table.id"))
    orders=relationship("Orders",back_populates="customers")
