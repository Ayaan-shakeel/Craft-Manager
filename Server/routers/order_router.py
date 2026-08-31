from fastapi import APIRouter,Depends,HTTPException,status,Query
from schema.order_schema import OrderCreate,OrderUpdateStatus,OrderUpdate
from services.order_service import create_order,get_orders,export_orders_csv,get_single_order,CancelOrder,UpdateOrder,update_order_status,get_order
from model.user_model import User
from sqlalchemy.orm import Session
from database import get_db
from auth import get_current_user
from typing import Optional
from fastapi.responses import StreamingResponse
router = APIRouter(
    prefix="/api",
    tags=["Orders"]
)
@router.post("/orders",status_code=status.HTTP_201_CREATED)
def create_new_order(order:OrderCreate,current_user:User=Depends(get_current_user),
                        db:Session=Depends(get_db)
                        ):
    new_order=create_order(db,order,current_user)
    return{
        "message":"Order added Successfully",
         "orders":
                    {
                        "id":new_order.id,
                        "customer_id":new_order.customer_id,
                        "customer_name":(new_order.customer.customer_name if
                        new_order.customer 
                        else "Unknown Customer"),
                        "item_count":len(new_order.order_items),
                        "tax":new_order.tax,
                        "discount":new_order.discount,
                        "sub_total":new_order.sub_total,
                        "total_amount":new_order.total_amount,
                        "status":new_order.status,
                        "created_At":new_order.created_at.strftime("%d-%B-%Y")
                    
                        
                       
                    }
    }


@router.get("/orders",status_code=status.HTTP_200_OK)
def get_all_orders(
      search:Optional[str]=None,
      status:Optional[str]=None,
      sort:Optional[str]=None,
      page:int=Query(1,ge=1),
      limit:int=Query(10,ge=1,le=100),
      payment_status:Optional[str]=None,
      current_user:User=Depends(get_current_user),
                        db:Session=Depends(get_db)
                        ):
    orders,total_count,stats=(get_orders(db,current_user,search,status,sort,page,limit,payment_status))
    return{
        "message":"Orders retrieved Successfully",
        "count":total_count,
        "page":page,
        "limit":limit,
        
        "orders":[
            {
                "id":order.id,
                "customer_id":order.customer_id,
                "customer_name":(order.customer.customer_name if
                order.customer 
                else "Unknown Customer"),
                "item_count":len(order.order_items),
                "tax":order.tax,
                "discount":order.discount,
                "sub_total":order.sub_total,
                "total_amount":order.total_amount,
                "status":order.status,
                "created_At":order.created_at.strftime("%d-%B-%Y"),
                  "items": [
                                {
                                    "id": item.id,
                                    "inventory_id": item.inventory_id,
                                    "product_name": item.product_name,
                                    "quantity": item.quantity,
                                    "unit_price": item.unit_price,
                                    "total_price": item.total_price
                                }
                                for item in order.order_items
                            ]
                
            
                
               
            }
            for order in orders
        ]
    }
@router.get("/orders/export",status_code=status.HTTP_200_OK)
def export_orders(current_user:User=Depends(get_current_user),
                        db:Session=Depends(get_db)
                        ):
            csv_file=export_orders_csv(db,current_user)
            return StreamingResponse(
                csv_file,
                media_type="text/csv",
                headers={
                    "Content-Disposition":"attachement; filename=orders.csv"
                }
            )

@router.get("/orders/{order_id}",status_code=status.HTTP_200_OK)
def get_a_single_order(order_id:int,current_user:User=Depends(get_current_user),
                        db:Session=Depends(get_db)
                        ):
             order=get_single_order(db,order_id,current_user)
             if order is None:
                   raise HTTPException(status_code=404,detail="Order not found")
             return {
     "message": "Order retrieved Successfully",
        "order": {
            "id": order.id,
            "customer_id": order.customer_id,
            "customer_name": (
                order.customer.customer_name
                if order.customer
                else "Unknown Customer"
            ),
            "items_count": len(order.order_items),

            "sub_total": order.sub_total,
            "discount": order.discount,
            "tax": order.tax,
            "shipping_charges": order.shipping_charges,
            "other_charges": order.other_charges,
            "total_amount": order.total_amount,

            "status": order.status,
            "created_at": order.created_at,

            "items": [
                {
                    "id": item.id,
                    "inventory_id": item.inventory_id,
                    "product_name": item.product_name,
                    "quantity": item.quantity,
                    "unit_price": item.unit_price,
                    "total_price": item.total_price
                }
                for item in order.order_items
            ]
        }
    }
@router.put("/orders/{order_id}/status",status_code=status.HTTP_201_CREATED)
def updated_order_status(order_id:int,data:OrderUpdateStatus,current_user:User=Depends(get_current_user),
                        db:Session=Depends(get_db)
                        ):
   order=update_order_status(db,order_id,data.status,current_user)
   if order is None :
          raise HTTPException(status_code=404,detail="Order not found")
   return{
        "message":"Order status updated Successfully",
        "status_now":order.status

     }

# @router.get("/orders",status_code=status.HTTP_200_OK)
# def get_filter_order(status:str=None,current_user:User=Depends(get_current_user),
#                         db:Session=Depends(get_db)
#                         ):
#      orders=get_order(db,current_user,status)

#      return{
#                "message":"Order retieved successfully",
#                "count":len(orders),
#                "orders":orders

#           }
@router.delete("/orders/{order_id}",status_code=status.HTTP_200_OK)
def delete_order(order_id:int,current_user:User=Depends(get_current_user),
                 db:Session=Depends(get_db)
                      ):
      order=CancelOrder(db,order_id,current_user)
      return{
            "message":"Order deleted successfully",
            "order":order
      }

@router.put("/orders/{order_id}",status_code=status.HTTP_201_CREATED)
def update_order(order_id:int,data:OrderUpdate,current_user:User=Depends(get_current_user),
                 db:Session=Depends(get_db)
                 ):
      order=UpdateOrder(db,order_id,data,current_user)
      return{
       "message":"Order updated Successfully",
       "order":{
             "id":order.id,
             "product_name":order.product_name,
             "quantity":order.quantity,
             "price":order.price,
             "customer_id":order.customer_id

       }

      }