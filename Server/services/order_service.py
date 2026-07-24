from model.order_model import Orders
from database import sessionLocal 
from sqlalchemy.orm import Session
from sqlalchemy import or_
from model.customer_model import Customer
from fastapi import HTTPException
from io import StringIO
import csv


def create_order(db:Session,order,current_user):
    total_price=order.quantity*order.price
    new_order=Orders(
        product_name=order.product_name,
        quantity=order.quantity,
        price=order.price,
        total_price=total_price,
        customer_id=order.customer_id,
        user_id=current_user.id
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return new_order


def get_orders(db:Session,current_user,search=None,status=None,sort=None,page=1,limit=10):
    orders=db.query(Orders).filter(
        Orders.user_id==current_user.id
    )
    if search:
          orders=orders.join(Orders.customer).filter(or_(
               Orders.product_name.ilike(f"%{search}%"),
               Customer.customer_name.ilike(f"%{search}%")
               ))
    if status and status !="all":
          orders=orders.filter(Orders.status==status)
    total_count=orders.count()
    if sort=="newest":
          orders=orders.order_by(Orders.created_at.desc())
    elif sort=="oldest":
          orders=orders.order_by(Orders.created_at.asc())
    elif sort=="price_highest":
          orders=orders.order_by(Orders.total_price.desc())
    elif sort=="price_lowest":
          orders=orders.order_by(Orders.total_price.asc())

    offset=(page-1)*limit
    orders=(orders
           .offset(offset)
           .limit(limit)
           .all()
           )
    return orders,total_count
  
def export_orders_csv(db:Session,current_user):
      orders=(db.query(Orders).filter(
            Orders.user_id==current_user.id
      ).all()
      )
      csv_file=StringIO()
      writer=csv.writer(csv_file)
      writer.writerow([
            "Product",
            "Customer",
            "Status",
            "Quantity",
            "Price",
            "Total Price",
            "Created At"
      ])
      for order in orders:
            writer.writerow([
                  order.product_name,
                  order.customer.customer_name if order.customer else "Unknown Customer",
                  order.status,
                  order.quantity,
                  order.price,
                  order.total_price,
                  order.created_at.strftime("%d-%B-%Y"),
            ])
      csv_file.seek(0)
      return csv_file

def get_single_order(db:Session,order_id:int,current_user):
              order=db.query(Orders).filter(
                   Orders.id==order_id,
                   Orders.user_id==current_user.id
                   ).first() 
              return order

def update_order_status(db:Session,order_id:int,status:str,current_user):

     order=db.query(Orders).filter(
          Orders.id==order_id,
          Orders.user_id==current_user.id
     ).first()
     if order is None:
           return None
     order.status=status
     db.commit()
     db.refresh(order)
     return order
            

def get_order(db:Session,current_user,status:str=None):
     query=db.query(Orders).filter(
          Orders.user_id==current_user.id
     )
     if status:
          query.filter(Orders.status==status)
          orders=query.all()
          return orders
     
def CancelOrder(db:Session,order_id:int,current_user):
      order=db.query(Orders).filter(
            Orders.id==order_id,
            Orders.user_id==current_user.id
      ).first()
      if order is None:
            raise HTTPException(status_code=404,detail="order not found")
      order.status="cancelled"
      db.delete(order)
      db.commit()
      return order

def UpdateOrder(db:Session,order_id:int,data,current_user):
      order=db.query(Orders).filter(
            Orders.id==order_id,
            Orders.user_id==current_user.id
      ).first()
      if order is None:
            raise HTTPException(status_code=404,detail="Order not found")
      order.product_name=data.product_name
      order.quantity=data.quantity
      order.price=data.price
      order.status=data.status
      db.commit()
      db.refresh(order)
      return order