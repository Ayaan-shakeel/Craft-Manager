"use client"
import React, { useEffect, useState } from 'react'
import { getInventory } from '@/services/inventoryService'
import { Inventory } from '@/types/inventory'
import InventoryTable from '@/components/inventory/InventoryTable'
import { useSearchParams, useRouter } from 'next/navigation'

export default function GetInventory() {
    const searchParams =  useSearchParams();
    const router = useRouter();
     const selectParam = searchParams.get("selectForOrder");
     const selectedForOrder = selectParam === "true";

  console.log("URL:", window.location.href);
  console.log("selectForOrder:", selectParam);
  console.log("selectedForOrder:", selectedForOrder);

    // const selectedForOrder = searchParams.get("selectForOrder") === "true";
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
  console.log("1. handleAddToOrder started");
  console.log("2. Item:", item);
  console.log("3. Quantity:", quantity);

  if (!selectedForOrder) {
    console.log("STOP: selectedForOrder is false");
    return;
  }

  if (!item) {
    console.log("STOP: item is missing");
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

  console.log("4. Validation passed");

  const existingItems = JSON.parse(
    sessionStorage.getItem("orderItems") || "[]"
  );

  console.log("5. Existing items:", existingItems);

  const existingItem = existingItems.find(
    (orderItem: any) =>
      orderItem.inventory_id === item.id
  );

  console.log("6. Existing item:", existingItem);

  if (existingItem) {
    const newQuantity =
      existingItem.quantity + quantity;

    console.log("7. New quantity:", newQuantity);

    if (newQuantity > item.quantity) {
      alert(
        `You can only add ${item.quantity} units of ${item.product_name}`
      );
      return;
    }

    existingItem.quantity = newQuantity;

    existingItem.total_price =
      newQuantity * existingItem.unit_price;

    existingItem.available_stock =
      item.quantity;

  } else {

    console.log("7. Adding new item");

    existingItems.push({
      inventory_id: item.id,
      product_name: item.product_name,
      quantity: quantity,
      unit_price: item.selling_price,
      total_price: item.selling_price * quantity,
      available_stock: item.quantity,
    });
  }

  console.log("8. Before session storage");

  sessionStorage.setItem(
    "orderItems",
    JSON.stringify(existingItems)
  );

  console.log(
    "9. Saved:",
    JSON.parse(sessionStorage.getItem("orderItems") || "[]")
  );

  setSelectedItem(null);
  setQuantity(1);

  console.log("10. Going back to orders");

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
