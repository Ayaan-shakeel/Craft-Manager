export interface Inventory{
    id:number,
    product_name:string,
    quantity:number,
    cost_price:number,
    selling_price:number,
    category:string,
    sku:string,
    stock_status:string
}
export interface InventoryAnalytics{
        current_stock:number,
        estimated_cost:number,
        estimated_profit:number,
        inventory_value:number,
        orders_count:number,
        profit_margin:number,
        revenue:number,
        total_sales:number,
        units_sold:number,
}