#  Craft Order Manager

A full-stack Craft Order Management system that helps small craft businesses manage customers, orders, and sales through a secure dashboard.

---

##  Features

###  User Authentication
- Register
- Login
- JWT Authentication
- Secure Protected Routes

###  Customer Management
- Add Customers
- View Customers
- Update Customer Details
- Delete Customers

###  Order Management
- Create Orders
- Update Orders
- Delete Orders
- Track Order Status

###  Dashboard
- Total Customers
- Total Orders
- Pending Orders
- Completed Orders
- Revenue Overview

---

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Axios

### Backend
- FastAPI
- SQLAlchemy
- PostgreSQL
- JWT Authentication
- Pydantic

---

## Project Structure

```
Craft-Order-Manager/

├── Client/     # Next.js Frontend
├── Server/     # FastAPI Backend
└── README.md
```

---

## Getting Started

### Backend

```bash
cd Server
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd Client
npm install
npm run dev
```

---

##  Project Goal

This project was built to learn and demonstrate full-stack development by creating a real-world business application with authentication, customer management, order management, and analytics.

---

##  Skills Demonstrated

- Full Stack Development
- REST API Development
- JWT Authentication
- PostgreSQL Database Design
- SQLAlchemy ORM
- FastAPI
- Next.js
- TypeScript
- Clean Architecture (Routers, Services, Models, Schemas)
- CRUD Operations
- Dashboard Analytics