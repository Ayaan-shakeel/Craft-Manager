from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base

class StockMovement(Base):
    __tablename__ = "stock_movements_table"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer,ForeignKey("users_table.id"),nullable=False,index=True)
    inventory_id = Column(Integer,ForeignKey("inventory_table.id"),nullable=False,index=True)
    product_name = Column(String(150), nullable=False)
    movement_type = Column(String(50), nullable=False)
    previous_quantity = Column(Integer, nullable=False)
    quantity_changed = Column(Integer, nullable=False)
    new_quantity = Column(Integer, nullable=False)
    reason = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True),server_default=func.now(),nullable=False)