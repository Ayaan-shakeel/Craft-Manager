"use client";

import React, { useEffect, useState } from "react";

import {
  deleteCustomer,
  getCustomers,
  updateCustomer,
  createCustomer,
} from "@/services/customerService";

import type { CustomerQuery } from "@/services/customerService";

import CustomerForm from "@/components/customers/CustomerForm";
import CustomerTable from "@/components/customers/CustomerTable";
import CustomerPagination from "@/components/customers/CustomerPagination";

import { Customer } from "@/types/customer";
import { toast, ToastContainer } from "react-toastify";

const emptyFormData = {
  customer_name: "",
  customer_email: "",
  phone: "",
  address: "",
  notes: "",
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [editingCustomer, setEditingCustomer] =
    useState<Customer | null>(null);

  const [formData, setFormData] = useState(emptyFormData);

  // Search state
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 10;

  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Sorting state
  const [sortBy, setSortBy] =
    useState<CustomerQuery["sort_by"]>("id");

  const [sortOrder, setSortOrder] =
    useState<CustomerQuery["sort_order"]>("desc");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);

    return () => clearTimeout(timer);
  }, [search]);

  // Fetch customers from the backend
  useEffect(() => {
    let cancelled = false;

    const fetchCustomers = async () => {
      setLoading(true);

      try {
        const response = await getCustomers({
          search: debouncedSearch,
          page,
          limit,
          sort_by: sortBy,
          sort_order: sortOrder,
        });

        if (cancelled) return;

        setCustomers(response.customers);
        setTotalCustomers(response.count);
        setTotalPages(response.total_pages);
      } catch (error) {
        if (!cancelled) {
          console.error("Error fetching customers:", error);
          toast.error("Failed to fetch customers");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchCustomers();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, page, sortBy, sortOrder]);

  // Refresh current results after editing or deleting
  const refreshCustomers = async () => {
    try {
      const response = await getCustomers({
        search: debouncedSearch,
        page,
        limit,
        sort_by: sortBy,
        sort_order: sortOrder,
      });

      setCustomers(response.customers);
      setTotalCustomers(response.count);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Error refreshing customers:", error);
      toast.error("Failed to refresh customers");
    }
  };

  // Create or update customer
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      if (editingCustomer) {
        const customer = await updateCustomer(
          editingCustomer.id,
          formData
        );

        if (customer) {
          toast.success("Customer updated successfully");

          setEditingCustomer(null);
          setFormData(emptyFormData);

          await refreshCustomers();
        }
      } else {
        const customer = await createCustomer(formData);

        if (customer) {
          toast.success("Customer created successfully");

          setFormData(emptyFormData);
          setEditingCustomer(null);

          // Reset search and return to page one
          setSearch("");
          setDebouncedSearch("");
          setPage(1);
        }
      }
    } catch (error) {
      console.error("Error saving customer:", error);
      toast.error("Failed to save customer");
    }
  };

  // Delete customer
  const delete_customer = async (id: string | number) => {
    try {
      const response = await deleteCustomer(id);

      if (response) {
        toast.success("Customer deleted successfully");

        // If this was the only customer on the current page,
        // move back one page when possible.
        if (customers.length === 1 && page > 1) {
          setPage((previousPage) => previousPage - 1);
        } else {
          await refreshCustomers();
        }
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer");
    }
  };

  // Edit customer
  const edit_customer = (customer: Customer) => {
    setEditingCustomer(customer);

    setFormData({
      customer_name: customer.customer_name,
      customer_email: customer.customer_email,
      phone: customer.phone,
      address: customer.address,
      notes: customer.notes,
    });
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingCustomer(null);
    setFormData(emptyFormData);
  };

  return (
    <div className="space-y-6">
      <ToastContainer />

      {/* Customer form */}
      <CustomerForm
        formData={formData}
        setFormData={setFormData}
        editingCustomer={editingCustomer}
        handleSubmit={handleSubmit}
        cancelEdit={cancelEdit}
      />

      {/* Search and sorting */}
      <div className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, or phone..."
          className="w-full rounded-lg border px-4 py-2"
        />

        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(
              e.target.value as CustomerQuery["sort_by"]
            );
            setPage(1);
          }}
          className="rounded-lg border px-4 py-2"
        >
          <option value="id">Date added (by ID)</option>
          <option value="customer_name">Customer name</option>
          <option value="customer_email">Email</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(
              e.target.value as CustomerQuery["sort_order"]
            );
            setPage(1);
          }}
          className="rounded-lg border px-4 py-2"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500">
        {loading
          ? "Loading customers..."
          : `${totalCustomers} customer(s) found`}
      </div>

      {/* Customer table */}
      {loading ? (
        <div className="py-8 text-center">
          Loading customers...
        </div>
      ) : customers.length > 0 ? (
        <CustomerTable
          customers={customers}
          deleteCustomer={delete_customer}
          editCustomer={edit_customer}
        />
      ) : (
        <div className="rounded-xl border p-8 text-center">
          <p className="font-medium">No customers found</p>
          <p className="mt-2 text-sm text-gray-500">
            Try another search or create a customer.
          </p>
        </div>
      )}

      {/* Reusable pagination */}
      <CustomerPagination
        page={page}
        totalPages={totalPages}
        totalCustomers={totalCustomers}
        limit={limit}
        loading={loading}
        onPageChange={setPage}
      />
    </div>
  );
}