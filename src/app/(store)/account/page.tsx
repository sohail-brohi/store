"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { formatPrice } from "@/lib/utils";
import type { Order } from "@/types";

export default function AccountPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetch(`/api/orders?email=${encodeURIComponent(user.email || "")}`)
        .then((res) => res.json())
        .then((data) => {
          setOrders(data);
        })
        .catch(() => setOrders([]))
        .finally(() => setOrdersLoading(false));
    }
  }, [user]);

  if (loading) return <LoadingSpinner />;

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <PageHeader
        title="My Account"
        subtitle={`Welcome, ${user.displayName || user.email}`}
      />

      <div className="mb-8 rounded-sm border border-border p-6">
        <h2 className="mb-4 text-lg font-semibold">Account Details</h2>
        <div className="space-y-2 text-sm text-muted">
          <p>
            <span className="text-muted/70">Name:</span> {user.displayName || "Not set"}
          </p>
          <p>
            <span className="text-muted/70">Email:</span> {user.email}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/orders">
            <Button size="sm">View All Orders</Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            Sign Out
          </Button>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold">Recent Orders</h2>
        {ordersLoading ? (
          <LoadingSpinner />
        ) : orders.length === 0 ? (
          <p className="text-muted">No orders yet. Start shopping!</p>
        ) : (
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="rounded-sm border border-border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-sm text-gold">{order.orderNumber}</p>
                    <p className="text-xs text-muted">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{formatPrice(order.total)}</p>
                    <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs capitalize text-gold">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
