"use client";

import React from "react";
import { SupplierFormData } from "@/types/supplier";
import { X } from "lucide-react";

interface SupplierFormProps {
    form: SupplierFormData;
    setForm: React.Dispatch<React.SetStateAction<SupplierFormData>>;
    editingId: number | null;
    saving: boolean;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
}

export default function SupplierForm({
    form,
    setForm,
    editingId,
    saving,
    onSubmit,
    onClose,
}: SupplierFormProps) {

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 p-6">

                    <div>
                        <h2 className="text-xl font-bold text-slate-800">
                            {editingId ? "Edit Supplier" : "Add New Supplier"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Enter supplier information below.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
                    >
                        <X size={20} />
                    </button>

                </div>

                {/* Form */}
                <form onSubmit={onSubmit} className="space-y-5 p-6">

                    {/* Supplier Name */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Supplier Name *
                        </label>

                        <input
                            required
                            name="supplier_name"
                            value={form.supplier_name}
                            onChange={handleChange}
                            placeholder="Enter supplier name"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Contact Details */}
                    <div className="grid gap-5 sm:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Contact Person
                            </label>

                            <input
                                name="contact_person"
                                value={form.contact_person}
                                onChange={handleChange}
                                placeholder="Contact person"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Phone
                            </label>

                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Phone number"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Address
                            </label>

                            <input
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Supplier address"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                    </div>

                    {/* Notes */}
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Notes
                        </label>

                        <textarea
                            name="notes"
                            value={form.notes}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Additional information..."
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : editingId
                                ? "Update Supplier"
                                : "Save Supplier"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}