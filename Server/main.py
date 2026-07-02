from fastapi import FastAPI
from database import engine,Base
from routers.customer_router import router as customer_router
from routers.dashboard_router import router as dashboard_router
from routers.order_router import router as order_router
from routers.user_router import router as user_router
app = FastAPI(
    title="Craft Order Manager API",
    description="Backend API for managing customers and craft orders.",
    version="1.0.0"
)

Base.metadata.create_all(engine)
app.include_router(user_router)
app.include_router(customer_router)
app.include_router(dashboard_router)
app.include_router(order_router)
@app.get('/')
def home():
    return{"status":1,"message":"Hello World"}