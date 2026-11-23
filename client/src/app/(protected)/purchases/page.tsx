"use client";

import React, { useEffect, useState } from "react";

import { Purchase } from "@/types/purchase";
import { getPurchases } from "@/services/purchaseService";

export default function PurchasesPage() {

    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch purchases
    const fetchPurchases = async () => {
        try {
            setLoading(true);

            const data = await getPurchases();

            setPurchases(data);

        } catch (error) {
            console.error("Failed to fetch purchases:", error);
            alert("Failed to load purchases.");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPurchases();
    }, []);

    return (
        <div className="space-y-6">

            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Purchases
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                    Manage purchases and track stock replenishment.
                </p>
            </div>

            {loading ? (

                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                    Loading purchases...
                </div>

            ) : (

                <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">

                    <p className="text-slate-600">
                        {purchases.length} purchase records found.
                    </p>

                </div>

            )}

        </div>
    );
}