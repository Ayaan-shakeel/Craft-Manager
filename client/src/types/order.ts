export interface Order{
    id:number,
    product_name:string,
    quantity:number,
    price:number,
    total_price:number,
    customer_name:string,
    status:string,
    customer_id:number
}
export interface OrderData{
    product_name:string,
    quantity:number,
    price:number,
    customer_id:number,
    status?:string
}