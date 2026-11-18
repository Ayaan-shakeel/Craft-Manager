"use client";

import React from "react";
import {
    Search,
    Truck,
    Pencil,
    Trash2,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

import { Supplier } from "@/types/supplier";

interface SupplierTableProps {
    suppliers: Supplier[];
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    onEdit: (supplier: Supplier) => void;
    onDelete: (id: number) => void;
}

export default function SupplierTable({
    suppliers,
    search,
    setSearch,
    loading,
    onEdit,
    onDelete,
}: SupplierTableProps) {

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-slate-200 p-5">
                <h2 className="font-bold text-slate-800">
                    All Suppliers
                </h2>
            </div>

            {/* Search */}
            <div className="border-b border-slate-100 p-4">
                <div className="relative">

                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={20}
                    />

                    <input
                        type="text"
                        placeholder="Search suppliers..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500"
                    />

                </div>
            </div>

            {/* Supplier List */}
            {loading ? (

                <div className="p-10 text-center text-slate-500">
                    Loading suppliers...
                </div>

            ) : suppliers.length === 0 ? (

                <div className="p-12 text-center">

                    <Truck
                        size={42}
                        className="mx-auto mb-4 text-slate-300"
                    />

                    <h3 className="font-semibold text-slate-700">
                        No suppliers found
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Add your first supplier to get started.
                    </p>

                </div>

            ) : (

                <div className="divide-y divide-slate-100">

                    {suppliers.map((supplier) => (

                        <div
                            key={supplier.id}
                            className="flex flex-col justify-between gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center"
                        >

                            {/* Supplier Information */}
                            <div className="flex items-start gap-4">

                                <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                                    <Truck size={23} />
                                </div>

                                <div>

                                    <h3 className="font-bold text-slate-800">
                                        {supplier.supplier_name}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {supplier.contact_person || "No contact person"}
                                    </p>

                                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">

                                        {supplier.phone && (
                                            <span className="flex items-center gap-1">
                                                <Phone size={14} />
                                                {supplier.phone}
                                            </span>
                                        )}

                                        {supplier.email && (
                                            <span className="flex items-center gap-1">
                                                <Mail size={14} />
                                                {supplier.email}
                                            </span>
                                        )}

                                        {supplier.address && (
                                            <span className="flex items-center gap-1">
                                                <MapPin size={14} />
                                                {supplier.address}
                                            </span>
                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">

                                <button
                                    onClick={() => onEdit(supplier)}
                                    className="rounded-lg bg-blue-50 p-2.5 text-blue-600 transition hover:bg-blue-100"
                                    title="Edit supplier"
                                >
                                    <Pencil size={18} />
                                </button>

                                <button
                                    onClick={() => onDelete(supplier.id)}
                                    className="rounded-lg bg-red-50 p-2.5 text-red-600 transition hover:bg-red-100"
                                    title="Delete supplier"
                                >
                                    <Trash2 size={18} />
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}