"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";

import { PurchaseItemFormData } from "@/types/purchase";

interface InventoryOption {
    id: number;
    product_name: string;
}

interface PurchaseItemsFormProps {
    items: PurchaseItemFormData[];
    inventory: InventoryOption[];
    setItems: React.Dispatch<React.SetStateAction<PurchaseItemFormData[]>>;
}

export default function PurchaseItemsForm({
    items,
    inventory,
    setItems,
}: PurchaseItemsFormProps) {

    const handleAddItem = () => {
        setItems((prev) => [
            ...prev,
            {
                inventory_id: 0,
                quantity: 1,
                unit_cost: 0,
            },
        ]);
    };

    const handleRemoveItem = (index: number) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const handleChange = (
        index: number,
        field: keyof PurchaseItemFormData,
        value: number
    ) => {
        setItems((prev) =>
            prev.map((item, i) =>
                i === index
                    ? { ...item, [field]: value }
                    : item
            )
        );
    };

    return (
        <div className="space-y-4">

            <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-800">
                    Purchase Items
                </h3>

                <button
                    type="button"
                    onClick={handleAddItem}
                    className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                >
                    <Plus size={18} />
                    Add Item
                </button>
            </div>

            {items.length === 0 && (
                <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                    No items added. Click Add Item to begin.
                </div>
            )}

            {items.map((item, index) => {

                const subtotal = item.quantity * item.unit_cost;

                return (
                    <div
                        key={index}
                        className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >

                        <div className="mb-4 flex items-center justify-between">
                            <h4 className="font-semibold text-slate-700">
                                Item {index + 1}
                            </h4>

                            <button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                                title="Remove item"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                            {/* Inventory */}
                            <div className="sm:col-span-2 lg:col-span-1">
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Product *
                                </label>

                                <select
                                    value={item.inventory_id}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "inventory_id",
                                            Number(e.target.value)
                                        )
                                    }
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                >
                                    <option value={0} disabled>
                                        Select product
                                    </option>

                                    {inventory.map((product) => (
                                        <option
                                            key={product.id}
                                            value={product.id}
                                        >
                                            {product.product_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Quantity *
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "quantity",
                                            Number(e.target.value)
                                        )
                                    }
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            {/* Unit Cost */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Unit Cost (₹) *
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.unit_cost}
                                    onChange={(e) =>
                                        handleChange(
                                            index,
                                            "unit_cost",
                                            Number(e.target.value)
                                        )
                                    }
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                        </div>

                        {/* Subtotal */}
                        <div className="mt-4 flex justify-end border-t border-slate-200 pt-4">

                            <div className="text-right">
                                <p className="text-sm text-slate-500">
                                    Subtotal
                                </p>

                                <p className="text-lg font-bold text-slate-800">
                                    ₹{subtotal.toLocaleString("en-IN", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </p>
                            </div>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}