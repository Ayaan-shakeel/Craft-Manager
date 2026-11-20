from sqlalchemy import Column, Integer, Numeric, ForeignKey
from database import Base

class PurchaseItem(Base):
    __tablename__ = "purchase_items_table"

    id = Column(Integer, primary_key=True, index=True)
    purchase_id = Column(Integer,ForeignKey("purchases_table.id"),nullable=False,index=True)
    inventory_id = Column(Integer,ForeignKey("inventory_table.id"),nullable=False)
    quantity = Column(Integer,nullable=False)
    unit_cost = Column(Numeric(12, 2),nullable=False)
    subtotal = Column(Numeric(12, 2),nullable=False)