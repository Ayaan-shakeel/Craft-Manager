'use client'
import React, { useState, useEffect } from 'react'
import { getOrders, updateOrderStatus, deleteOrder, exportOrders } from "@/services/orderService"
import OrderTable from "@/components/orders/OrderTable"
import { Order, OrderItem } from "@/types/order"
import OrdersFilter from '@/components/orders/OrdersFilter'
import OrdersPagination from '@/components/orders/OrdersPagination'
import OrderSkeleton from '@/components/orders/OrderSkeleton'
import OrdersStats from '@/components/orders/OrdersStats'
import {toast ,ToastContainer} from "react-toastify"
import DeleteModal from "@/components/ui/DeleteModal"
export default function GetOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [items, setItems] = useState<OrderItem[]>([])
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("all")
  const [sort, setSort] = useState("newest")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [stats,setStats]=useState({
    total_orders:0,
    pending:0,
    completed:0,
    shipped:0,
    revenue:0
  })
  const [deleteModalOpen,setDeleteModalOpen]=useState(false)
const [selectedOrder,setSelectedOrder]=useState<number | null>(null)
   const [loading,setLoading]=useState(true)
  orders.forEach((order) => {
    console.log(order.id, order)
  })
  useEffect(() => {
    const fetchOrders = async () => {
      try {

        const order = await getOrders(search, status, sort, page)
        if (order) {
          setOrders(order.orders)
          console.log(order.orders.items)
          setTotalPages(Math.ceil(order.count / order.limit))
          setLoading(false)
          setStats(order.stats)
          console.log("Orders data:", order.orders)
        }
      } catch (error) {
        setLoading(false)
        console.error("Error fetching Orders:", error)
        toast.error("Error fetching Orders:")
      }
    }
    fetchOrders()
  }, [search, status, sort, page])

  const updateStatus = async (id: string | number, status: string) => {
    console.log(id)
    console.log(status)
    try {
      const response = await updateOrderStatus(id, status)

      if (response) {
        console.log(response)
        setOrders(prev => prev.map(order => order.id === id ? { ...order, status } : order))
        toast.success("Status Updated")

      }

    } catch (error) {
      toast.error("Updating status failed")
      console.error("Error while updating order status",error)
    }
  }
  const delete_Order = async (id: string | number) => {
  setSelectedOrder(Number(id))
  setDeleteModalOpen(true)
  }
  const confirmDelete = async () => {
    if (selectedOrder === null) return;

    try {
        const response = await deleteOrder(selectedOrder);

        if (response) {
            setOrders(prev =>
                prev.filter(order => order.id !== selectedOrder)
            );

            toast.success("Order deleted successfully");
        }

    } catch (error) {
        toast.error("Failed to delete order");
        console.error(error);
    }

    setDeleteModalOpen(false);
    setSelectedOrder(null);
}
  const handleExport = async () => {
    try {
      const blob = await exportOrders();
      if (!blob) return;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "orders.csv";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url)
    } catch(error){
      toast.error("Exporting Orders Failed")
      console.error("Error while exporting orders",error)

    }
  }
  return (
    <section className="min-h-screen bg-slate-50 py-6 sm:py-8 lg:py-10">
      <ToastContainer/>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 max-w-2xl text-center sm:mb-8 lg:mb-10">
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl lg:text-4xl">
            Manage your orders
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500 sm:mt-3 sm:text-base lg:text-lg">
            Update status, and review customer order details.
          </p>
        </div>
        {/* <OrdersStats stats={stats}/> */}
        <OrdersFilter
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          sort={sort}
          setSort={setSort}
          setPage={setPage} />
          <button
  onClick={handleExport}
  className="rounded-xl bg-blue-600 px-5 py-2 mt-5 sm:w-full  text-white font-semibold hover:bg-blue-700 transition"
>
  Export CSV
</button>
        <div className="w-full">
          {
            loading?(
            <OrderSkeleton/>):(

              <OrderTable
              Orders={orders}
              deleteOrder={delete_Order}
              updateStatus={updateStatus}
              />
            )
        }
        </div>
        <div>
          <OrdersPagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
      </div>
      <ToastContainer/>
      <DeleteModal
  isOpen={deleteModalOpen}
  title="Delete Order"
  message="Are you sure you want to delete this order? This action cannot be undone."
  onClose={() => {
    setDeleteModalOpen(false)
    setSelectedOrder(null)
  }}
  onConfirm={confirmDelete}
/>
    </section>
  )
}
