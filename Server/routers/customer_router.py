from fastapi import APIRouter,Depends
from schema.customer_schema import CustomerCreate,CustomerUpdate
from services.customer_service import create_customer,get_customer,update_customer,delete_customer
from model.user_model import User
from auth import get_current_user
router=APIRouter()
@router.post("/customers")
def create_new_customer(customer:CustomerCreate,current_user:User=Depends(get_current_user)):
                    new_customer=create_customer(customer,current_user)
                    return{
                         "status":1,
        "message":"Customer added Successfully",
        "customer":{
            "id":new_customer.id,
            "customer_name":new_customer.customer_name,
            "customer_email":new_customer.customer_email,
            "phone":new_customer.phone,
        }
    }    
@router.get("/customers")
def get_all_customers(current_user:User=Depends(get_current_user)):
        customers=(get_customer(current_user))
        return{
                 "status":1,
        "message":"Customers retrieved Successfully",
        "count":len(customers),
        "customers":[
            {
                "id":customer.id,
            "customer_name":customer.customer_name,
            "customer_email":customer.customer_email,
            "phone":customer.phone,
            "address":customer.address,
            "notes":customer.notes,
            }
            for customer in customers
        ]
        }
@router.put("/customers/{customer_id}")
def updated_customer(customer_id:int,updated_customer:CustomerUpdate,current_user:User=Depends(get_current_user)):
  customer=update_customer(customer_id,updated_customer,current_user)

  return{
        "status":1,
        "message":"Customer updated Successfully",
        "customer":{
             "id":customer.id,
            "customer_name":customer.customer_name,
            "customer_email":customer.customer_email,
            "phone":customer.phone,
            "address":customer.address,
            "notes":customer.notes,
        }
    }
@router.delete("/customers/{customer_id}")
def deleteing_customer(customer_id:int,current_user:User=Depends(get_current_user)):
    delete_customer(customer_id,current_user)
    return{
        "status":1,
        "message":"Customer deleted Successfully"

    }