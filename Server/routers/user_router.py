from fastapi import APIRouter,Depends,status
from services import user_service
from auth import get_current_user
from model.user_model import User
from schema.user_schema import userCreate,userLogin
router = APIRouter(
    prefix="/users",
    tags=["Users"]
)
@router.post('/register',status_code=status.HTTP_201_CREATED)
def register_user(user:userCreate):
    user=user_service.register(user)
    return{"message":"user registered successfully","access_token":user.access_token,"token_type":"bearer","user":{
        "id":user.id,
        "username":user.username,
        "email":user.email
    }
    }
@router.post("/login",status_code=status.HTTP_200_OK)
def login_user(user:userLogin):
    db_user=user_service.login(user)
    return{"message":"Login Succesfully","access_token":db_user.access_token,"token_type":"bearer","user":{
        "id":db_user.id,
        "name":db_user.username,
        "email":db_user.email
    }}

@router.get("/me",status_code=status.HTTP_200_OK)
def get_me(current_user:User=Depends(get_current_user)):
    return{
        "message":"Authorized Successfully",
        "user":{
            "id":current_user.id,
            "username":current_user.username,
            "email":current_user.email

        }
    }
