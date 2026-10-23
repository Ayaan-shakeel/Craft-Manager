from fastapi import APIRouter,Depends,HTTPException,status
from sqlalchemy.orm import Session
from services.inventory_service import create_inventory,get_inventory,get_single_inventory,update_inventory,delete_inventory,export_inventory_csv
from schema.inventory_schema import InventoryCreate
from model.user_model import User
from auth import get_current_user
from database import get_db
from fastapi.responses import StreamingResponse
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
@router.get("/inventory", status_code=status.HTTP_200_OK)
def get_all_inventory(
    search: str = "",
    page: int = 1,
    limit: int = 10,
    sort_by: str = "id",
    sort_order: str = "desc",
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    data = get_inventory(
        db=db,
        current_user=current_user,
        search=search,
        page=page,
        limit=limit,
        sort_by=sort_by,
        sort_order=sort_order,
    )

    return {
        "message": "Inventory fetched successfully",
        "count": data["count"],
        "page": data["page"],
        "limit": data["limit"],
        "total_pages": data["total_pages"],
        "stats": data["stats"],
        "inventory": data["inventory"],
    }
@router.get("/inventory/export",status_code=status.HTTP_200_OK)
def export_inventory(current_user:User=Depends(get_current_user),
                        db:Session=Depends(get_db)
                        ):
            csv_file=export_inventory_csv(db,current_user)
            return StreamingResponse(
                iter([csv_file.getvalue()]),
                media_type="text/csv",
                headers={
                    "Content-Disposition":"attachment; filename=inventory.csv"
                }
            )
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
@router.delete("/inventory/{inventory_id}", status_code = status.HTTP_200_OK)
def deleted_inventory(inventory_id:int, current_user:User=Depends(get_current_user),
                      db:Session = Depends(get_db)):
                      delete_inventory(db,inventory_id,current_user)
                      return{
                         "message":"Inventory Successfully Deleted"
                      }
        