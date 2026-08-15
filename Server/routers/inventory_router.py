from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from services.inventory_service import create_inventory,get_inventory,get_single_inventory,update_inventory
from schema.inventory_schema import InventoryCreate
from model.user_model import User
from auth import get_current_user
from database import get_db
router=APIRouter(
    prefix="/api",
    tags=["Inventory"]
)

@router.post("/inventory",status_code=status.HTTP_201_CREATED)
def create_new_inventory(inventory:InventoryCreate,current_user:User=Depends(get_current_user),
                      db:Session=Depends(get_db)):
                      new_inventory=create_inventory(db,inventory,current_user)
                      return{
                        "message":"Inventory added Successfully",
                        "inventory":{
                            "id":new_inventory.id,
                            "product_name":new_inventory.product_name,
                            "quantity":new_inventory.quantity,
                            "cost_price":new_inventory.cost_price,
                            "selling_price":new_inventory.selling_price,
                            "category":new_inventory.category,
                            "sku":new_inventory.sku
                        }
                      }
@router.get("/inventory",status_code=status.HTTP_200_OK)
def get_all_inventory(current_user:User=Depends(get_current_user),
                    db:Session=Depends(get_db)):
                    data=get_inventory(db,current_user)
                    return{
                        "message":"Inventory F-etched Successfully",
                        "count":len(data["inventory"]),
                        "stats":data["stats"],
                        "inventory":data["inventory"]

                    }
@router.get("/inventory/{inventory_id}",status_code=status.HTTP_200_OK) 
def get_single_inventory_by_id(inventory_id:int,current_user:User=Depends(get_current_user),
                               db:Session=Depends(get_db)):
        data=get_single_inventory(db,inventory_id,current_user)
        return  { "message":"Inventory Fetched Successfully",
                                "inventory":data["inventory"],
                                "analytics":data["analytics"],
                                "recent_orders":data["recent_orders"]
                                }
@router.put("/inventory/{inventory_id}",status_code=status.HTTP_201_CREATED)
def updated_inventory(inventory_id:int,inventory:InventoryCreate,current_user:User=Depends(get_current_user),
                      db:Session=Depends(get_db)):
                      updated_inventory=update_inventory(db,inventory_id,inventory,current_user)
                      return{
                        "message":"Inventory updated Successfully",
                        "inventory":{
                            "id":updated_inventory.id,
                            "product_name":updated_inventory.product_name,
                            "quantity":updated_inventory.quantity,
                            "cost_price":updated_inventory.cost_price,
                            "selling_price":updated_inventory.selling_price,
                            "category":updated_inventory.category,
                            "sku":updated_inventory.sku
                        }
                      }