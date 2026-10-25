from pydantic import BaseModel
from datetime import datetime
from typing import Optional
class NotificationResponse(BaseModel):
    id: int
    user_id: int
    title: str
    message: str
    notification_type: str
    is_read: bool
    link: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

class NotificationUnreadCount(BaseModel):
    unread_count: int

class NotificationReadResponse(BaseModel):
    message: str
    notification: NotificationResponse

class NotificationDeleteResponse(BaseModel):
    message: str
    notification_id: int