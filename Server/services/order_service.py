from model.order_model import Orders
from database import sessionLocal

def create_order(order,current_user):
    db=sessionLocal()
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


def get_orders(current_user):
    db=sessionLocal()
    orders=db.query(Orders).filter(
        Orders.user_id==current_user.id
    ).all()
    return orders


def get_single_order(order_id:int,current_user):
              db=sessionLocal()
              order=db.query(Orders).filter(
                   Orders.id==order_id,
                   Orders.user_id==current_user.id
                   ).first() 
              return order

def update_order_status(order_id:int,current_user):
     db=sessionLocal()
     order=db.query(Orders).filter(
          Orders.id==order_id,
          Orders.user_id==current_user.id
     ).first()
     db.commit()
     db.refresh(order)
     return order
            

def get_order(current_user,status:str=None):
     db=sessionLocal()
     query=db.query(Orders).filter(
          Orders.user_id==current_user.id
     )
     if status:
          query.filter(Orders.status==status)
          orders=query.all()
          return orders