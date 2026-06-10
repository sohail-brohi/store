"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

export function ProductActions({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0],
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      size,
      color,
      quantity,
    });
  };

  const optionClass = (selected: boolean) =>
    cn(
      "rounded border px-4 py-2 text-sm transition-colors",
      selected
        ? "border-gold bg-gold text-black"
        : "border-border text-muted hover:border-gold hover:text-gold"
    );

  return (
    <div className="space-y-6">
      {product.sizes.length > 1 && (
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">
            Size: <span className="text-gold">{size}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={cn("min-w-[48px]", optionClass(size === s))}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.colors.length > 1 && (
        <div>
          <p className="mb-3 text-sm font-medium text-foreground">
            Color: <span className="text-gold">{color}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={optionClass(color === c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Quantity</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="flex h-10 w-10 items-center justify-center rounded border border-border hover:border-gold"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="flex h-10 w-10 items-center justify-center rounded border border-border hover:border-gold"
          >
            <Plus size={16} />
          </button>
          <span className="ml-2 text-sm text-muted">{product.stock} in stock</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handleAddToCart} size="lg" className="flex-1">
          <ShoppingBag size={18} className="mr-2" />
          Add to Cart
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => toggleItem(product)}
          className={cn(inWishlist && "bg-gold text-black")}
        >
          <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
        </Button>
      </div>
    </div>
  );
}
