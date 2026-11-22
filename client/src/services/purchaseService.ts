import api from "@/lib/api";
import { PurchaseFormData } from "@/types/purchase";

export const getPurchases = async () => {
    const response = await api.get("/api/purchases");
    return response.data.purchases;
};

export const getSinglePurchase = async (purchaseId: number) => {
    const response = await api.get(`/api/purchases/${purchaseId}`);
    return response.data.purchase;
};

export const getPurchaseItems = async (purchaseId: number) => {
    const response = await api.get(`/api/purchases/${purchaseId}/items`);
    return response.data.items;
};

export const createPurchase = async (data: PurchaseFormData) => {
    const response = await api.post("/api/purchases", data);
    return response.data;
};