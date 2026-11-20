"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Plus, Truck } from "lucide-react";

import { Supplier, SupplierFormData } from "@/types/supplier";

import {
    getSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
} from "@/services/supplierService";

import SupplierStats from "@/components/suppliers/SupplierStats";
import SupplierTable from "@/components/suppliers/SupplierTable";
import SupplierForm from "@/components/suppliers/SupplierForm";

const initialForm: SupplierFormData = {
    supplier_name: "",
    contact_person: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
};

export default function SuppliersPage() {

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const [form, setForm] = useState<SupplierFormData>(initialForm);

    // Fetch suppliers
    const fetchSuppliers = async () => {
        try {
            setLoading(true);

            const data = await getSuppliers();
            setSuppliers(data);

        } catch (error) {
            console.error("Failed to fetch suppliers:", error);
            alert("Failed to load suppliers.");

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSuppliers();
    }, []);

    // Search suppliers
    const filteredSuppliers = useMemo(() => {
        const query = search.toLowerCase().trim();

        if (!query) return suppliers;

        return suppliers.filter((supplier) =>
            [
                supplier.supplier_name,
                supplier.contact_person,
                supplier.phone,
                supplier.email,
                supplier.address,
            ]
                .filter(Boolean)
                .some((value) =>
                    value!.toLowerCase().includes(query)
                )
        );
    }, [suppliers, search]);

    // Open add form
    const handleAdd = () => {
        setEditingId(null);
        setForm(initialForm);
        setShowForm(true);
    };

    // Open edit form
    const handleEdit = (supplier: Supplier) => {
        setEditingId(supplier.id);

        setForm({
            supplier_name: supplier.supplier_name,
            contact_person: supplier.contact_person || "",
            phone: supplier.phone || "",
            email: supplier.email || "",
            address: supplier.address || "",
            notes: supplier.notes || "",
        });

        setShowForm(true);
    };

    // Close form
    const handleClose = () => {
        setShowForm(false);
        setEditingId(null);
        setForm(initialForm);
    };

    // Create or update supplier
    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            setSaving(true);

            if (editingId !== null) {
                await updateSupplier(editingId, form);
                alert("Supplier updated successfully!");
            } else {
                await createSupplier(form);
                alert("Supplier added successfully!");
            }

            handleClose();
            await fetchSuppliers();

        } catch (error) {
            console.error("Failed to save supplier:", error);
            alert("Failed to save supplier.");

        } finally {
            setSaving(false);
        }
    };

    // Delete supplier
    const handleDelete = async (id: number) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this supplier?"
        );

        if (!confirmed) return;

        try {
            await deleteSupplier(id);

            alert("Supplier deleted successfully!");

            await fetchSuppliers();

        } catch (error) {
            console.error("Failed to delete supplier:", error);
            alert("Failed to delete supplier.");
        }
    };

    const registeredContacts = suppliers.filter(
        (supplier) => supplier.phone || supplier.email
    ).length;

    return (
        <div className="space-y-6">

            {/* Page Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                <div className="flex items-center gap-3">

                    <div className="rounded-xl ml-3 bg-blue-100 p-3 text-blue-600">
                        <Truck size={25} />
                    </div>

                    <div>
                        <h1 className="text-2xl mt-5 ml-2 font-bold text-slate-800">
                            Suppliers
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Manage your suppliers and contact information.
                        </p>
                    </div>

                </div>

                <button
                    onClick={handleAdd}
                    className="flex items-center mt-5 mr-3 justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    <Plus size={20} />
                    Add Supplier
                </button>

            </div>

            {/* Statistics */}
            <SupplierStats
                totalSuppliers={suppliers.length}
                registeredContacts={registeredContacts}
            />

            {/* Supplier Table */}
            <SupplierTable
                suppliers={filteredSuppliers}
                search={search}
                setSearch={setSearch}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Supplier Form */}
            {showForm && (
                <SupplierForm
                    form={form}
                    setForm={setForm}
                    editingId={editingId}
                    saving={saving}
                    onSubmit={handleSubmit}
                    onClose={handleClose}
                />
            )}

        </div>
    );
}