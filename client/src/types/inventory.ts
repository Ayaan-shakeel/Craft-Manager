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
export interface InventoryUpdateData{
    product_name:string,
    quantity:number,
    cost_price:number,
    selling_price:number,
    category:string,
    sku:string,
}

export interface InventoryQuery {
    search?: string;
    page?: number;
    limit?: number;
    sort_by?:
        | "id"
        | "product_name"
        | "quantity"
        | "cost_price"
        | "selling_price";
    sort_order?: "asc" | "desc";
}

export interface InventoryResponse {
    message: string;
    count: number;
    page: number;
    limit: number;
    total_pages: number;
    stats: {
        total_products: number;
        total_stock: number;
        total_cost: number;
        total_value: number;
        critical_stock: number;
        low_stock: number;
        out_of_stock: number;
    };
    inventory: Inventory[];
}