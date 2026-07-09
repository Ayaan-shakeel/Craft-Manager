export interface Order{
    id:number,
    product_name:string,
    quantity:number,
    price:number,
    customer_id:number|null
}
export interface OrderData{
    product_name:string,
    quantity:number,
    price:number,
    customer_id:number| null
}