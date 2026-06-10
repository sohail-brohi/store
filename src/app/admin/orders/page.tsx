import { getOrders } from "@/lib/firestore";
import { OrderStatusSelect } from "./OrderStatusSelect";

export const metadata = { title: "Manage Orders" };
export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  let orders: Awaited<ReturnType<typeof getOrders>> = [];
  try {
    orders = await getOrders();
  } catch {
    orders = [];
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-white light:text-black">Orders</h1>
      <div className="space-y-4">
        {orders.length === 0 ? (
          <p className="text-white/50">No orders yet</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="rounded-lg border border-white/10 p-6 light:border-black/10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-gold">{order.orderNumber}</p>
                  <p className="text-sm text-white/50">
                    {order.email} · {order.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white light:text-black">
                    PKR {order.total?.toLocaleString()}
                  </p>
                  <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                </div>
              </div>
              <div className="mt-4 border-t border-white/10 pt-4">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm text-white/70">
                    <span>
                      {item.name} × {item.quantity} ({item.size}/{item.color})
                    </span>
                    <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
