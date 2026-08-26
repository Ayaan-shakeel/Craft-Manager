from sqlalchemy import Column, Integer, Numeric, String, ForeignKey, DateTime,Float
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Orders(Base):
    __tablename__="orders_table"
    id=Column(Integer,primary_key=True)
    product_name=Column(String)
    price=Column(Integer)
    quantity=Column(Integer)
    total_price=Column(Integer)
    sub_total=Column(Numeric(12,2),default=0)
    discount=Column(Numeric(12,2),default=0)
    tax=Column(Numeric(12,2),default=0)
    total_amount=Column(Numeric(12,2),default=0)
    shipping_charges=Column(Numeric(12,2),default=0)
    shipping_address=Column(String)
    other_charges=Column(Numeric(12,2),default=0)
    payment_method=Column(String)
    payment_status=Column(String, default="unpaid", nullable=False)
    amount_paid=Column(Float, default=0, nullable=False)
    payment_id=Column(String)
    delivery_date=Column(DateTime)
    
    status=Column(String,default="pending")
    created_at=Column(DateTime,default=datetime.utcnow)
    updated_at=Column(DateTime,default=datetime.utcnow,onupdate=datetime.utcnow)

    user_id=Column(Integer,ForeignKey("users_table.id"))
    customer_id=Column(Integer,ForeignKey("customers_table.id"))
    inventory_id=Column(Integer,ForeignKey("inventory_table.id"))
    customer=relationship("Customer",back_populates="orders")
    inventory=relationship("Inventory",back_populates="orders")
    order_items = relationship("OrderItem",back_populates="order",cascade="all, delete-orphan")
