export interface MonthlySpending {
    month: string;
    spending: number;
}

export interface TopSupplier {
    supplier_id: number;
    supplier_name: string;
    total_spending: number;
}

export interface TopPurchasedProduct {
    inventory_id: number;
    product_name: string;
    total_quantity: number;
    total_spending: number;
}

export interface RecentPurchase {
    id: number;
    purchase_number: string;
    supplier_id: number;
    total_amount: number;
    status: string;
    created_at: string;
}

export interface PurchaseAnalytics {
    total_purchases: number;
    total_spending: number;
    average_purchase_value: number;
    monthly_spending: MonthlySpending[];
    top_suppliers: TopSupplier[];
    top_purchased_products: TopPurchasedProduct[];
    recent_purchases: RecentPurchase[];
}