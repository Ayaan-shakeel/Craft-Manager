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
}
export default function InventoryTable({inventory,stats} : InventoryTableProps) {
  return (
    <div>InventoryTable

      {
                inventory.map((response,index)=>(
                    <div key={index}>
                        <div>
                        {response.product_name}
                        </div>
                        <div>
                        {response.quantity}
                        </div>
                        <div>
                        {response.cost_price}
                        </div>
                        <div>
                        {response.selling_price}
                        </div>
                        <div>
                        {response.category}
                        </div>
                        <div>
                        {response.sku}
                        </div>
                        <div>

                        {response.stock_status}
                        </div>
                        </div>


                ))
                           
            }
                        <div>
                            {stats.total_products}
                            {stats.total_stock}
                            {stats.total_cost}
                            {stats.total_value}
                            </div>
       
    </div>
  )
}
