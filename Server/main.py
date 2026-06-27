from fastapi import FastAPI,Depends
from database import engine,sessionLocal
from models import Base,User,Customers
from schemas import userCreate ,userLogin,CustomerCreate,CustomerUpdate
from auth import hash_password,verify_password,create_access_token,get_current_user


app=FastAPI()
Base.metadata.create_all(engine)
@app.get('/')
def home():
    return{"status":1,"message":"Hello World"}
@app.post('/register')
def register(user:userCreate):
    db=sessionLocal()
    new_user=User(
        username=user.name,
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
def get_me(current_user:User=Depends(get_current_user)):
    return{
        "status":1,
        "message":"Authorized Successfully",
        "user":{
            "id":current_user.id,
            "username":current_user.username,
            "email":current_user.email

        }
    }
@app.post("/customers")
def create_customer(customer:CustomerCreate,current_user:User=Depends(get_current_user)):
    db=sessionLocal()
    new_customer=Customers(
        customer_name=customer.customer_name,
        customer_email=customer.customer_email,
        address=customer.address,
        phone=customer.phone,
        notes=customer.notes,
        user_id=current_user.id
    )
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return{
        "status":1,
        "message":"Customer added Successfully",
        "customer":{
            "id":new_customer.id,
            "customer_name":new_customer.customer_name,
            "customer_email":new_customer.customer_email,
            "phone":new_customer.phone,
        }
    }

@app.get("/customers")
def get_customer(current_user:User=Depends(get_current_user)):
    db=sessionLocal()
    customers=db.query(Customers).filter(
        Customers.user_id==current_user.id
    ).all()
    return{
        "status":1,
        "message":"Customers retrieved Successfully",
        "count":len(customers),
        "customers":[
            {
                "id":customer.id,
            "customer_name":customer.customer_name,
            "customer_email":customer.customer_email,
            "phone":customer.phone,
            "address":customer.address,
            "notes":customer.notes,
            }
            for customer in customers
        ]
    }

@app.put("/customers/{customer_id}")
def update_customer(customer_id:int,updated_customer:CustomerUpdate,current_user:User=Depends(get_current_user)):
    db=sessionLocal()
    customer=db.query(Customers).filter(
        Customers.id==customer_id,
        Customers.user_id==current_user.id
    ).first()
    if customer is None:
        return{"status":0,"message":"customer not found"}
    customer.customer_name=updated_customer.customer_name
    customer.customer_email=updated_customer.customer_email
    customer.address=updated_customer.address
    customer.phone=updated_customer.phone
    customer.notes=updated_customer.notes
    db.commit()
    db.refresh(customer)
    return{
        "status":1,
        "message":"Customer updated Successfully",
        "customer":{
             "id":customer.id,
            "customer_name":customer.customer_name,
            "customer_email":customer.customer_email,
            "phone":customer.phone,
            "address":customer.address,
            "notes":customer.notes,
        }
    }
        
@app.delete("/customers/{customer_id}")
def delete_customer(customer_id:int,current_user:User=Depends(get_current_user)):
    db=sessionLocal()
    customer=db.query(Customers).filter(
        Customers.id==customer_id,
        Customers.user_id==current_user.id
    ).first()
    if customer is None:
        return{"status":0,"message":"customer not found"}
    db.delete(customer)
    db.commit()
    return{
        "status":1,
        "message":"Customer deleted Successfully"

    }