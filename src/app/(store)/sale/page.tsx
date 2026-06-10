import { PageHeader } from "@/components/ui/PageHeader";
import { ProductGrid } from "@/components/products/ProductGrid";
import { fetchProducts } from "@/lib/data";

export const metadata = {
  title: "Sale",
  description: "Shop exclusive deals at Luxee Store.",
};

export default async function SalePage() {
  const products = await fetchProducts({ filter: "sale" });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader title="Sale" subtitle="Exclusive deals on premium fashion — limited time only" />
      <ProductGrid initialProducts={products} showFilters={false} />
    </div>
  );
}
