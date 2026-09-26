from model.order_model import Orders
from database import sessionLocal 
from sqlalchemy.orm import Session
from sqlalchemy import or_ ,func
from model.customer_model import Customer
from fastapi import HTTPException
from io import StringIO
import csv
from model.inventory_model import Inventory
from model.orders_items_model import OrderItem


def create_order(db: Session, order, current_user):

    # 1. Check customer belongs to current user
    customer = db.query(Customer).filter(
        Customer.id == order.customer_id,
        Customer.user_id == current_user.id
    ).first()

    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    if not order.items:
        raise HTTPException(
            status_code=400,
            detail="Order must contain at least one item"
        )

    order_items_data = []
    sub_total = 0

    # 2. Validate every inventory item first
    for item in order.items:

        inventory = db.query(Inventory).filter(
            Inventory.id == item.inventory_id,
            Inventory.user_id == current_user.id
        ).first()

        if inventory is None:
            raise HTTPException(
                status_code=404,
                detail=f"Inventory item {item.inventory_id} not found"
            )

        # 3. Check stock
        if inventory.quantity < item.quantity:
            raise HTTPException(
                status_code=400,
                detail=(
                    f"Only {inventory.quantity} units of "
                    f"{inventory.product_name} are available"
                )
            )

        # 4. Calculate item total
        item_total = inventory.selling_price * item.quantity

        sub_total += item_total

        order_items_data.append({
            "inventory": inventory,
            "quantity": item.quantity,
            "unit_price": inventory.selling_price,
            "total_price": item_total
        })

        # 5.  Calculate order charges after subtotal 
    discount = order.discount
    tax_percentage = order.tax
    shipping_charges = order.shipping_charges
    other_charges = order.other_charges

    # Validate Charges 
    if discount > sub_total:
         raise HTTPException(
            status_code = 404,
            detail = "Discount cannot be greater than subtotal "
         )
    if discount < 0 or tax_percentage < 0:
         raise HTTPException(
            status_code = 404,
            detail = "Discount and tax cannot be negative "
         )
    if shipping_charges < 0 or other_charges < 0:
         raise HTTPException(
            status_code = 404,
            detail = "Charges cannot be negative "
         )
        #  Calculate tax Amount
    tax_amount = sub_total * order.tax / 100
    #  Calculate total amount
    total_amount = sub_total - discount + other_charges + shipping_charges + tax_amount

    if order.amount_paid > total_amount:
         raise HTTPException(
            status_code = 404,
            detail = "Amount paid cannot be greater than total amount "
         )
    if order.amount_paid < 0:
         raise HTTPException(
            status_code = 404,
            detail = "Amount paid cannot be negative "
         )

    if order.payment_status == "unpaid":
        if order.amount_paid == 0:
            raise HTTPException(
                status_code = 404,
                detail = "Amount paid must be greater than 0 "
            )
    if order.amount_paid == 0:
         payment_status = "unpaid"
    elif order.amount_paid >= total_amount:
         payment_status = "paid"
    else:
         payment_status = "partial"

        # 6. Create the main order
    new_order = Orders(
        customer_id=customer.id,
        user_id=current_user.id,
        sub_total=sub_total,
        discount=discount,
        tax=tax_percentage,
        shipping_charges=shipping_charges,
        other_charges=other_charges,
        total_amount=total_amount,
        payment_status=payment_status,
        amount_paid=order.amount_paid,
        status="pending"
    )

    db.add(new_order)
    db.flush()

    # 7. Create OrderItems + deduct inventory
    for item_data in order_items_data:

        inventory = item_data["inventory"]

        new_item = OrderItem(
            order_id=new_order.id,
            inventory_id=inventory.id,
            product_name=inventory.product_name,
            quantity=item_data["quantity"],
            unit_price=item_data["unit_price"],
            total_price=item_data["total_price"]
        )

        db.add(new_item)

        inventory.quantity -= item_data["quantity"]

    # 8. Commit everything
    db.commit()

    db.refresh(new_order)

    return new_order

def get_orders(db:Session,current_user,search=None,status=None,sort=None,page=1,limit=10,payment_status=None):
    orders=db.query(Orders).filter(
        Orders.user_id==current_user.id
    )
    if search:
          orders=orders.join(Orders.customer).filter(or_(
               Orders.product_name.ilike(f"%{search}%"),
               Customer.customer_name.ilike(f"%{search}%")
               ))
    if status and status !="all":
          orders=orders.filter(Orders.status==status)
    total_count=orders.count()
    if sort=="newest":
          orders=orders.order_by(Orders.created_at.desc())
    elif sort=="oldest":
          orders=orders.order_by(Orders.created_at.asc())
    elif sort=="price_highest":
          orders=orders.order_by(Orders.total_amount.desc())
    elif sort=="price_lowest":
          orders=orders.order_by(Orders.total_amount.asc())

    if status and status !="all":
          orders=orders.all()
    if payment_status and payment_status !="all":
          orders=orders.filter(Orders.payment_status==payment_status)

    offset=(page-1)*limit
    orders=(orders
           .offset(offset)
           .limit(limit)
           .all()
           ) 
    total_orders = db.query(Orders).filter(
    Orders.user_id == current_user.id
     ).count()

    pending = db.query(Orders).filter(
    Orders.user_id == current_user.id,
    Orders.status == "pending"
    ).count()

    completed = db.query(Orders).filter(
    Orders.user_id == current_user.id,
    Orders.status == "completed"
    ).count()

    shipped = db.query(Orders).filter(
    Orders.user_id == current_user.id,
    Orders.status == "shipped"
    ).count()

    revenue = db.query(Orders).filter(
    Orders.user_id == current_user.id,
    Orders.payment_status == "paid"
    ).with_entities(
    func.sum(Orders.total_amount)
    ).scalar() or 0

    return orders, total_count, {
         "total_orders":total_orders,
         "pending":pending,
         "shipped":shipped,
         "completed":completed,
         "revenue":revenue,
    }
          
