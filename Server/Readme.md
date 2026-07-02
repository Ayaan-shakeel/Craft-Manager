#  Craft Order Manager API

A secure backend API for managing customers and craft orders, built with FastAPI and PostgreSQL.

##  Features

###  Authentication
- User Registration
- User Login
- Password Hashing (bcrypt)
- JWT Authentication
- Protected Routes
- Current User Endpoint (/me)

###  Customer Management
- Add Customer
- View Customers
- Update Customer
- Delete Customer

###  Order Management
- Create Orders
- View Orders
- Update Orders
- Delete Orders
- Update Order Status (Pending / Completed)

### Dashboard
- Total Customers
- Total Orders
- Pending Orders
- Completed Orders
- Total Revenue

## 🛠 Tech Stack

- FastAPI
- Python
- PostgreSQL
- SQLAlchemy ORM
- Pydantic
- JWT Authentication
- Passlib (bcrypt)
- Uvicorn

##  Project Structure

```
Server/
│
├── model/
├── schema/
├── routers/
├── services/
├── auth.py
├── config.py
├── database.py
├── main.py
└── requirements.txt
```

##  Authentication

This API uses JWT (JSON Web Tokens).

Protected routes require:

```
Authorization: Bearer <your_access_token>
```

##  Installation

Clone the repository

```bash
git clone <your-github-link>
```

Go into the project

```bash
cd Craft-Order-Manager
```

Create a virtual environment

```bash
python -m venv venv
```

Activate it

Windows

```bash
venv\Scripts\activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Run the server

```bash
uvicorn main:app --reload
```

Open your browser

```
http://127.0.0.1:8000/docs
```

##  API Endpoints

### Authentication

POST `/register`

POST `/login`

GET `/me`

### Customers

POST `/customers`

GET `/customers`

PUT `/customers/{customer_id}`

DELETE `/customers/{customer_id}`

### Orders

POST `/orders`

GET `/orders`

PUT `/orders/{order_id}`

DELETE `/orders/{order_id}`

PATCH `/orders/{order_id}/status`

### Dashboard

GET `/dashboard`

##  Learning Outcome

This project helped me learn:

- Backend API Development
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- JWT Authentication
- REST APIs
- Database Relationships
- Clean Project Architecture (Routers, Services, Models, Schemas)
- CRUD Operations

---

Built with  using FastAPI.