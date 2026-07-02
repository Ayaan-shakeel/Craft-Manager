from fastapi import APIRouter,Depends,HTTPException,status
from schema.order_schema import OrderCreate,OrderUpdateStatus
from services.order_service import create_order,get_orders,get_single_order,update_order_status,get_order
from model.user_model import User
from auth import get_current_user
router = APIRouter(
    prefix="/api",
    tags=["Orders"]
)
@router.post("/orders",status_code=status.HTTP_201_CREATED)
def create_new_order(order:OrderCreate,current_user:User=Depends(get_current_user)):
    new_order=create_order(order,current_user)
    return{
        "message":"Order added Successfully",
        "order":{
            "id":new_order.id,
            "product_name":new_order.product_name,
            "quantity":new_order.quantity,
            "price":new_order.price,
            "total_price":new_order.total_price,
            "customer":{
                    "id":new_order.customer_id,
                    "customer_name":new_order.customers.customer_name
                  
                }
        }
    }

@router.get("/orders",status_code=status.HTTP_200_OK)
def get_all_orders(current_user:User=Depends(get_current_user)):
    orders=(get_orders(current_user))
    return{
        "message":"Orders retrieved Successfully",
        "count":len(orders),
        "orders":[
            {
                "id":order.id,
                "product_name":order.product_name,
                "quantity":order.quantity,
                "price":order.price,
                "total_price":order.total_price,
                "customer":{
                    "id":order.customer_id,
            
                }
               
            }
            for order in orders
        ]
    }

@router.get("/orders/{order_id}",status_code=status.HTTP_200_OK)
def get_a_single_order(order_id:int,current_user:User=Depends(get_current_user)):
             order=get_single_order(order_id,current_user)
             if order is None:
                   raise HTTPException(status_code=404,detail="Order not found")
             return {
                   "message":"Order retrieved Successfully",
                   "order":[
                        {
                         "id":order.id,
                         "product_name":order.product_name,
                         "quantity":order.quantity,
                         "price":order.price,
                         "total_price":order.total_price,
                         "customer":{
                         "id":order.customer_id,
                              }
              }
                   ]
              }
@router.put("/orders/{order_id}/status",status_code=status.HTTP_201_CREATED)
def updated_order_status(order_id:int,data:OrderUpdateStatus,current_user:User=Depends(get_current_user)):
   order=update_order_status(order_id,current_user)
   if order is None :
          raise HTTPException(status_code=404,detail="Order not found")
   order.status=data.status
   return{
        "message":"Order status updated Successfully",
        "status_now":order.status

     }

@router.get("/orders",status_code=status.HTTP_200_OK)
def get_filter_order(status:str=None,current_user:User=Depends(get_current_user)):
     orders=get_order(current_user,status)

     return{
               "message":"Order retieved successfully",
               "count":len(orders),
               "orders":orders

          }
