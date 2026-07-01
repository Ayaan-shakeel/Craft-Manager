from model.customer_model import Customers
from database import sessionLocal


def create_customer(data,current_user):
    db=sessionLocal()
    customer=Customers(
        customer_name=data.customer_name,
        customer_email=data.customer_email,
        address=data.address,
        phone=data.phone,
        notes=data.notes,
        user_id=current_user.id
    )
    db.add(customer)
    db.commit()
    db.refresh(customer)
    return customer


def get_customer(current_user):
    db=sessionLocal()
    customers=db.query(Customers).filter(
        Customers.user_id==current_user.id
    ).all()
    return customers

def update_customer(customer_id:int,data,current_user):
    db=sessionLocal()
    customer=db.query(Customers).filter(
        Customers.id==customer_id,
        Customers.user_id==current_user.id
    ).first()
    if customer is None:
        return{"status":0,"message":"customer not found"}
    customer.customer_name=data.customer_name
    customer.customer_email=data.customer_email
    customer.address=data.address
    customer.phone=data.phone
    customer.notes=data.notes
    db.commit()
    db.refresh(customer)
    return customer

def delete_customer(customer_id:int,current_user):
    db=sessionLocal()
    customer=db.query(Customers).filter(
        Customers.id==customer_id,
        Customers.user_id==current_user.id
    ).first()
    if customer is None:
        return{"status":0,"message":"customer not found"}
    db.delete(customer)
    db.commit()
    
   