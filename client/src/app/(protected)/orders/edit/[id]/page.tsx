"use client";

import React, { useEffect, useState } from "react";
import {
  getOrderById,
  updateOrder,
} from "@/services/orderService";
import { getCustomers } from "@/services/customerService";
import { useParams, useRouter } from "next/navigation";
import { Customer } from "@/types/customer";
import {
  OrderData,
  OrderItem,
} from "@/types/order";
import OrdersForm from "@/components/orders/OrdersForm";
import { toast, ToastContainer } from "react-toastify";

export default function EditOrder() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);

  const [formData, setFormData] = useState<OrderData>({
    customer_id: 0,
    items: [],
    discount: 0,
    tax: 0,
    shipping_charges: 0,
    other_charges: 0,
    payment_status: "unpaid",
    amount_paid: 0,
  });

  /*
  ============================
  FETCH CUSTOMERS
  ============================
  */

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();

        if (response) {
          setCustomers(response);
        }
      } catch (error) {
        console.error(
          "Error fetching customers:",
          error
        );

        toast.error("Failed to fetch customers");
      }
    };

    fetchCustomers();
  }, []);

  /*
  ============================
  FETCH ORDER
  ============================
  */

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await getOrderById(id);

        if (!response) {
          toast.error("Order not found");
          return;
        }

        console.log("Existing order:", response);

        /*
        Convert backend order items
        into the format OrdersForm expects
        */

        const existingItems: OrderItem[] =
          (response.items || []).map(
            (item: any) => ({
              id: item.id,
              inventory_id: item.inventory_id,
              product_name: item.product_name,
              quantity: item.quantity,
              unit_price: item.unit_price,
              total_price: item.total_price,

              /*
              Backend update response doesn't
              currently return available_stock.

              We temporarily use the current
              quantity so the existing item
              doesn't immediately break.
              */
              available_stock:
                item.available_stock ??
                item.quantity,
            })
          );

        setItems(existingItems);

        setFormData({
          customer_id:
            response.customer_id ?? 0,

          items: existingItems.map((item) => ({
            inventory_id: item.inventory_id,
            quantity: item.quantity,
          })),

          discount:
            Number(response.discount ?? 0),

          tax:
            Number(response.tax ?? 0),

          shipping_charges:
            Number(response.shipping_charges ?? 0),

          other_charges:
            Number(response.other_charges ?? 0),

          payment_status:
            response.payment_status ?? "unpaid",

          amount_paid:
            Number(response.amount_paid ?? 0),
        });
      } catch (error) {
        console.error(
          "Error fetching order:",
          error
        );

        toast.error("Failed to fetch order");
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);

  /*
  ============================
  CALCULATIONS
  ============================
  */

  const subTotal = items.reduce(
    (total, item) =>
      total +
      item.quantity * item.unit_price,
    0
  );

  const taxAmount =
    (subTotal * formData.tax) / 100;

  const totalAmount =
    subTotal -
    formData.discount +
    formData.other_charges +
    formData.shipping_charges +
    taxAmount;

  const remainingAmount = Math.max(
    0,
    totalAmount - formData.amount_paid
  );

  const paymentStatus =
    formData.amount_paid <= 0
      ? "unpaid"
      : formData.amount_paid >= totalAmount
      ? "paid"
      : "partial";

  /*
  ============================
  REMOVE ITEM
  ============================
  */

  const removeItem = (
    inventoryId: number
  ) => {
    setItems((prev) =>
      prev.filter(
        (item) =>
          item.inventory_id !== inventoryId
      )
    );
  };

  /*
  ============================
  UPDATE ITEM QUANTITY
  ============================
  */

  const updateItemQuantity = (
    inventoryId: number,
    quantity: number
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.inventory_id === inventoryId
          ? {
              ...item,
              quantity,
              total_price:
                quantity *
                item.unit_price,
            }
          : item
      )
    );
  };

  /*
  ============================
  CLEAR ITEMS
  ============================
  */

  const clearAllItems = () => {
    if (items.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to clear all items?"
    );

    if (confirmed) {
      setItems([]);
    }
  };

  /*
  ============================
  SUBMIT UPDATE
  ============================
  */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (formData.customer_id === 0) {
      toast.error(
        "Please select a customer"
      );
      return;
    }

    if (items.length === 0) {
      toast.error(
        "Please add at least one product"
      );
      return;
    }

    try {
      const data: OrderData = {
        customer_id:
          formData.customer_id,

        items: items.map((item) => ({
          inventory_id:
            item.inventory_id,

          quantity:
            item.quantity,
        })),

        discount:
          formData.discount,

        tax:
          formData.tax,

        shipping_charges:
          formData.shipping_charges,

        other_charges:
          formData.other_charges,

        payment_status:
          paymentStatus,

        amount_paid:
          formData.amount_paid,
      };

      const response =
        await updateOrder(id, data);

      if (response) {
        toast.success(
          "Order updated successfully"
        );

        router.push(
          "/orders/get-orders"
        );
      }
    } catch (error) {
      console.error(
        "Error updating order:",
        error
      );

      toast.error(
        "Failed to update order"
      );
    }
  };

  return (
    <div>
      <ToastContainer />

      <OrdersForm
        customers={customers}
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        editing={true}
        items={items}
        subtotal={subTotal}
        removeItem={removeItem}
        updateItemQuantity={
          updateItemQuantity
        }
        clearAllItems={
          clearAllItems
        }
        totalAmount={
          totalAmount
        }
        remainingAmount={
          remainingAmount
        }
        paymentStatus={
          paymentStatus
        }
      />
    </div>
  );
}