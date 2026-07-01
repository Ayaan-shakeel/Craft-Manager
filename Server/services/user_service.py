from model.user_model import User
from database import sessionLocal
from auth import hash_password,verify_password,create_access_token
from schema.user_schema import userCreate,userLogin

def register(user:userCreate):
    db=sessionLocal()
    new_user=User(
        username=user.name,
        email=user.email,
        password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    return new_user

def login(user:userLogin):
    db=sessionLocal()
    db_user=db.query(User).filter(
        User.email==user.email
    ).first()
    if not db_user:
        return{"status":0,"message":"User not found"}
    if not verify_password(user.password,db_user.password):
        return{"status":0,"message":"Invalid password"}
    
    access_token=create_access_token(data={
        "sub":db_user.email
    })
    
    return access_token

def get_me(current_user):
    return get_user(current_user)
      