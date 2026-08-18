import React from 'react'
import { Inventory } from '@/types/inventory'
interface InventoryTableProps{
  inventory:Inventory[],
  stats: {
    total_products: number;
    total_stock: number;
    total_cost: number;
    total_value: number;
  }
  onAddToOrder?:(items : Inventory) => void;
  selectedItem?:Inventory;
  setSelectedItem:React.Dispatch<React.SetStateAction<Inventory | null>>;
  quantity:number;
  setQuantity:React.Dispatch<React.SetStateAction<number>>;
}
export default function InventoryTable({inventory,stats,onAddToOrder,selectedItem,setSelectedItem,quantity,setQuantity} : InventoryTableProps) {
  return (
     <div>
      {inventory.map((item) => (
        <div key={item.id}>
          <div>{item.product_name}</div>
          <div>Stock: {item.quantity}</div>
          <div>₹{item.selling_price}</div>
          <div>{item.category}</div>
          <div>{item.sku}</div>
          <div>{item.stock_status}</div>

        {onAddToOrder && (
  <button
  type="button"
  onClick={() => {
    setSelectedItem(item);
    setQuantity(1);
  }}
  disabled={item.quantity <= 0}
  className="rounded-lg bg-blue-600 px-3 py-2 text-white disabled:bg-gray-400"
>
  {item.quantity > 0 ? "Add to Order" : "Out of Stock"}
</button>
)}
        </div>
      ))}

      <div>
        <p>Total Products: {stats.total_products}</p>
        <p>Total Stock: {stats.total_stock}</p>
        <p>Total Cost: ₹{stats.total_cost}</p>
        <p>Total Value: ₹{stats.total_value}</p>
      </div>

      {selectedItem && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

      <h2 className="text-xl font-bold">
        Add Product
      </h2>

      <p className="mt-2 text-gray-600">
        {selectedItem.product_name}
      </p>

      <p className="text-sm text-gray-500">
        Available stock: {selectedItem.quantity}
      </p>

      <div className="mt-6">
        <label className="mb-2 block font-semibold">
          Quantity
        </label>

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={() =>
              setQuantity((q) => Math.max(1, q - 1))
            }
            className="h-10 w-10 rounded-lg bg-gray-200 text-xl"
          >
            -
          </button>

          <input
            type="number"
            min={1}
            max={selectedItem.quantity}
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value);

              if (value >= 1 && value <= selectedItem.quantity) {
                setQuantity(value);
              }
            }}
            className="h-10 w-20 rounded-lg border text-center"
          />

          <button
            type="button"
            onClick={() =>
              setQuantity((q) =>
                Math.min(selectedItem.quantity, q + 1)
              )
            }
            className="h-10 w-10 rounded-lg bg-gray-200 text-xl"
          >
            +
          </button>

        </div>
      </div>

      <div className="mt-6 flex gap-3">

        <button
          type="button"
          onClick={() => setSelectedItem(null)}
          className="flex-1 rounded-lg border px-4 py-2"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={onAddToOrder}
          className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          Add
        </button>

      </div>

    </div>
  </div>
)}
    </div>
  )
}
