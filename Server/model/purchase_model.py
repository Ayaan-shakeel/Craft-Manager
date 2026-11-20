from sqlalchemy import Column, Integer, String, Text, Numeric, DateTime, ForeignKey
from sqlalchemy.sql import func

from database import Base


class Purchase(Base):
    __tablename__ = "purchases_table"

    id = Column(Integer, primary_key=True, index=True)

    purchase_number = Column(String(50), nullable=False, index=True)

    supplier_id = Column(Integer,ForeignKey("suppliers_table.id"),nullable=False)
    user_id = Column(Integer,ForeignKey("users_table.id"),nullable=False,index=True)
    total_amount = Column(Numeric(12, 2),nullable=False,default=0)
    status = Column(String(30),nullable=False,default="received")
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True),server_default=func.now(),nullable=False)
    updated_at = Column(DateTime(timezone=True),server_default=func.now(),onupdate=func.now(),nullable=False)