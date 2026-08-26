export interface OrderItem{
    id:number,
    inventory_id:number,
    product_name:string,
    quantity:number,
    unit_price:number,
    total_price:number,
    available_stock:number,
}
export interface OrderItemData{
    inventory_id:number,
    quantity:number,
}
 export interface Order{
    id:number,
    customer_id:number,
    customer_name:string,
    item_count:number,
    sub_total:number,
    discount:number,
    tax:number,
    shipping_charges:number,
    other_charges:number,
    total_amount:number,
    status:string,
    created_at:string,
    items?:OrderItem[]
 }
export interface OrderData{
   customer_id:number,
   items:OrderItemData[],
   discount:number,
   tax:number,
   shipping_charges:number,
   other_charges:number,
   payment_status: "unpaid" | "partial" | "paid",
   amount_paid:number,
}

