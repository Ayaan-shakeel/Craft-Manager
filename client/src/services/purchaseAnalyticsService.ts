import api from "@/lib/api";
import { PurchaseAnalytics } from "@/types/purchaseAnalytics";

export const getPurchaseAnalytics = async (): Promise<PurchaseAnalytics> => {
    const response = await api.get("/api/purchases/analytics");

    return response.data.analytics;
};