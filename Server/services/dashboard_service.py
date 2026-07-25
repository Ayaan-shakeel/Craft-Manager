from model.order_model import Orders
from database import sessionLocal
from model.customer_model import Customer
from sqlalchemy.orm import Session
from sqlalchemy import extract,func
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
     
     total_revenue=(db.query(func.sum(Orders.total_price)).filter(
               Orders.user_id==current_user.id,
               Orders.status!="cancelled"
          )
          .scalar() or 0
          )
         
     monthly_revenue=(db.query(extract("month",Orders.created_at).label("month"),
                                    func.sum(Orders.total_price).label("revenue")
                                    ).filter(
                                         Orders.user_id==current_user.id,
                                         Orders.status!="cancelled"
                                    )
                                    .group_by(extract("month",Orders.created_at))
                                    .order_by(extract("month",Orders.created_at))
                                    .all()
                                    )
     months=[
               "",
               "Jan",
               "Feb",
               "Mar",
               "Apr",
               "May",
               "Jun",
               "Jul",
               "Aug",
               "Sep",
               "Oct",
               "Nov",
               "Dec"
          ]

     monthly_revenue=[
               {
                    "month":months[int(row.month)],
                    "revenue":row.revenue
               }
               for row in monthly_revenue
          ]
     month=extract("month",Orders.created_at)
     monthly_orders=(
          db.query(month.label("month"),
     func.count(Orders.id).label("orders")).filter(
          Orders.user_id==current_user.id

     )
     .group_by(month)
     .order_by(month)
     .all()
     )
     monthly_orders=[
          {
               "month":months[int(row.month)],
               "orders":row.orders
          }
          for row in monthly_orders
     ]
     recent_orders=(db.query(Orders).filter(
     Orders.user_id==current_user.id)
     .order_by(Orders.created_at.desc())
     .limit(5)
     .all()
     )
     
     recent_orders_data=[
          {
               "id":order.id,
               "product_name":order.product_name,
               "customer_name":order.customer.customer_name if order.customer else "Unknow Customer",
               "status":order.status,
               "total_price":order.total_price,
               "created_at":order.created_at
          }
          for order in recent_orders
     ]     
     order_status_chart = [
    {
        "name": "Pending",
        "value": total_pending_orders,
    },
    {
        "name": "Processing",
        "value": total_processing_orders,
    },
    {
        "name": "Shipped",
        "value": total_shipped_orders,
    },
    {
        "name": "Completed",
        "value": total_completed_orders,
    },
    {
        "name": "Cancelled",
        "value": total_cancelled_orders,
    },
]
     return{

     "total_customers":total_customers,
     "total_orders":total_orders,
     "total_pending_orders":total_pending_orders,
     "total_completed_orders":total_completed_orders,
     "total_cancelled_orders":total_cancelled_orders,
     "total_processing_orders":total_processing_orders,
      "total_shipped_orders": total_shipped_orders,
      "total_revenue":total_revenue,
      "monthly_revenue":monthly_revenue,
      "monthly_orders":monthly_orders,
      "recent_orders":recent_orders_data,
      "order_status_chart":order_status_chart,
     }
          