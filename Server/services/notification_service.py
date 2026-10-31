from typing import Optional
from sqlalchemy.orm import Session
from model.notification_model import Notification
def create_notification(
    db: Session,
    current_user,
    title: str,
    message: str,
    notification_type: str,
    link: Optional[str] = None,
):
    try:
        notification = Notification(
            user_id=current_user.id,
            title=title,
            message=message,
            notification_type=notification_type,
            link=link,
            is_read=False,
        )

        db.add(notification)
        db.commit()
        db.refresh(notification)

        return notification

    except Exception:
        db.rollback()
        raise

def get_notifications(
    db: Session,
    current_user,
):
    return (
        db.query(Notification)
        .filter(
            Notification.user_id == current_user.id
        )
        .order_by(
            Notification.created_at.desc()
        )
        .all()
    )

def get_unread_count(
    db: Session,
    current_user,
):
    return (
        db.query(Notification)
        .filter(
            Notification.user_id == current_user.id,
            Notification.is_read.is_(False),
        )
        .count()
    )

def mark_notification_read(
    db: Session,
    current_user,
    notification_id: int,
):
    try:
        notification = (
            db.query(Notification)
            .filter(
                Notification.id == notification_id,
                Notification.user_id == current_user.id,
            )
            .first()
        )

        if notification is None:
            return None

        notification.is_read = True

        db.commit()
        db.refresh(notification)

        return notification

    except Exception:
        db.rollback()
        raise

def mark_all_notifications_read(
    db: Session,
    current_user,
):
    try:
        updated_count = (
            db.query(Notification)
            .filter(
                Notification.user_id == current_user.id,
                Notification.is_read.is_(False),
            )
            .update(
                {Notification.is_read: True},
                synchronize_session=False,
            )
        )

        db.commit()

        return updated_count

    except Exception:
        db.rollback()
        raise

def delete_notification(
    db: Session,
    current_user,
    notification_id: int,
):
    try:
        notification = (
            db.query(Notification)
            .filter(
                Notification.id == notification_id,
                Notification.user_id == current_user.id,
            )
            .first()
        )

        if notification is None:
            return None

        db.delete(notification)
        db.commit()

        return notification

    except Exception:
        db.rollback()
        raise