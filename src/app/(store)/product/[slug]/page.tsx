import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Truck, RefreshCw, Shield } from "lucide-react";
import { fetchProduct } from "@/lib/data";
import { formatPrice, calcDiscount } from "@/lib/utils";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductActions } from "./ProductActions";
import { ProductReviewForm } from "./ProductReviewForm";
import { ProductImage } from "@/components/ui/ProductImage";
import type { Product, Review } from "@/types";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params;
  const data = await fetchProduct(slug);
  if (!data) return { title: "Product Not Found" };
  return { title: data.product.name, description: data.product.description };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const data = await fetchProduct(slug);
  if (!data) notFound();

  const { product: p, reviews, related } = data;
  const discount = calcDiscount(p.price, p.compareAtPrice);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-card">
            <ProductImage src={p.images[0]} alt={p.name} fill priority sizes="(max-width: 1024px) 100vw, 50vw" />
            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-sm bg-red-600 px-3 py-1 text-xs font-bold text-white">
                -{discount}% OFF
              </span>
            )}
          </div>
          {p.images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {p.images.map((img: string, i: number) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-sm bg-card">
                  <ProductImage src={img} alt="" fill sizes="100px" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="mb-2 text-[11px] uppercase tracking-[0.25em] text-gold">{p.category}</p>
          <h1 className="font-display mb-4 text-4xl font-semibold">{p.name}</h1>

          <div className="mb-4 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  className={i < Math.round(p.rating) ? "fill-gold text-gold" : "text-border"}
                />
              ))}
            </div>
            <span className="text-sm text-muted">
              {p.rating} ({p.reviewCount} reviews)
            </span>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl font-bold">{formatPrice(p.price)}</span>
            {p.compareAtPrice && (
              <span className="text-lg text-muted line-through">{formatPrice(p.compareAtPrice)}</span>
            )}
          </div>

          <p className="mb-8 leading-relaxed text-muted">{p.description}</p>

          <ProductActions product={p} />

          <div className="mt-8 space-y-3 border-t border-border pt-8">
            {[
              { icon: Truck, text: "Free shipping on orders over PKR 5,000" },
              { icon: RefreshCw, text: "14-day easy returns" },
              { icon: Shield, text: "100% authentic products" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm text-muted">
                <Icon size={17} className="text-gold" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-16 rounded-sm border border-border p-6">
        <h2 className="font-display mb-4 text-xl font-semibold">Write a Review</h2>
        <ProductReviewForm productId={p.id} />
      </section>

      {reviews.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display mb-8 text-2xl font-semibold">Customer Reviews</h2>
          <div className="space-y-4">
            {(reviews as Review[]).map((review) => (
              <div key={review.id} className="rounded-sm border border-border p-6">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < review.rating ? "fill-gold text-gold" : "text-border"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{review.userName}</span>
                </div>
                <p className="text-sm text-muted">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display mb-8 text-2xl font-semibold">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {related.map((item: Product) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