def export_orders_csv(db:Session,current_user):
      orders=(db.query(Orders).filter(
            Orders.user_id==current_user.id
      ).all()
      )
      csv_file=StringIO()
      writer=csv.writer(csv_file)
      writer.writerow([
            "Product",
            "Customer",
            "Status",
            "Quantity",
            "Price",
            "Total Price",
            "Created At"
      ])
      for order in orders:
            writer.writerow([
                  order.product_name,
                  order.customer.customer_name if order.customer else "Unknown Customer",
                  order.status,
                  order.quantity,
                  order.price,
                  order.total_price,
                  order.created_at.strftime("%d-%B-%Y"),
            ])
      csv_file.seek(0)
      return csv_file

def get_single_order(db:Session,order_id:int,current_user):
              order=db.query(Orders).filter(
                   Orders.id==order_id,
                   Orders.user_id==current_user.id
                   ).first() 
              return order

def update_order_status(db:Session,order_id:int,status:str,current_user):

     order=db.query(Orders).filter(
          Orders.id==order_id,
          Orders.user_id==current_user.id
     ).first()
     if order is None:
           return None
     order.status=status
     db.commit()
     db.refresh(order)
     return order
            

def get_order(db:Session,current_user,status:str=None):
     query=db.query(Orders).filter(
          Orders.user_id==current_user.id
     )
     if status:
          query.filter(Orders.status==status)
          orders=query.all()
          return orders
     
def CancelOrder(db:Session,order_id:int,current_user):
      order=db.query(Orders).filter(
            Orders.id==order_id,
            Orders.user_id==current_user.id
      ).first()
      if order is None:
            raise HTTPException(status_code=404,detail="order not found")
      
      if order.status == "cancelled":
        raise HTTPException(
            status_code=400,
            detail="Order already cancelled"
        )
      for item in order.order_items:
        inventory=db.query(Inventory).filter(
            Inventory.id==item.inventory_id,
            Inventory.user_id==current_user.id
            ).first()
        if inventory:
            inventory.quantity+=item.quantity
      order.status="cancelled"
      # db.delete(order)
      db.commit()
      return order



def UpdateOrder(db: Session, order_id: int, data, current_user):

    order = db.query(Orders).filter(
        Orders.id == order_id,
        Orders.user_id == current_user.id
    ).first()

    if order is None:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    # -------------------------
    # Validate customer
    # -------------------------

    customer = db.query(Customer).filter(
        Customer.id == data.customer_id,
        Customer.user_id == current_user.id
    ).first()

    if customer is None:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    # -------------------------
    # Update order information
    # -------------------------

    order.customer_id = data.customer_id
    order.discount = data.discount
    order.tax = data.tax
    order.shipping_charges = data.shipping_charges
    order.other_charges = data.other_charges
    order.payment_status = data.payment_status
    order.amount_paid = data.amount_paid
    order.status = data.status or order.status

    # -------------------------
    # Remove old order items
    # -------------------------

    order.order_items.clear()

    # -------------------------
    # Create updated items
    # -------------------------

    subtotal = 0

    for item_data in data.items:

        inventory = db.query(Inventory).filter(
            Inventory.id == item_data.inventory_id,
            Inventory.user_id == current_user.id
        ).first()

        if inventory is None:
            raise HTTPException(
                status_code=404,
                detail=f"Inventory item {item_data.inventory_id} not found"
            )

        if item_data.quantity > inventory.quantity:
            raise HTTPException(
                status_code=400,
                detail=f"Only {inventory.quantity} units of "
                       f"{inventory.product_name} are available"
            )

        unit_price = inventory.selling_price

        item_total = unit_price * item_data.quantity

        subtotal += item_total

        order_item = OrderItem(
            inventory_id=inventory.id,
            product_name=inventory.product_name,
            quantity=item_data.quantity,
            unit_price=unit_price,
            total_price=item_total
        )

        order.order_items.append(order_item)

    # -------------------------
    # Calculate totals
    # -------------------------

    tax_amount = subtotal * (data.tax / 100)

    total_amount = (
        subtotal
        - data.discount
        + tax_amount
        + data.shipping_charges
        + data.other_charges
    )

    if total_amount < 0:
        total_amount = 0

    if data.amount_paid > total_amount:
        raise HTTPException(
            status_code=400,
            detail="Amount paid cannot exceed total amount"
        )

    # -------------------------
    # Save calculated values
    # -------------------------

    order.sub_total = subtotal
    order.total_amount = total_amount

    # Legacy fields
    # Keep these temporarily so old parts of the application
    # don't break while we finish V1.

    order.product_name = (
        order.order_items[0].product_name
        if order.order_items
        else None
    )

    order.quantity = (
        order.order_items[0].quantity
        if order.order_items
        else 0
    )

    order.price = (
        order.order_items[0].unit_price
        if order.order_items
        else 0
    )

    order.total_price = total_amount

    db.commit()
    db.refresh(order)

    return order