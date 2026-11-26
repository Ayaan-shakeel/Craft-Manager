"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Plus, ShoppingCart, X, Eye } from "lucide-react";

import {
    Purchase,
    PurchaseDetail,
    PurchaseItemFormData,
    PurchaseFormData,
} from "@/types/purchase";

import { Supplier } from "@/types/supplier";
import { Inventory } from "@/types/inventory";

import {
    getPurchases,
    createPurchase,
    getSinglePurchase,
    getPurchaseItems,
} from "@/services/purchaseService";

import { getSuppliers } from "@/services/supplierService";
import { getInventory } from "@/services/inventoryService";

import PurchaseStats from "@/components/purchases/PurchaseStats";
import PurchaseTable from "@/components/purchases/PurchaseTable";
import PurchaseForm from "@/components/purchases/PurchaseForm";

const initialItems: PurchaseItemFormData[] = [
    {
        inventory_id: 0,
        quantity: 1,
        unit_cost: 0,
    },
];

export default function PurchasesPage() {

    // Data
    const [purchases, setPurchases] = useState<Purchase[]>([]);
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [inventory, setInventory] = useState<Inventory[]>([]);

    // Loading states
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Search and forms
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Purchase form
    const [supplierId, setSupplierId] = useState(0);
    const [items, setItems] = useState<PurchaseItemFormData[]>(initialItems);
    const [notes, setNotes] = useState("");

    // Purchase details
    const [selectedPurchase, setSelectedPurchase] =
        useState<PurchaseDetail | null>(null);

    const [loadingDetails, setLoadingDetails] = useState(false);

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

    // Fetch suppliers
    const fetchSuppliers = async () => {
        try {
            const data = await getSuppliers();

            setSuppliers(data);

        } catch (error) {
            console.error("Failed to fetch suppliers:", error);
            alert("Failed to load suppliers.");
        }
    };

    // Fetch inventory
    const fetchInventory = async () => {
        try {
            const data = await getInventory({
                page: 1,
                limit: 100,
            });

            setInventory(data.inventory);

        } catch (error) {
            console.error("Failed to fetch inventory:", error);
            alert("Failed to load inventory.");
        }
    };

    // Initial data loading
    useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                fetchPurchases(),
                fetchSuppliers(),
                fetchInventory(),
            ]);
        };

        loadData();
    }, []);

    // Search purchases
    const filteredPurchases = useMemo(() => {

        const query = search.toLowerCase().trim();

        if (!query) return purchases;

        return purchases.filter((purchase) =>
            [
                purchase.purchase_number,
                purchase.status,
                String(purchase.supplier_id),
                String(purchase.total_amount),
            ].some((value) =>
                value.toLowerCase().includes(query)
            )
        );

    }, [purchases, search]);

    // Open purchase form
    const handleAdd = () => {

        setSupplierId(0);
        setItems(initialItems);
        setNotes("");

        setShowForm(true);
    };

    // Close purchase form
    const handleClose = () => {

        setShowForm(false);

        setSupplierId(0);
        setItems(initialItems);
        setNotes("");
    };

    // Create purchase
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();

        if (supplierId <= 0) {
            alert("Please select a supplier.");
            return;
        }

        if (items.length === 0) {
            alert("Please add at least one purchase item.");
            return;
        }

        const invalidItem = items.some(
            (item) =>
                item.inventory_id <= 0 ||
                item.quantity <= 0 ||
                item.unit_cost < 0
        );

        if (invalidItem) {
            alert("Please enter valid purchase item details.");
            return;
        }

        const purchaseData: PurchaseFormData = {
            supplier_id: supplierId,
            items: items,
            notes: notes,
        };

        try {

            setSaving(true);

            await createPurchase(purchaseData);

            alert("Purchase created successfully!");

            handleClose();

            await Promise.all([
                fetchPurchases(),
                fetchInventory(),
            ]);

        } catch (error) {

            console.error("Failed to create purchase:", error);

            alert("Failed to create purchase.");

        } finally {

            setSaving(false);
        }
    };

    // View purchase details
    const handleView = async (purchase: Purchase) => {

        try {

            setLoadingDetails(true);

            const purchaseData = await getSinglePurchase(purchase.id);

            const purchaseItems = await getPurchaseItems(purchase.id);

            setSelectedPurchase({
                ...purchaseData,
                items: purchaseItems,
            });

        } catch (error) {

            console.error("Failed to fetch purchase details:", error);

            alert("Failed to load purchase details.");

        } finally {

            setLoadingDetails(false);
        }
    };

    // Statistics
    const totalSpent = purchases.reduce(
        (total, purchase) =>
            total + Number(purchase.total_amount),
        0
    );

    const totalItems = purchases.length;

    return (

        <div className="space-y-6">

            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div className="flex items-center gap-3">

                    <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                        <ShoppingCart size={25} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Purchases
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage purchases and track stock replenishment.
                        </p>
                    </div>

                </div>

                <button
                    onClick={handleAdd}
                    disabled={suppliers.length === 0 || inventory.length === 0}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Plus size={20} />
                    Create Purchase
                </button>

            </div>

            {/* Statistics */}
            <PurchaseStats
                totalPurchases={purchases.length}
                totalSpent={totalSpent}
                totalItems={totalItems}
            />

            {/* Purchase Table */}
            <PurchaseTable
                purchases={filteredPurchases}
                loading={loading}
                search={search}
                setSearch={setSearch}
                onView={handleView}
            />

            {/* Purchase Form */}
            {showForm && (

                <PurchaseForm
                    supplierId={supplierId}
                    setSupplierId={setSupplierId}
                    suppliers={suppliers}
                    inventory={inventory}
                    items={items}
                    setItems={setItems}
                    notes={notes}
                    setNotes={setNotes}
                    saving={saving}
                    onSubmit={handleSubmit}
                    onClose={handleClose}
                />

            )}

            {/* Purchase Details Modal */}
            {(selectedPurchase || loadingDetails) && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">

                        <div className="flex items-center justify-between border-b border-slate-200 p-5">

                            <h2 className="text-xl font-bold text-slate-800">
                                Purchase Details
                            </h2>

                            <button
                                onClick={() => setSelectedPurchase(null)}
                                disabled={loadingDetails}
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                            >
                                <X size={22} />
                            </button>

                        </div>

                        {loadingDetails ? (

                            <div className="p-10 text-center text-slate-500">
                                Loading purchase details...
                            </div>

                        ) : selectedPurchase && (

                            <div className="space-y-6 p-5">

                                {/* Purchase Information */}
                                <div className="grid gap-4 sm:grid-cols-2">

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Purchase Number
                                        </p>

                                        <p className="mt-1 font-semibold text-slate-800">
                                            {selectedPurchase.purchase_number}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Supplier
                                        </p>

                                        <p className="mt-1 font-semibold text-slate-800">
                                            {suppliers.find(
                                                (supplier) =>
                                                    supplier.id === selectedPurchase.supplier_id
                                            )?.supplier_name || `Supplier #${selectedPurchase.supplier_id}`}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Purchase Date
                                        </p>

                                        <p className="mt-1 font-semibold text-slate-800">
                                            {new Date(
                                                selectedPurchase.created_at
                                            ).toLocaleDateString("en-IN")}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-500">
                                            Status
                                        </p>

                                        <p className="mt-1 font-semibold capitalize text-green-600">
                                            {selectedPurchase.status}
                                        </p>
                                    </div>

                                </div>

                                {/* Items */}
                                <div>

                                    <h3 className="mb-3 font-bold text-slate-800">
                                        Purchased Products
                                    </h3>

                                    <div className="overflow-x-auto rounded-xl border border-slate-200">

                                        <table className="w-full min-w-[500px]">

                                            <thead className="bg-slate-50">

                                                <tr>
                                                    <th className="px-4 py-3 text-left text-xs text-slate-500">
                                                        Product
                                                    </th>

                                                    <th className="px-4 py-3 text-left text-xs text-slate-500">
                                                        Quantity
                                                    </th>

                                                    <th className="px-4 py-3 text-left text-xs text-slate-500">
                                                        Unit Cost
                                                    </th>

                                                    <th className="px-4 py-3 text-left text-xs text-slate-500">
                                                        Subtotal
                                                    </th>
                                                </tr>

                                            </thead>

                                            <tbody className="divide-y divide-slate-100">

                                                {selectedPurchase.items.map((item) => (

                                                    <tr key={item.id}>

                                                        <td className="px-4 py-3 text-sm text-slate-700">
                                                            {inventory.find(
                                                                (product) =>
                                                                    product.id === item.inventory_id
                                                            )?.product_name || `Product #${item.inventory_id}`}
                                                        </td>

                                                        <td className="px-4 py-3 text-sm text-slate-700">
                                                            {item.quantity}
                                                        </td>

                                                        <td className="px-4 py-3 text-sm text-slate-700">
                                                            ₹{Number(item.unit_cost).toFixed(2)}
                                                        </td>

                                                        <td className="px-4 py-3 text-sm font-semibold text-slate-800">
                                                            ₹{Number(item.subtotal).toFixed(2)}
                                                        </td>

                                                    </tr>

                                                ))}

                                            </tbody>

                                        </table>

                                    </div>

                                </div>

                                {/* Notes */}
                                {selectedPurchase.notes && (

                                    <div>
                                        <h3 className="font-semibold text-slate-700">
                                            Notes
                                        </h3>

                                        <p className="mt-2 text-sm text-slate-600">
                                            {selectedPurchase.notes}
                                        </p>
                                    </div>

                                )}

                                {/* Total */}
                                <div className="flex justify-between rounded-xl bg-blue-50 p-5">

                                    <span className="font-semibold text-slate-700">
                                        Total Amount
                                    </span>

                                    <span className="text-xl font-bold text-blue-700">
                                        ₹{Number(
                                            selectedPurchase.total_amount
                                        ).toLocaleString("en-IN", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </span>

                                </div>

                            </div>

                        )}

                    </div>

                </div>

            )}

        </div>
    );
}