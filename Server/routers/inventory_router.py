from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from services.inventory_service import create_inventory,get_inventory
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
                    inventory=(get_inventory(db,current_user))
                    return{
                        "message":"Inventory Fetched Successfully",
                        "count":len(inventory),
                        "inventory":[{
                            "id":inventory.id,
                            "product_name":inventory.product_name,
                            "quantity":inventory.quantity,
                            "cost_price":inventory.cost_price,
                            "selling_price":inventory.selling_price,
                            "category":inventory.category,
                            "sku":inventory.sku
                        }
                        for inventory in inventory
                        ]

                    }
    