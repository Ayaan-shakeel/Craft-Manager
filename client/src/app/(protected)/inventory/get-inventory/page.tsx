"use client";

import React, { useCallback, useEffect, useState } from "react";
import { getInventory, deleteInventory } from "@/services/inventoryService";
import { Inventory } from "@/types/inventory";
import InventoryTable from "@/components/inventory/InventoryTable";
import InventorySearchPagination from "@/components/inventory/InventorySearchPagination";
import { useSearchParams, useRouter } from "next/navigation";

export default function GetInventory() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectParam = searchParams.get("selectForOrder");
    const selectedForOrder = selectParam === "true";

    const [inventory, setInventory] = useState<Inventory[]>([]);
    const [selectedItem, setSelectedItem] = useState<Inventory | null>(null);
    const [quantity, setQuantity] = useState(1);

    // Search, pagination, and sorting
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [sortBy] = useState<"id">("id");
    const [sortOrder] = useState<"asc" | "desc">("desc");

    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [stats, setStats] = useState({
        total_products: 0,
        total_stock: 0,
        total_cost: 0,
        total_value: 0,
    });

    // Keep the search handler stable between renders.
    const handleInventorySearch = useCallback((value: string) => {
        setSearch(value);
        setDebouncedSearch(value.trim());
        setPage(1);
    }, []);

    // Fetch inventory whenever search, page, or sorting changes.
    useEffect(() => {
        let cancelled = false;

        const fetchInventory = async () => {
            setLoading(true);

            try {
                const response = await getInventory({
                    search: debouncedSearch,
                    page,
                    limit,
                    sort_by: sortBy,
                    sort_order: sortOrder,
                });

                if (cancelled) return;

                setInventory(response.inventory ?? []);
                setStats(response.stats);
                setTotalProducts(response.count);
                setTotalPages(response.total_pages);

            } catch (error) {
                if (!cancelled) {
                    console.error("Error fetching inventory:", error);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchInventory();

        return () => {
            cancelled = true;
        };
    }, [debouncedSearch, page, limit, sortBy, sortOrder]);

    const handleAddToOrder = (item: Inventory) => {
        if (!selectedForOrder) return;

        if (quantity < 1) {
            alert("Quantity must be at least 1");
            return;
        }

        if (quantity > item.quantity) {
            alert(`Only ${item.quantity} units are available`);
            return;
        }

        const existingItems = JSON.parse(
            sessionStorage.getItem("orderItems") || "[]"
        );

        const existingItem = existingItems.find(
            (orderItem: any) => orderItem.inventory_id === item.id
        );

        if (existingItem) {
            const newQuantity = existingItem.quantity + quantity;

            if (newQuantity > item.quantity) {
                alert(
                    `You can only add ${item.quantity} units of ${item.product_name}`
                );
                return;
            }

            existingItem.quantity = newQuantity;
            existingItem.total_price =
                newQuantity * existingItem.unit_price;
            existingItem.available_stock = item.quantity;

        } else {
            existingItems.push({
                inventory_id: item.id,
                product_name: item.product_name,
                quantity,
                unit_price: item.selling_price,
                total_price: item.selling_price * quantity,
                available_stock: item.quantity,
            });
        }

        sessionStorage.setItem(
            "orderItems",
            JSON.stringify(existingItems)
        );

        setSelectedItem(null);
        setQuantity(1);

        router.push("/orders/create-orders");
    };

    const handleDelete = async (id: string | number) => {
        try {
            const response = await deleteInventory(id);

            if (response) {
                alert("Inventory deleted successfully");

                // Refresh the current inventory page after deletion.
                const updatedResponse = await getInventory({
                    search: debouncedSearch,
                    page,
                    limit,
                    sort_by: sortBy,
                    sort_order: sortOrder,
                });

                setInventory(updatedResponse.inventory ?? []);
                setStats(updatedResponse.stats);
                setTotalProducts(updatedResponse.count);
                setTotalPages(updatedResponse.total_pages);
            }
        } catch (error) {
            console.error("Error while deleting inventory:", error);
            alert("Failed to delete inventory");
        }
    };

    return (
        <div className="space-y-5">
            {selectedForOrder && (
                <p className="text-sm font-medium text-gray-700">
                    Select products to add to your order.
                </p>
            )}

            {/* Search and pagination component */}
            <InventorySearchPagination
                search={search}
                onSearchChange={handleInventorySearch}
                page={page}
                totalPages={totalPages}
                totalItems={totalProducts}
                limit={limit}
                loading={loading}
                onPageChange={setPage}
            />

            {/* Inventory table */}
            {loading && inventory.length === 0 ? (
                <p className="py-8 text-center text-gray-500">
                    Loading inventory...
                </p>
            ) : inventory.length === 0 ? (
                <p className="py-8 text-center text-gray-500">
                    No inventory products found.
                </p>
            ) : (
                <InventoryTable
                    inventory={inventory}
                    stats={stats}
                    onAddToOrder={handleAddToOrder}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
}