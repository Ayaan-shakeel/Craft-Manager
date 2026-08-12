import React from "react";
import { PackagePlus } from "lucide-react";
import { Inventory } from "@/types/inventory";

interface InventoryFormProps {
  inventory: Inventory;
  setInventory: React.Dispatch<React.SetStateAction<Inventory>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function InventoryForm({
  inventory,
  setInventory,
  handleSubmit,
}: InventoryFormProps) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]">
          <div className="border-b border-slate-200 px-5 py-6 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <PackagePlus size={22} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                  Create Inventory
                </h1>
                <p className="mt-1 text-sm text-slate-500 sm:text-base">
                  Add product details, pricing, stock, and category information.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-5 sm:p-8">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  htmlFor="product_name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="product_name"
                  id="product_name"
                  value={inventory.product_name}
                  onChange={(e) =>
                    setInventory({ ...inventory, product_name: e.target.value })
                  }
                  placeholder="Enter product name"
                  required
                  className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={inventory.quantity === 0 ? "" : inventory.quantity}
                  onChange={(e) =>
                    setInventory({
                      ...inventory,
                      quantity: e.target.value === "" ? 0 : Number(e.target.value),
                    })
                  }
                  placeholder="Enter quantity"
                  required
                  className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="sku"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  id="sku"
                  value={inventory.sku}
                  onChange={(e) =>
                    setInventory({ ...inventory, sku: e.target.value })
                  }
                  placeholder="Enter SKU"
                  required
                  className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="cost_price"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Cost Price
                </label>
                <input
                  type="number"
                  name="cost_price"
                  id="cost_price"
                  value={inventory.cost_price === 0 ? "" : inventory.cost_price}
                  onChange={(e) =>
                    setInventory({
                      ...inventory,
                      cost_price: e.target.value === "" ? 0 : Number(e.target.value),
                    })
                  }
                  placeholder="Enter cost price"
                  required
                  className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="selling_price"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Selling Price
                </label>
                <input
                  type="number"
                  name="selling_price"
                  id="selling_price"
                  value={inventory.selling_price === 0 ? "" : inventory.selling_price}
                  onChange={(e) =>
                    setInventory({
                      ...inventory,
                      selling_price: e.target.value === "" ? 0 : Number(e.target.value),
                    })
                  }
                  placeholder="Enter selling price"
                  required
                  className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={inventory.category}
                  onChange={(e) =>
                    setInventory({ ...inventory, category: e.target.value })
                  }
                  required
                  className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Select category</option>
                  <option value="Medicine">Medicine</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Food">Food</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Cosmetics">Cosmetics</option>
                  <option value="Books">Books</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Stationery">Stationery</option>
                  <option value="Sports">Sports</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 active:scale-[0.99]"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}