from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
class OrderItem(Base):
    __tablename__ = 'order_items_table'
    id = Column(Integer, primary_key=True)
    order_id = Column(Integer,ForeignKey("orders_table.id"),nullable=False)
    inventory_id = Column(Integer,ForeignKey("inventory_table.id"),nullable=False)
    product_name = Column(String, nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Float, nullable=False)
    total_price = Column(Float, nullable=False)
    order = relationship("Orders",back_populates="order_items")
    inventory = relationship("Inventory")