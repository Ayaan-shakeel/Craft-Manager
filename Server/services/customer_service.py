from model.customer_model import Customer
from database import sessionLocal
from fastapi import HTTPException


def create_customer(data,current_user):
    db=sessionLocal()
    customer=Customer(
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
    customers=db.query(Customer).filter(
        Customer.user_id==current_user.id
    ).all()
    return customers

def update_customer(customer_id:int,data,current_user):
    db=sessionLocal()
    customer=db.query(Customer).filter(
        Customer.id==customer_id,
        Customer.user_id==current_user.id
    ).first()
    if customer is None:
       raise HTTPException(status_code=404,detail="Customer not found")
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
    customer=db.query(Customer).filter(
        Customer.id==customer_id,
        Customer.user_id==current_user.id
    ).first()
    if customer is None:
       raise HTTPException(status_code=404,detail="Customer not found")
    db.delete(customer)
    db.commit()
    
   