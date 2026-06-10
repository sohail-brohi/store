"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

export function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update");
      setStatus(newStatus);
      toast.success("Order status updated");
    } catch {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={loading}
      className="mt-2 rounded border border-white/20 bg-transparent px-2 py-1 text-xs capitalize text-gold focus:outline-none light:border-black/20"
    >
      {statuses.map((s) => (
        <option key={s} value={s} className="bg-[#1a1a1a]">
          {s}
        </option>
      ))}
    </select>
  );
}
