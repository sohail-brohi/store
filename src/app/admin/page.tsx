import { Package, ShoppingCart, Star, MessageSquare } from "lucide-react";
import { getProducts, getOrders, getReviews, getContactMessages } from "@/lib/firestore";

export const metadata = { title: "Admin Dashboard" };

export const dynamic = "force-dynamic";

async function getStats() {
  try {
    const [products, orders, reviews, messages] = await Promise.all([
      getProducts(),
      getOrders(),
      getReviews(undefined, false),
      getContactMessages(),
    ]);

    const pendingReviews = reviews.filter((r) => !r.approved).length;
    const unreadMessages = messages.filter((m) => !m.read).length;
    const revenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      products: products.length,
      orders: orders.length,
      pendingReviews,
      unreadMessages,
      revenue,
      recentOrders: orders.slice(0, 5),
    };
  } catch {
    return {
      products: 0,
      orders: 0,
      pendingReviews: 0,
      unreadMessages: 0,
      revenue: 0,
      recentOrders: [],
    };
  }
}

export default async function AdminDashboard() {
  const stats = await getStats();

  const cards = [
    { label: "Total Products", value: stats.products, icon: Package },
    { label: "Total Orders", value: stats.orders, icon: ShoppingCart },
    { label: "Pending Reviews", value: stats.pendingReviews, icon: Star },
    { label: "Unread Messages", value: stats.unreadMessages, icon: MessageSquare },
  ];

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-white light:text-black">Dashboard</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg border border-white/10 p-6 light:border-black/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/50 light:text-black/50">{card.label}</p>
                <p className="mt-1 text-3xl font-bold text-white light:text-black">{card.value}</p>
              </div>
              <card.icon size={24} className="text-gold" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-white/10 p-6 light:border-black/10">
        <h2 className="mb-4 text-lg font-semibold text-white light:text-black">Total Revenue</h2>
        <p className="text-3xl font-bold text-gold">PKR {stats.revenue.toLocaleString()}</p>
      </div>

      <div className="mt-8 rounded-lg border border-white/10 light:border-black/10">
        <div className="border-b border-white/10 px-6 py-4 light:border-black/10">
          <h2 className="font-semibold text-white light:text-black">Recent Orders</h2>
        </div>
        <div className="divide-y divide-white/10 light:divide-black/10">
          {stats.recentOrders.length === 0 ? (
            <p className="p-6 text-sm text-white/50 light:text-black/50">No orders yet</p>
          ) : (
            stats.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-mono text-sm text-gold">{order.orderNumber}</p>
                  <p className="text-xs text-white/50 light:text-black/50">{order.email}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-white light:text-black">
                    PKR {order.total?.toLocaleString()}
                  </p>
                  <span className="text-xs capitalize text-gold">{order.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
