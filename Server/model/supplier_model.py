from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base


class Supplier(Base):
    __tablename__ = "suppliers_table"
    id = Column(Integer, primary_key=True, index=True)
    supplier_name = Column(String(150), nullable=False)
    contact_person = Column(String(150), nullable=True)
    phone = Column(String(20), nullable=True)
    email = Column(String(150), nullable=True)
    address = Column(String(255), nullable=True)
    notes = Column(String(500), nullable=True)
    user_id = Column(Integer,ForeignKey("users_table.id"),nullable=False,index=True)
    created_at = Column(DateTime(timezone=True),server_default=func.now(),nullable=False)
    updated_at = Column(DateTime(timezone=True),server_default=func.now(),onupdate=func.now(),nullable=False)