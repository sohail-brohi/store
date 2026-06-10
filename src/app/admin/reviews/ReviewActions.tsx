"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function ReviewActions({
  reviewId,
  productId,
}: {
  reviewId: string;
  productId: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: reviewId, approved: true, productId }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Review approved");
      router.refresh();
    } catch {
      toast.error("Failed to approve review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleApprove}
      disabled={loading}
      className="rounded bg-gold px-3 py-1 text-xs font-medium text-black hover:bg-gold/90 disabled:opacity-50"
    >
      {loading ? "..." : "Approve"}
    </button>
  );
}
