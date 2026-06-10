"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");

  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <CheckCircle size={64} className="mx-auto mb-6 text-gold" />
      <h1 className="font-display mb-4 text-3xl font-semibold">Thank You!</h1>
      <p className="mb-2 text-muted">Your order has been placed successfully.</p>
      {orderNumber && (
        <p className="mb-8 text-sm text-gold">
          Order Number: <span className="font-mono font-bold">{orderNumber}</span>
        </p>
      )}
      <p className="mb-8 text-sm text-muted">
        You will receive a confirmation email shortly.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link href="/products">
          <Button size="lg">Continue Shopping</Button>
        </Link>
        <Link href="/orders">
          <Button variant="outline" size="lg">
            View Orders
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense>
      <OrderSuccessContent />
    </Suspense>
  );
}
