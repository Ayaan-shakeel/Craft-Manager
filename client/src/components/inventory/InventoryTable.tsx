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
}
export default function InventoryTable({inventory,stats,onAddToOrder} : InventoryTableProps) {
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
    onClick={() => onAddToOrder(item)}
    disabled={item.quantity <= 0}
    className="rounded-lg bg-blue-600 px-3 py-2 text-white"
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
    </div>
  )
}
