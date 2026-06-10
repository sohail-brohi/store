"use client";

import Link from "next/link";
import { ProductImage } from "@/components/ui/ProductImage";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, calcDiscount, cn } from "@/lib/utils";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const { addItem } = useCart();
  const discount = calcDiscount(product.price, product.compareAtPrice);
  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      size: product.sizes[0],
      color: product.colors[0],
      quantity: 1,
    });
  };

  return (
    <Link
      href={`/product/${product.slug}`}
      className={cn("group relative block", className)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-white/5 light:bg-black/5">
        <ProductImage
          src={product.images[0]}
          alt={product.name}
          fill
          className="transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="rounded bg-gold px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              -{discount}%
            </span>
          )}
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleItem(product);
            }}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-colors hover:bg-gold hover:text-black",
              inWishlist && "bg-gold text-black"
            )}
            aria-label="Add to wishlist"
          >
            <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleQuickAdd}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-sm transition-colors hover:bg-gold hover:text-black"
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-[10px] uppercase tracking-widest text-gold">
          {product.category}
        </p>
        <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-1">
          <Star size={12} className="fill-gold text-gold" />
          <span className="text-xs text-muted">
            {product.rating} ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
