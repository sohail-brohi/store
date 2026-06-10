"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/auth");
  }, [user, loading, router]);

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/orders?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then(setOrders)
        .catch(() => setOrders([]))
        .finally(() => setOrdersLoading(false));
    }
  }, [user]);

  if (loading || ordersLoading) return <LoadingSpinner fullScreen />;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <PageHeader title="My Orders" subtitle="Track and manage your orders" />

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package size={48} className="mx-auto mb-4 text-muted" />
          <p className="text-muted mb-6">You haven&apos;t placed any orders yet.</p>
          <Link href="/products">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-sm border border-border p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-sm text-gold">{order.orderNumber}</p>
                  <p className="text-xs text-muted">
                    {order.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(order.total)}</p>
                  <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs capitalize text-gold">
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="mt-4 border-t border-border pt-4">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-muted">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
