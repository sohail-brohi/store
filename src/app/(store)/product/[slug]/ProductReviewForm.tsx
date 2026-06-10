"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

export function ProductReviewForm({ productId }: { productId: string }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <p className="text-sm text-muted">
        <Link href="/auth" className="text-gold hover:underline">
          Sign in
        </Link>{" "}
        to leave a review.
      </p>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          userId: user.uid,
          userName: user.displayName || user.email?.split("@")[0] || "Customer",
          rating,
          comment,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Review submitted! It will appear after approval.");
      setComment("");
      setRating(5);
    } catch {
      toast.error("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm text-muted">Rating</label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="rounded-sm border border-border bg-transparent px-3 py-2 text-sm focus:border-gold focus:outline-none"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} Star{r !== 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm text-muted">Your Review</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full rounded-sm border border-border bg-transparent px-4 py-3 text-sm focus:border-gold focus:outline-none"
          placeholder="Share your experience with this product..."
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
