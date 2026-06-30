from fastapi import FastAPI,Depends
from database import engine,sessionLocal
from models import Base,User,Customers,Orders
from schemas import userCreate ,userLogin,CustomerCreate,CustomerUpdate,OrderCreate,OrderUpdateStatus,OrderUpdate
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

@app.post("/orders")
def create_order(order:OrderCreate,current_user:User=Depends(get_current_user)):
    db=sessionLocal()
    total_price=order.quantity*order.price
    new_order=Orders(
        product_name=order.product_name,
        quantity=order.quantity,
        price=order.price,
        total_price=total_price,
        customer_id=order.customer_id,
        user_id=current_user.id
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return{
        "status":1,
        "message":"Order added Successfully",
        "order":{
            "id":new_order.id,
            "product_name":new_order.product_name,
            "quantity":new_order.quantity,
            "price":new_order.price,
            "total_price":new_order.total_price,
            "customer":{
                    "id":new_order.customer_id,
                  
                }
        }
    }
@app.get("/orders")
def get_orders(current_user:User=Depends(get_current_user)):
    db=sessionLocal()
    orders=db.query(Orders).filter(
        Orders.user_id==current_user.id
    ).all()
    return{
        "status":1,
        "message":"Orders retrieved Successfully",
        "count":len(orders),
        "orders":[
            {
                "id":order.id,
                "product_name":order.product_name,
                "quantity":order.quantity,
                "price":order.price,
                "total_price":order.total_price,
                "customer":{
                    "id":order.customer_id,
            
                }
               
            }
            for order in orders
        ]
    }
@app.get("/orders/{order_id}")
def get_single_order(order_id:int,current_user:User=Depends(get_current_user)):
              db=sessionLocal()
              order=db.query(Orders).filter(
                   Orders.id==order_id,
                   Orders.user_id==current_user.id

              ).first()
              if order is None:
                   return{"status":0,"message":"Order not found"}
              return{
                   "status":1,
                   "message":"Order retrieved Successfully",
                   "order":[
                        {
                         "id":order.id,
                         "product_name":order.product_name,
                         "quantity":order.quantity,
                         "price":order.price,
                         "total_price":order.total_price,
                         "customer":{
                         "id":order.customer_id,
                              }
              }
                   ]
              }
# @app.put("/orders/{order_id}")
# def update_order(order_id:int,order:OrderUpdate,current_user:User=Depends(get_current_user)):
#      db=sessionLocal()
#      order=db.query(Orders).filter(
#           Orders.id==order_id,
#           Orders.user_id==current_user.id
#      )
#      if order is None:
#           return{"status":0,"message":"Order not found"}
#      order.product_name=OrderUpdate.product_name
#      order.quantity=OrderUpdate.quantity
#      order.price=OrderUpdate.price
     
@app.put("/orders/{order_id}/status")
def update_order_status(order_id:int,data:OrderUpdateStatus,current_user:User=Depends(get_current_user)):
     db=sessionLocal()
     order=db.query(Orders).filter(
          Orders.id==order_id,
          Orders.user_id==current_user.id
     ).first()
     if not order :
          return{"status":0,"message":"Order not found"}
     order.status=data.status
     db.commit()
     db.refresh(order)
     return{
        "status":1,
        "message":"Order status updated Successfully",
        "status_now":order.status

     }
     
@app.get("/orders")
def get_order(status:str=None,current_user:User=Depends(get_current_user)):
     db=sessionLocal()
     query=db.query(Orders).filter(
          Orders.user_id==current_user.id
     )
     if status:
          query.filter(Orders.status==status)
          orders=query.all()
          return{
               "status":1,
               "message":"Order retieved successfully",
               "count":len(orders),
               "orders":orders

          }
@app.get("/dashboard")
def dashboard(current_user:User=Depends(get_current_user)):
     db=sessionLocal()
     total_customers=db.query(Customers).filter(
          Customers.user_id==current_user.id
     ).count()
     total_orders=db.query(Orders).filter(
          Orders.user_id==current_user.id
     ).count()
     total_pending_orders=db.query(Orders).filter(
          Orders.user_id==current_user.id,
          Orders.status=="pending"

     ).count()
     total_completed_orders=db.query(Orders).filter(
          Orders.user_id==current_user.id,
          Orders.status=="completed"
     ).count()

     orders=db.query(Orders).filter(
          Orders.user_id==current_user.id
     ).all()
     total_revenue=0
     for order in orders:
          total_revenue+=order.total_price
          return{
               "status":1,
               "message":"Dashboard retrieved successfully",
               "dashboard":{
                    "total_customers":total_customers,
                    "total_orders":total_orders,
                    "total_pending_orders":total_pending_orders,
                    "total_completed_orders":total_completed_orders,
                    "total_revenue":total_revenue
               }
          }