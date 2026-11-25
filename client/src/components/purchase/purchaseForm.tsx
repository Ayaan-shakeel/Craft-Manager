"use client";

import React from "react";
import { X, Save } from "lucide-react";

import {
    PurchaseItemFormData,
} from "@/types/purchase";

import PurchaseItemsForm from "./PurchaseItemsForm";

interface SupplierOption {
    id: number;
    name: string;
}

interface InventoryOption {
    id: number;
    product_name: string;
}

interface PurchaseFormProps {
    supplierId: number;
    setSupplierId: React.Dispatch<React.SetStateAction<number>>;

    suppliers: SupplierOption[];
    inventory: InventoryOption[];

    items: PurchaseItemFormData[];
    setItems: React.Dispatch<
        React.SetStateAction<PurchaseItemFormData[]>
    >;

    notes: string;
    setNotes: React.Dispatch<React.SetStateAction<string>>;

    saving: boolean;

    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
}

export default function PurchaseForm({
    supplierId,
    setSupplierId,
    suppliers,
    inventory,
    items,
    setItems,
    notes,
    setNotes,
    saving,
    onSubmit,
    onClose,
}: PurchaseFormProps) {

    const totalAmount = items.reduce(
        (total, item) =>
            total + item.quantity * item.unit_cost,
        0
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 p-5">

                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            Create Purchase
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Record a new stock purchase from a supplier.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={saving}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
                    >
                        <X size={22} />
                    </button>

                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-6 p-5">

                    {/* Supplier */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Supplier *
                        </label>

                        <select
                            value={supplierId}
                            onChange={(e) =>
                                setSupplierId(Number(e.target.value))
                            }
                            required
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-blue-500"
                        >
                            <option value={0} disabled>
                                Select supplier
                            </option>

                            {suppliers.map((supplier) => (
                                <option
                                    key={supplier.id}
                                    value={supplier.id}
                                >
                                    {supplier.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Purchase Items */}
                    <PurchaseItemsForm
                        items={items}
                        inventory={inventory}
                        setItems={setItems}
                    />

                    {/* Notes */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Purchase Notes
                        </label>

                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                            placeholder="Enter additional purchase details..."
                            className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500"
                        />
                    </div>

                    {/* Total */}
                    <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">

                        <div className="flex items-center justify-between">

                            <span className="font-semibold text-slate-700">
                                Total Purchase Amount
                            </span>

                            <span className="text-2xl font-bold text-blue-700">
                                ₹{totalAmount.toLocaleString("en-IN", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>

                        </div>

                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving || suppliers.length === 0 || inventory.length === 0}
                            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Save size={18} />

                            {saving ? "Creating Purchase..." : "Create Purchase"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}