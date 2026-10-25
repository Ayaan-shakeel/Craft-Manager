from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from database import Base
class Notification(Base):

    __tablename__ = "notifications_table"
    id = Column(Integer,primary_key=True,index=True)
    user_id = Column(Integer,ForeignKey("users_table.id"),nullable=False,index=True)
    title = Column(String(150),nullable=False)
    message = Column(String(500),nullable=False)
    notification_type = Column(String(50),nullable=False)
    is_read = Column(Boolean,default=False,nullable=False)
    link = Column(String(255),nullable=True)
    created_at = Column(DateTime(timezone=True),server_default=func.now(),nullable=False)