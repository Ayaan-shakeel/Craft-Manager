from operator import or_
from re import search

from model.customer_model import Customer
from database import sessionLocal
from fastapi import HTTPException
from sqlalchemy.orm import Session


def create_customer(db:Session,data,current_user):
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


def get_customer(db:Session,current_user,search: str = "", page: int = 1, limit: int = 10, sort_by: str = "id", sort_order: str = "desc",):
       if page < 1:
        raise HTTPException(
            status_code=400,
            detail="Page must be at least 1",
        )

       if limit < 1 or limit > 100:
        raise HTTPException(
            status_code=400,
            detail="Limit must be between 1 and 100",
        )

       if sort_order.lower() not in ["asc", "desc"]:
        raise HTTPException(
            status_code=400,
            detail="sort_order must be asc or desc",
        )
       query=db.query(Customer).filter(
        Customer.user_id==current_user.id
    )
       if search and search.strip():
        search_term = f"%{search.strip()}%"

        query = query.filter(
            or_(
                Customer.customer_name.ilike(search_term),
                Customer.customer_email.ilike(search_term),
                Customer.phone.ilike(search_term),
            )
        )
        total = query.count()

        sort_columns = {
        "id": Customer.id,
        "customer_name": Customer.customer_name,
        "customer_email": Customer.customer_email,
    }

       if sort_by not in sort_columns:
        raise HTTPException(
            status_code=400,
            detail="Invalid sort_by field",
        )

       sort_column = sort_columns[sort_by]

       if sort_order.lower() == "asc":
        query = query.order_by(sort_column.asc())
       else:
        query = query.order_by(sort_column.desc())

       offset = (page - 1) * limit

       customers = query.offset(offset).limit(limit).all()


       return {
        "customers": customers,
        "count": total,
        "page": page,
        "limit": limit,
        "total_pages": (total + limit - 1) // limit,
    }
def update_customer(db:Session,customer_id:int,data,current_user):
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

def delete_customer(db:Session,customer_id:int,current_user):
    customer=db.query(Customer).filter(
        Customer.id==customer_id,
        Customer.user_id==current_user.id
    ).first()
    if customer is None:
       raise HTTPException(status_code=404,detail="Customer not found")
    db.delete(customer)
    db.commit()
    
   