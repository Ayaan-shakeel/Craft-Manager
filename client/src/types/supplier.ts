export interface Supplier {
    id: number;
    supplier_name: string;
    contact_person: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    notes: string | null;
    created_at: string;
}

export interface SupplierFormData {
    supplier_name: string;
    contact_person: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
}