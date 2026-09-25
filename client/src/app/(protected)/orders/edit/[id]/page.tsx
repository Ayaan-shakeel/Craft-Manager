"use client";

import React, { useEffect, useState } from "react";
import {
  getOrderById,
  updateOrder,
} from "@/services/orderService";
import { useParams, useRouter } from "next/navigation";
import { Customer } from "@/types/customer";
import { getCustomers } from "@/services/customerService";
import OrdersForm from "@/components/orders/OrdersForm";
import {
  OrderData,
  OrderItem,
} from "@/types/order";
import { toast, ToastContainer } from "react-toastify";

export default function Edit() {
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
   * Calculate subtotal
   */
  const subtotal = items.reduce(
    (total, item) => total + item.total_price,
    0
  );

  /*
   * Calculate tax
   */
  const taxAmount =
    (subtotal * formData.tax) / 100;

  /*
   * Calculate final total
   */
  const totalAmount =
    subtotal -
    formData.discount +
    taxAmount +
    formData.shipping_charges +
    formData.other_charges;

  /*
   * Calculate remaining payment
   */
  const remainingAmount = Math.max(
    0,
    totalAmount - formData.amount_paid
  );

  /*
   * Fetch customers
   */
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await getCustomers();

        if (response) {
          setCustomers(response);
        }
      } catch (error) {
        toast.error("Failed to get customers");
        console.error(
          "Error fetching customers:",
          error
        );
      }
    };

    fetchCustomers();
  }, []);

  /*
   * Fetch existing order
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
         * Load order items
         */
        const existingItems: OrderItem[] =
          response.items ?? [];

        setItems(existingItems);

        /*
         * Load order information
         */
        setFormData({
          customer_id:
            response.customer_id ??
            response.customer?.id ??
            0,

          items: existingItems.map(
            (item: OrderItem) => ({
              inventory_id: item.inventory_id,
              quantity: item.quantity,
            })
          ),

          discount: response.discount ?? 0,

          tax: response.tax ?? 0,

          shipping_charges:
            response.shipping_charges ?? 0,

          other_charges:
            response.other_charges ?? 0,

          payment_status:
            response.payment_status ?? "unpaid",

          amount_paid:
            response.amount_paid ?? 0,
        });
      } catch (error) {
        toast.error("Failed to get order");

        console.error(
          "Error fetching order:",
          error
        );
      }
    };

    fetchOrder();
  }, [id]);

  /*
   * Remove product
   */
  const removeItem = (inventoryId: number) => {
    const updatedItems = items.filter(
      (item) =>
        item.inventory_id !== inventoryId
    );

    setItems(updatedItems);

    setFormData((previous) => ({
      ...previous,
      items: updatedItems.map((item) => ({
        inventory_id: item.inventory_id,
        quantity: item.quantity,
      })),
    }));
  };

  /*
   * Update product quantity
   */
  const updateItemQuantity = (
    inventoryId: number,
    quantity: number
  ) => {
    const updatedItems = items.map((item) => {
      if (item.inventory_id === inventoryId) {
        return {
          ...item,
          quantity,
          total_price:
            quantity * item.unit_price,
        };
      }

      return item;
    });

    setItems(updatedItems);

    setFormData((previous) => ({
      ...previous,
      items: updatedItems.map((item) => ({
        inventory_id: item.inventory_id,
        quantity: item.quantity,
      })),
    }));
  };

  /*
   * Clear products
   */
  const clearAllItems = () => {
    setItems([]);

    setFormData((previous) => ({
      ...previous,
      items: [],
    }));
  };

  /*
   * Submit update
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error(
        "Please add at least one product"
      );
      return;
    }

    if (formData.customer_id === 0) {
      toast.error(
        "Please select a customer"
      );
      return;
    }

    try {
      const updatedOrder =
        await updateOrder(id, {
          ...formData,

          items: items.map((item) => ({
            inventory_id:
              item.inventory_id,

            quantity:
              item.quantity,
          })),
        });

      if (updatedOrder) {
        toast.success(
          "Order updated successfully"
        );

        setTimeout(() => {
          router.push("/orders/get-orders");
        }, 800);
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
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        editing={true}
        items={items}
        subtotal={subtotal}
        removeItem={removeItem}
        updateItemQuantity={
          updateItemQuantity
        }
        clearAllItems={
          clearAllItems
        }
        totalAmount={totalAmount}
        remainingAmount={
          remainingAmount
        }
        paymentStatus={
          formData.payment_status
        }
      />
    </div>
  );
}