from fastapi import APIRouter,Depends
from services.user_service import register,login,get_me
from auth import get_current_user
from model.user_model import User
from schema.user_schema import userCreate,userLogin

router=APIRouter()
@router.get('/')
def home():
    return{"status":1,"message":"Hello World"}
@router.post('/register')
def get_register(user:userCreate):
    new_user=register(user)
    return{"status":1,"message":"user registered successfully","new_user":{
        "name":new_user.username,
        "email":new_user.email
    }}
@router.post("/login")
def get_login(user:userLogin):
    access_token=login(user)
    
    return{"status":1,"message":"Login Succesfully","access_token":access_token,"token_type":"bearer"}

@router.get("/me")
def get_login_me(current_user:User=Depends(get_current_user)):
    get_me=get_me(current_user)
    return{
        "status":1,
        "message":"Authorized Successfully",
        "user":{
            "id":current_user.id,
            "username":current_user.username,
            "email":current_user.email

        }
    }
