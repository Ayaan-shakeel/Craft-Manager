from sqlalchemy import Column,Integer,String,ForeignKey,DateTime
from datetime import datetime
from database import Base
from sqlalchemy.orm import relationship
class Inventory(Base):
      
    __tablename__="inventory_table"
    id=Column(Integer,primary_key=True)
    product_name=Column(String)
    quantity=Column(Integer)
    cost_price=Column(Integer)
    selling_price=Column(Integer)
    category=Column(String) 
    sku=Column(String)
    reorder_level=Column(Integer)
    created_At=Column(DateTime, default=datetime.utcnow)
    updated_At=Column(DateTime, default=datetime.utcnow,onupdate=datetime.utcnow)
    user_id=Column(Integer,ForeignKey("users_table.id"))
    orders=relationship("Orders",back_populates("inventory"))
