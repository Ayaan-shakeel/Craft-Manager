from fastapi import APIRouter,Depends,status
from services.dashboard_service import dashboard
from model.user_model import User
from auth import get_current_user
router = APIRouter(
    prefix="/api",
    tags=["Dashboard"]
)
@router.get("/dashboard",status_code=status.HTTP_200_OK)
def get_dashboard(current_user:User=Depends(get_current_user)):
    total_customers,total_orders,total_pending_orders,total_completed_orders,total_revenue=dashboard(current_user)
    return{
               "message":"Dashboard retrieved successfully",
               "dashboard":{
                    "total_customers":total_customers,
                    "total_orders":total_orders,
                    "total_pending_orders":total_pending_orders,
                    "total_completed_orders":total_completed_orders,
                    "total_revenue":total_revenue
               }
    }
