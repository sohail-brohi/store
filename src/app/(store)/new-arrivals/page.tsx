import { PageHeader } from "@/components/ui/PageHeader";
import { ProductGrid } from "@/components/products/ProductGrid";
import { fetchProducts } from "@/lib/data";

export const metadata = {
  title: "New Arrivals",
  description: "Shop the latest arrivals at Luxee Store.",
};

export default async function NewArrivalsPage() {
  const products = await fetchProducts({ filter: "new" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader title="New Arrivals" subtitle="Be the first to discover our latest collection" />
      <ProductGrid initialProducts={products} showFilters={false} />
    </div>
  );
}
