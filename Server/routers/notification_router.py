from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from auth import get_current_user
from model.user_model import User

from services.notification_service import (get_notifications,get_unread_count,mark_notification_read,mark_all_notifications_read,delete_notification,)
from schema.notification_schema import (NotificationResponse,NotificationUnreadCount,NotificationReadResponse,NotificationDeleteResponse,)

router = APIRouter(
    prefix="/api",
    tags=["Notifications"]
)

@router.get("/notifications",status_code=status.HTTP_200_OK,response_model=list[NotificationResponse])
def get_all_notifications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notifications = get_notifications(db, current_user)

    return {
        "message": "Notifications retrieved successfully",
        "count": len(notifications),
        "notifications": notifications
    }
@router.get("/notifications/unread-count",status_code=status.HTTP_200_OK)
def get_notifications_unread_count(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    count = get_unread_count(db, current_user)

    return {
        "unread_count": count
    }

@router.patch("/notifications/{notification_id}/read",status_code=status.HTTP_200_OK,response_model=NotificationReadResponse)
def read_notification(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notification = mark_notification_read(
        db,
        current_user,
        notification_id
    )

    if notification is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )

    return {
        "message": "Notification marked as read successfully",
        "notification": notification
    }

@router.patch("/notifications/read-all",status_code=status.HTTP_200_OK)
def read_all_notifications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    updated_count = mark_all_notifications_read(db, current_user)

    return {
        "message": "All notifications marked as read",
        "updated_count": updated_count
    }

@router.delete("/notifications/{notification_id}",status_code=status.HTTP_200_OK,response_model=NotificationDeleteResponse)
def remove_notification(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    notification = delete_notification(
        db,
        current_user,
        notification_id
    )

    if notification is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Notification not found"
        )

    return {
        "message": "Notification deleted successfully",
        "notification_id": notification_id
    }