import { Suspense } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductGrid } from "@/components/products/ProductGrid";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { fetchProducts } from "@/lib/data";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    filter?: string;
    search?: string;
  }>;
}

export const metadata = {
  title: "Shop All Products",
  description: "Browse our complete collection of premium fashion clothing and accessories.",
};

async function ProductsContent({
  searchParams,
}: {
  searchParams: { category?: string; filter?: string; search?: string };
}) {
  const products = await fetchProducts({
    category: searchParams.category,
    filter: searchParams.filter,
    search: searchParams.search,
  });

  const title = searchParams.search
    ? `Search: "${searchParams.search}"`
    : searchParams.category
      ? `${searchParams.category.charAt(0).toUpperCase() + searchParams.category.slice(1)}'s Collection`
      : "All Products";

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader title={title} subtitle="Discover our curated selection of premium fashion" />
      <ProductGrid initialProducts={products} />
    </div>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductsContent searchParams={params} />
    </Suspense>
  );
}
