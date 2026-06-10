"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { ProductCard } from "@/components/products/ProductCard";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <Heart size={64} className="mx-auto mb-6 text-muted/30" />
        <h1 className="mb-4 text-2xl font-bold">Your wishlist is empty</h1>
        <p className="mb-8 text-muted">Save items you love by clicking the heart icon.</p>
        <Link href="/products">
          <Button size="lg">Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader
        title="My Wishlist"
        subtitle={`${items.length} saved item${items.length !== 1 ? "s" : ""}`}
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
