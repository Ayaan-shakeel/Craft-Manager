from fastapi import FastAPI,Header
from database import engine,sessionLocal
from models import Base,User
from schemas import userCreate ,userLogin
from auth import hash_password,verify_password,create_access_token,verify_token


app=FastAPI()
Base.metadata.create_all(engine)
@app.get('/')
def home():
    return{"status":1,"message":"Hello World"}
@app.post('/register')
def register(user:userCreate):
    db=sessionLocal()
    new_user=User(
        usename=user.name,
        email=user.email,
        password=hash_password(user.password)
    )
    db.add(new_user)
    db.commit()
    return{"status":1,"message":"user registered successfully"}

@app.post("/login")
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
    
    return{"status":1,"message":"Login Succesfully","access_token":access_token,"token_type":"bearer"}

@app.get("/me")
def get_me(authorization:str=Header(None)):
    print("Header = ",authorization)
    if authorization is None:
        return{'status':0,"message":"Authorization failed"}
    token=authorization.split(" ")[1]
    email=verify_token(token)
    if email is None:
        return{'status':0,'message':'Invalid token'}
    return{"status":1,"message":"Authorized in Successfully","email":email}
