from model.user_model import User
from database import sessionLocal
from auth import hash_password,verify_password,create_access_token
from schema.user_schema import userCreate,userLogin
from fastapi import HTTPException
from sqlalchemy.orm import Session

def register(db:Session,user:userCreate):

    new_user=User(
        username=user.name,
        email=user.email,
        password=hash_password(user.password)
    )
    new_user.access_token=create_access_token(data={
        "sub":new_user.email
    })
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def login(db:Session,user:userLogin):
    db_user=db.query(User).filter(
        User.email==user.email
    ).first()
    if not db_user:
        raise HTTPException(status_code=401,detail=" Email not found")
    if not verify_password(user.password,db_user.password):
       raise HTTPException(status_code=403,detail=" ! Incorrect password")
    db_user.access_token=create_access_token(data={
        "sub":db_user.email
    })
    
    
    return db_user


    
           
      