"use client"
import React, { useEffect, useState } from 'react'
import { getInventory } from '@/services/inventoryService'
import { Inventory } from '@/types/inventory'
import InventoryTable from '@/components/inventory/InventoryTable'
import { useSearchParams, useRouter } from 'next/navigation'

export default function GetInventory() {
    const searchParams =  useSearchParams();
    const router = useRouter();
    const selectedForOrder = searchParams.get("selectForOrder") === "true";
    const [inventory, setInventory] = useState<Inventory[]>([])
    const [selectedItem, setSelectedItem] = useState<Inventory | null>(null)
    const [quantity, setQuantity] = useState(1)
    const [stats,setStats]=useState({
        total_products:0,
        total_stock:0,
        total_cost:0,
        total_value:0
    })
    useEffect(()=>{
        const fetchInventory=async()=>{
        try{
           const response=await getInventory()
           if(response){
               setInventory(response.inventory)
               setStats(response.stats)
               console.log(response.inventory)
               console.log(response.stats)

           }
            }catch(error){
                console.log(error)
            }
        }
        fetchInventory()
        },[])

      const handleAddToOrder = (item: Inventory) => {
  if (!selectedForOrder) return;

  if (!item) {
    alert("Please select a product");
    return;
  }

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
  return (
    <div>
        <h1>Inventory</h1>
        {selectedForOrder && (
            <p>Select products to add your order</p>
        ) 
        }
        <div>
            <InventoryTable inventory={inventory} stats={stats} onAddToOrder={handleAddToOrder} selectedItem={selectedItem} setSelectedItem={setSelectedItem} quantity={quantity} setQuantity={setQuantity} />
             </div>
    </div>
  )
}
