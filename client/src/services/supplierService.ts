import api from "@/lib/api";
import { Supplier, SupplierFormData } from "@/types/supplier";

export const getSuppliers = async (): Promise<Supplier[]> => {
    const response = await api.get("/api/suppliers");
    return response.data.suppliers;
};

export const createSupplier = async (data: SupplierFormData) => {
    const response = await api.post("/api/suppliers", data);
    return response.data;
};

export const updateSupplier = async (
    id: number,
    data: SupplierFormData
) => {
    const response = await api.put(`/api/suppliers/${id}`, data);
    return response.data;
};

export const deleteSupplier = async (id: number) => {
    const response = await api.delete(`/api/suppliers/${id}`);
    return response.data;
};