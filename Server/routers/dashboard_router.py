from fastapi import APIRouter,Depends,status
from services.dashboard_service import dashboard
from model.user_model import User
from auth import get_current_user
from sqlalchemy.orm import Session
from database import get_db
router = APIRouter(
    prefix="/api",
    tags=["Dashboard"]
)
@router.get("/dashboard",status_code=status.HTTP_200_OK)
def get_dashboard(current_user:User=Depends(get_current_user),
                        db:Session=Depends(get_db)
                        ):
 
    return{
               "message":"Dashboard retrieved successfully",
               "dashboard":dashboard(db,current_user)
    }
