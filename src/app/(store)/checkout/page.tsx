"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const shipping = subtotal >= 5000 ? 0 : 500;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="mb-4 text-2xl font-bold">Nothing to checkout</h1>
        <Link href="/products">
          <Button>Go Shopping</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderPayload: Record<string, unknown> = {
        items,
        email: form.email,
        shippingAddress: {
          fullName: form.fullName,
          phone: form.phone,
          address: form.address,
          city: form.city,
          province: form.province,
          postalCode: form.postalCode,
        },
        paymentMethod: form.paymentMethod,
      };

      if (user?.uid) orderPayload.userId = user.uid;
      if (discountCode) orderPayload.discountCode = discountCode;

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order failed");

      clearCart();
      toast.success("Order placed successfully!");
      router.push(`/order-success?order=${data.orderNumber}`);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to place order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader title="Checkout" subtitle="Complete your order" />

      {!authLoading && !user && (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-sm border border-gold/30 bg-gold/5 px-5 py-4">
          <p className="text-sm text-muted">
            Sign in to save your details and track orders easily.
          </p>
          <Link href="/auth?redirect=/checkout">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </Link>
        </div>
      )}

      {user && (
        <p className="mb-6 text-sm text-muted">
          Signed in as <span className="text-gold">{user.email}</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="mb-4 text-lg font-semibold">Shipping Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: "fullName", label: "Full Name", col: "sm:col-span-2" },
                { name: "email", label: "Email", type: "email" },
                { name: "phone", label: "Phone" },
                { name: "address", label: "Address", col: "sm:col-span-2" },
                { name: "city", label: "City" },
                { name: "province", label: "Province" },
                { name: "postalCode", label: "Postal Code" },
              ].map((field) => (
                <div key={field.name} className={field.col}>
                  <label className="mb-1 block text-sm text-muted">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    required
                    value={form[field.name as keyof typeof form]}
                    onChange={(e) =>
                      setForm({ ...form, [field.name]: e.target.value })
                    }
                    className="w-full rounded-sm border border-border bg-transparent px-4 py-3 focus:border-gold focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-semibold">Payment Method</h2>
            <div className="space-y-3">
              {[
                { value: "cod", label: "Cash on Delivery" },
                { value: "card", label: "Credit/Debit Card" },
              ].map((method) => (
                <label
                  key={method.value}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors ${
                    form.paymentMethod === method.value
                      ? "border-gold bg-gold/10"
                      : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.value}
                    checked={form.paymentMethod === method.value}
                    onChange={(e) =>
                      setForm({ ...form, paymentMethod: e.target.value })
                    }
                    className="accent-gold"
                  />
                  <span>{method.label}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="rounded-sm border border-border p-6">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
            <div className="mb-4 max-h-60 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-3"
                >
                  <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-sm">
                    <ProductImage src={item.image} alt={item.name} fill />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm">{item.name}</p>
                    <p className="text-xs text-muted">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="w-full rounded-sm border border-border bg-transparent px-4 py-2 text-sm focus:border-gold focus:outline-none"
              />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full"
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
