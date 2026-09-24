import React from "react";
import { Inventory } from "@/types/inventory";
import { PackageSearch, Trash2, Plus, Minus, ShoppingCart, Eye, Pencil } from "lucide-react";
import Link from "next/link";

interface InventoryTableProps {
  inventory: Inventory[];
  stats: {
    total_products: number;
    total_stock: number;
    total_cost: number;
    total_value: number;
  };
  onAddToOrder?: (items: Inventory) => void;
  selectedItem?: Inventory | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<Inventory | null>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  handleDelete: (id: string | number) => void;
  onView?: (item: Inventory) => void; // new prop
}

export default function InventoryTable({
  inventory,
  stats,
  onAddToOrder,
  selectedItem,
  setSelectedItem,
  quantity,
  setQuantity,
  handleDelete,
  onView,
}: InventoryTableProps) {
  return (
    <section className="w-full">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <PackageSearch size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">
                Inventory
              </h2>
              <p className="text-sm text-slate-500">
                Manage stock, pricing, and product availability.
              </p>
            </div>
          </div>
        </div>

        {inventory.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <PackageSearch size={28} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">
              No inventory yet
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              Add products to start managing stock and creating orders.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile cards */}
            <div className="space-y-4 p-4 sm:p-6 lg:hidden">
              {inventory.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-slate-800">
                        {item.product_name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        SKU: {item.sku}
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 whitespace-nowrap">
                      {item.stock_status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-xs font-medium text-slate-400">Stock</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {item.quantity}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-xs font-medium text-slate-400">
                        Selling Price
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        ₹ {item.selling_price}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-xs font-medium text-slate-400">
                        Category
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {item.category}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white p-3">
                      <p className="text-xs font-medium text-slate-400">SKU</p>
                      <p className="mt-1 truncate text-sm font-semibold text-slate-800">
                        {item.sku}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    {onView && (
                      <button
                        onClick={() => onView(item)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    )}
                    {onView && (
   
                     <button
                        onClick={() => onView(item)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>

                    {onAddToOrder && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedItem(item);
                          setQuantity(1);
                        }}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        disabled={item.quantity <= 0}
                      >
                        <ShoppingCart size={16} />
                        {item.quantity > 0 ? "Add" : "Out"}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop table */}
            <div className="hidden p-6 lg:block">
              <table className="w-full table-fixed border-separate border-spacing-y-3">
                <thead>
                  <tr>
                    <th className="w-[22%] px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Product
                    </th>
                    <th className="w-[9%] px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Stock
                    </th>
                    <th className="w-[11%] px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Cost
                    </th>
                    <th className="w-[11%] px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Selling
                    </th>
                    <th className="w-[14%] px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Category
                    </th>
                    <th className="w-[13%] px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      SKU
                    </th>
                    <th className="w-[9%] px-2 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>
                    <th className="w-[5%] px-2 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      View
                    </th>
                    <th className="w-[5%] px-2 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Edit
                    </th>
                    <th className="w-[5%] px-2 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Del
                    </th>
                    <th className="w-[5%] px-2 py-3 text-center text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Add
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {inventory.map((item) => (
                    <tr
                      key={item.id}
                      className="rounded-2xl bg-slate-50 shadow-sm transition hover:bg-slate-100/80"
                    >
                      <td className="rounded-l-2xl px-2 py-4">
                        <p className="truncate text-sm font-semibold text-slate-800">
                          {item.product_name}
                        </p>
                      </td>
                      <td className="px-2 py-4 text-sm text-slate-600">
                        {item.quantity}
                      </td>
                      <td className="px-2 py-4 text-sm text-slate-600 whitespace-nowrap">
                        ₹ {item.cost_price}
                      </td>
                      <td className="px-2 py-4 text-sm font-semibold text-slate-800 whitespace-nowrap">
                        ₹ {item.selling_price}
                      </td>
                      <td className="px-2 py-4 text-sm text-slate-600">
                        <p className="truncate">{item.category}</p>
                      </td>
                      <td className="px-2 py-4 text-sm text-slate-600">
                        <p className="truncate">{item.sku}</p>
                      </td>
                      <td className="px-2 py-4">
                        <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 whitespace-nowrap">
                          {item.stock_status}
                        </span>
                      </td>

                      {/* View */}
                      <td className="px-2 py-4 text-center">
                         <Link
                                 href={`/inventory/view/${item.id}`}
                                 className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                               >
                                 <Eye size={16} />
                               </Link>
                      </td>
                      <td className="px-2 py-4 text-center">
                         <Link
                                 href={`/inventory/edit/${item.id}`}
                                 className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                               >
                                 <Pencil size={16} />
                               </Link>
                      </td>

                      {/* Delete */}
                      <td className="px-2 py-4 text-center">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-600 transition hover:bg-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>

                      {/* Add to order */}
                      <td className="rounded-r-2xl px-2 py-4 text-center">
                        {onAddToOrder && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedItem(item);
                              setQuantity(1);
                            }}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                            disabled={item.quantity <= 0}
                          >
                            <ShoppingCart size={16} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 border-t border-slate-200 p-4 sm:grid-cols-4 sm:p-6">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">Products</p>
                <p className="mt-1 text-lg font-bold text-slate-800">
                  {stats.total_products}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">Stock</p>
                <p className="mt-1 text-lg font-bold text-slate-800">
                  {stats.total_stock}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">Cost</p>
                <p className="mt-1 text-lg font-bold text-slate-800">
                  ₹ {stats.total_cost}
                </p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-4">
                <p className="text-xs font-medium text-blue-500">Value</p>
                <p className="mt-1 text-lg font-bold text-slate-900">
                  ₹ {stats.total_value}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-product-title"
            className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl sm:p-6"
          >
            <h2 id="add-product-title" className="text-xl font-bold text-slate-800">
              Add Product
            </h2>
            <p className="mt-2 text-slate-600">{selectedItem.product_name}</p>
            <p className="text-sm text-slate-500">
              Available stock: {selectedItem.quantity}
            </p>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg text-slate-700 transition hover:bg-slate-200"
                >
                  <Minus size={16} />
                </button>

                <input
                  type="number"
                  min={1}
                  max={selectedItem.quantity}
                  value={quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value < 1) return setQuantity(1);
                    if (value > selectedItem.quantity)
                      return setQuantity(selectedItem.quantity);
                    setQuantity(value);
                  }}
                  className="h-11 w-full rounded-xl border border-slate-300 px-3 text-center text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(selectedItem.quantity, q + 1))
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg text-slate-700 transition hover:bg-slate-200"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!selectedItem) return;
                  onAddToOrder?.(selectedItem);
                }}
                className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}