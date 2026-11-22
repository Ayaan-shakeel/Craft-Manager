export interface PurchaseItem {
    id: number;
    purchase_id: number;
    inventory_id: number;
    quantity: number;
    unit_cost: number;
    subtotal: number;
}

export interface PurchaseItemFormData {
    inventory_id: number;
    quantity: number;
    unit_cost: number;
}

export interface Purchase {
    id: number;
    purchase_number: string;
    supplier_id: number;
    user_id: number;
    total_amount: number;
    status: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

export interface PurchaseDetail extends Purchase {
    items: PurchaseItem[];
}

export interface PurchaseFormData {
    supplier_id: number;
    items: PurchaseItemFormData[];
    notes: string;
}