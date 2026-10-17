"use client";

import { useEffect, useState } from "react";

interface InventorySearchPaginationProps {
    search: string;
    onSearchChange: (value: string) => void;

    page: number;
    totalPages: number;
    totalItems: number;
    limit: number;

    loading: boolean;
    onPageChange: (page: number) => void;
}

export default function InventorySearchPagination({
    search,
    onSearchChange,
    page,
    totalPages,
    totalItems,
    limit,
    loading,
    onPageChange,
}: InventorySearchPaginationProps) {
    const [searchInput, setSearchInput] = useState(search);

    // Keep the input synchronized with the parent's search state.
    useEffect(() => {
        setSearchInput(search);
    }, [search]);

    // Debounce search to avoid an API request on every keystroke.
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput !== search) {
                onSearchChange(searchInput);
            }
        }, 350);

        return () => clearTimeout(timer);
    }, [searchInput, search, onSearchChange]);

    const safeTotalPages = Math.max(totalPages, 1);

    const startItem =
        totalItems === 0 ? 0 : (page - 1) * limit + 1;

    const endItem = Math.min(page * limit, totalItems);

    const getPageNumbers = () => {
        const pages: number[] = [];

        const start = Math.max(1, page - 2);
        const end = Math.min(safeTotalPages, page + 2);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        return pages;
    };

    return (
        <div className="space-y-4">
            {/* Search input */}
            <div className="relative w-full">
                <input
                    type="search"
                    value={searchInput}
                    onChange={(event) => setSearchInput(event.target.value)}
                    placeholder="Search product name, SKU, or category..."
                    aria-label="Search inventory"
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {searchInput && (
                    <button
                        type="button"
                        onClick={() => {
                            setSearchInput("");
                            onSearchChange("");
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-900"
                        aria-label="Clear inventory search"
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Result information */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-600">
                    {loading
                        ? "Loading inventory..."
                        : `Showing ${startItem}–${endItem} of ${totalItems} products`}
                </p>

                {/* Pagination controls */}
                {totalItems > 0 && (
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            type="button"
                            disabled={page <= 1 || loading}
                            onClick={() => onPageChange(page - 1)}
                            className="rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Previous
                        </button>

                        {getPageNumbers().map((pageNumber) => (
                            <button
                                type="button"
                                key={pageNumber}
                                disabled={loading}
                                onClick={() => onPageChange(pageNumber)}
                                aria-current={
                                    pageNumber === page ? "page" : undefined
                                }
                                className={`min-w-10 rounded-lg border px-3 py-2 text-sm transition ${
                                    pageNumber === page
                                        ? "border-blue-600 bg-blue-600 text-white"
                                        : "hover:bg-gray-100"
                                } disabled:cursor-not-allowed disabled:opacity-60`}
                            >
                                {pageNumber}
                            </button>
                        ))}

                        <button
                            type="button"
                            disabled={page >= safeTotalPages || loading}
                            onClick={() => onPageChange(page + 1)}
                            className="rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}