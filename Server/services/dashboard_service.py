from model.order_model import Orders
from database import sessionLocal
from model.customer_model import Customer
from sqlalchemy.orm import Session, func
def dashboard(db:Session,current_user):
     total_customers=db.query(Customer).filter(
          Customer.user_id==current_user.id
     ).count()
     total_orders=db.query(Orders).filter(
          Orders.user_id==current_user.id
     ).count()
     total_pending_orders=db.query(Orders).filter(
          Orders.user_id==current_user.id,
          Orders.status=="pending"

     ).count()
     total_completed_orders=db.query(Orders).filter(
          Orders.user_id==current_user.id,
          Orders.status=="completed"
     ).count()
     total_cancelled_orders=db.query(Orders).filter(
          Orders.user_id==current_user.id,
          Orders.status=="cancelled"
     ).count()
     total_processing_orders=db.query(Orders).filter(
          Orders.user_id==current_user.id,
          Orders.status=="processing"
     ).count()
     total_shipped_orders=db.query(Orders).filter(
          Orders.user_id==current_user.id,
          Orders.status=="shipped"
     ).count()

     orders=db.query(Orders).filter(
          Orders.user_id==current_user.id
     ).all()
     total_revenue=0
     for order in orders:
          total_revenue=(db.query(func.sum(Orders.total_price)).filter(
               Orders.user_id==current_user.id,
               Orders.status!="cancelled"
          )
          .scalar() or 0
          )
          return {

     "total_customers":total_customers,
     "total_orders":total_orders,
     "total_pending_orders":total_pending_orders,
     "total_completed_orders":total_completed_orders,
     "total_cancelled_orders":total_cancelled_orders,
     "total_processing_orders":total_processing_orders,
     "total_shipped_orders":total_shipped_orders,
     "total_revenue":total_revenue
          }