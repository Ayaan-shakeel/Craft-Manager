from model.order_model import Orders
from database import sessionLocal
from model.customer_model import Customers
def dashboard(current_user):
     db=sessionLocal()
     total_customers=db.query(Customers).filter(
          Customers.user_id==current_user.id
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

     orders=db.query(Orders).filter(
          Orders.user_id==current_user.id
     ).all()
     total_revenue=0
     for order in orders:
          total_revenue+=order.total_price
          return total_customers,total_orders,total_pending_orders,total_completed_orders,total_revenue