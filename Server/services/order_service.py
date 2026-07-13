from model.order_model import Orders
from database import sessionLocal 
from sqlalchemy.orm import Session 
from fastapi import HTTPException

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


def get_orders(db:Session,current_user):
    orders=db.query(Orders).filter(
        Orders.user_id==current_user.id
    ).all()
    return orders


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