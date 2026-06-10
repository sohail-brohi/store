import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Shield, RefreshCw, Headphones } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { fetchProducts } from "@/lib/data";
import { IMAGES } from "@/lib/images";
import type { Product } from "@/types";

const features = [
  { icon: Truck, title: "Free Shipping", description: "On orders over PKR 5,000" },
  { icon: Shield, title: "Secure Payment", description: "100% protected checkout" },
  { icon: RefreshCw, title: "Easy Returns", description: "14-day return policy" },
  { icon: Headphones, title: "24/7 Support", description: "Dedicated customer care" },
];

const categories = [
  { name: "Men", slug: "men", image: IMAGES.men },
  { name: "Women", slug: "women", image: IMAGES.women },
  { name: "Accessories", slug: "accessories", image: IMAGES.accessories },
  { name: "Shoes", slug: "shoes", image: IMAGES.shoes },
  { name: "Kids", slug: "kids", image: IMAGES.kids },
];

async function getHomeData() {
  const [featured, newArrivals, bestsellers, sale] = await Promise.all([
    fetchProducts({ featured: true, limitCount: 4 }),
    fetchProducts({ filter: "new", limitCount: 4 }),
    fetchProducts({ filter: "bestsellers", limitCount: 4 }),
    fetchProducts({ filter: "sale", limitCount: 4 }),
  ]);
  return { featured, newArrivals, bestsellers, sale };
}

export default async function HomePage() {
  const { featured, newArrivals, bestsellers, sale } = await getHomeData();

  return (
    <>
      <section className="relative flex min-h-[90vh] items-center overflow-hidden">
        <Image
          src={IMAGES.hero}
          alt="Luxee Store Hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.4em] text-gold">
              Luxee Store Premium Fashion
            </p>
            <h1 className="font-display mb-6 text-5xl font-semibold leading-[1.1] text-white md:text-7xl">
              Timeless Pieces for Modern Elegance
            </h1>
            <p className="mb-10 max-w-lg text-lg leading-relaxed text-white/70">
              Discover curated collections of luxury clothing and accessories.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button size="lg">
                  Shop Collection
                  <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
              <Link href="/new-arrivals">
                <Button variant="outline" size="lg">
                  New Arrivals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/50 py-6">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex items-center gap-3">
              <feature.icon size={22} className="shrink-0 text-gold" />
              <div>
                <p className="text-sm font-semibold">{feature.title}</p>
                <p className="text-xs text-muted">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Shop by Category</h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gold" />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/products?category=${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-sm"
              >
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <h3 className="font-display text-xl font-medium text-white">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {featured.length > 0 && <ProductSection title="Featured Collection" products={featured} />}
      {newArrivals.length > 0 && (
        <ProductSection title="New Arrivals" products={newArrivals} viewAllHref="/new-arrivals" />
      )}
      {bestsellers.length > 0 && (
        <ProductSection
          title="Bestsellers"
          products={bestsellers}
          viewAllHref="/products?filter=bestsellers"
        />
      )}
      {sale.length > 0 && (
        <ProductSection title="On Sale" products={sale} viewAllHref="/sale" className="bg-gold/5" />
      )}

      {featured.length === 0 && (
        <section className="py-20 text-center">
          <p className="text-muted mb-4">No products yet. Seed the database to get started.</p>
          <Link href="/admin/seed">
            <Button>Seed Database</Button>
          </Link>
        </section>
      )}

      <section className="relative overflow-hidden py-28">
        <Image src={IMAGES.newsletter} alt="Newsletter" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <h2 className="font-display mb-4 text-4xl font-semibold text-white">
            Join the Luxee Family
          </h2>
          <p className="mb-8 text-white/70">
            Subscribe for exclusive offers, style tips, and early access to new collections.
          </p>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-sm border border-white/20 bg-white/10 px-4 py-3.5 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
            />
            <Button type="submit" size="lg">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

function ProductSection({
  title,
  products,
  viewAllHref = "/products",
  className = "",
}: {
  title: string;
  products: Product[];
  viewAllHref?: string;
  className?: string;
}) {
  return (
    <section className={`py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold">{title}</h2>
            <div className="mt-3 h-px w-16 bg-gold" />
          </div>
          <Link
            href={viewAllHref}
            className="flex items-center gap-1 text-sm uppercase tracking-wider text-gold hover:underline"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
