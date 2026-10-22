from itertools import count

from fastapi import APIRouter,Depends,status
from schema.customer_schema import CustomerCreate,CustomerUpdate
from services.customer_service import create_customer,get_customer,update_customer,delete_customer,export_customers_csv
from model.user_model import User
from auth import get_current_user
from sqlalchemy.orm import Session
from database import get_db
from fastapi.responses import StreamingResponse
router = APIRouter(
    prefix="/api",
    tags=["Customers"]
)
@router.post("/customers",status_code=status.HTTP_201_CREATED)
def create_new_customer(customer:CustomerCreate,current_user:User=Depends(get_current_user),
                        db:Session=Depends(get_db)
                        ):
                    new_customer=create_customer(db,customer,current_user)
                    return{
                        "status_code":201,
        "message":"Customer added Successfully",
        "customer":{
            "id":new_customer.id,
            "customer_name":new_customer.customer_name,
            "customer_email":new_customer.customer_email,
            "phone":new_customer.phone,
            "address":new_customer.address,
            "notes":new_customer.notes,
        }
    }    
@router.get("/customers",status_code=status.HTTP_200_OK)
def get_all_customers(   
        search: str = "",
        page: int = 1,
        limit: int = 10,
        sort_by: str = "id",
        sort_order: str = "desc",
        current_user:User=Depends(get_current_user),
        db:Session=Depends(get_db)
        ):

        customers=(get_customer(
        db=db,
        current_user=current_user,
        search=search,
        page=page,
        limit=limit,
        sort_by=sort_by,
        sort_order=sort_order,))
        return{
        "message": "Customers retrieved successfully",
        "count": len(customers),
        "page": customers["page"],
        "limit": customers["limit"],
        "total_pages": customers["total_pages"],
        "customers": [
            {
                "id": customer.id,
                "customer_name": customer.customer_name,
                "customer_email": customer.customer_email,
                "phone": customer.phone,
                "address": customer.address,
                "notes": customer.notes,
            }
            for customer in customers["customers"]
        ],
        }
@router.get("/customers/export",status_code=status.HTTP_200_OK)
def export_customers(current_user:User=Depends(get_current_user),
                        db:Session=Depends(get_db)
                        ):
            csv_file=export_customers_csv(db,current_user)
            return StreamingResponse(
                iter([csv_file.getvalue()]),
                media_type="text/csv",
                headers={
                    "Content-Disposition":"attachment; filename=customers.csv"
                }
            )
@router.put("/customers/{customer_id}",status_code=status.HTTP_200_OK)
def updated_customer(customer_id:int,updated_customer:CustomerUpdate,current_user:User=Depends(get_current_user),
                        db:Session=Depends(get_db)
                        ):
  customer=update_customer(db,customer_id,updated_customer,current_user)

  return{
       "status_code":201,
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
@router.delete("/customers/{customer_id}",status_code=status.HTTP_200_OK)
def deleteing_customer(customer_id:int,current_user:User=Depends(get_current_user),
                        db:Session=Depends(get_db)
                        ):
    delete_customer(db,customer_id,current_user)
    return{
        "message":"Customer deleted Successfully"

    }