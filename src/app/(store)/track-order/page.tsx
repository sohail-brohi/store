"use client";

import { useState } from "react";
import { Search, Package } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotFound(false);
    setOrder(null);

    try {
      const res = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const orders: Order[] = await res.json();
      const found = orders.find(
        (o) => o.orderNumber.toLowerCase() === orderNumber.trim().toLowerCase()
      );
      if (found) {
        setOrder(found);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <PageHeader title="Track Your Order" subtitle="Enter your order details to check status" />

      <form onSubmit={handleTrack} className="mb-8 space-y-4">
        <div>
          <label className="mb-1 block text-sm text-muted">Order Number</label>
          <input
            type="text"
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="e.g. LX-ABC123"
            className="w-full rounded-sm border border-border bg-transparent px-4 py-3 focus:border-gold focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-muted">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-sm border border-border bg-transparent px-4 py-3 focus:border-gold focus:outline-none"
          />
        </div>
        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          <Search size={18} className="mr-2" />
          {loading ? "Tracking..." : "Track Order"}
        </Button>
      </form>

      {notFound && (
        <p className="text-center text-sm text-red-400">
          Order not found. Please check your order number and email.
        </p>
      )}

      {order && (
        <div className="rounded-sm border border-border p-6">
          <div className="mb-4 flex items-center gap-3">
            <Package size={24} className="text-gold" />
            <div>
              <p className="font-mono text-gold">{order.orderNumber}</p>
              <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs capitalize text-gold">
                {order.status}
              </span>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted">
            <p>Total: {formatPrice(order.total)}</p>
            <p>Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : "Card"}</p>
            <p>
              Placed: {order.createdAt ? new Date(order.createdAt).toLocaleString() : "—"}
            </p>
          </div>
          <div className="mt-4 border-t border-border pt-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
