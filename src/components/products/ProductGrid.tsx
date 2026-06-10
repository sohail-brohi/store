"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import type { Product } from "@/types";

interface ProductGridProps {
  initialProducts: Product[];
  title?: string;
  showFilters?: boolean;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A-Z" },
];

const categoryOptions = [
  { value: "", label: "All Categories" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "accessories", label: "Accessories" },
  { value: "shoes", label: "Shoes" },
  { value: "kids", label: "Kids" },
];

export function ProductGrid({
  initialProducts,
  showFilters = true,
}: ProductGridProps) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState("");

  const fetchProducts = async (params: Record<string, string>) => {
    setLoading(true);
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();
      setProducts(data as Product[]);
    } catch {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    const params: Record<string, string> = { sort: value };
    if (category) params.category = category;
    fetchProducts(params);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    const params: Record<string, string> = { sort };
    if (value) params.category = value;
    fetchProducts(params);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      {showFilters && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleCategoryChange(opt.value)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                  category === opt.value
                    ? "bg-gold text-black"
                    : "border border-border text-muted hover:border-gold hover:text-gold"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-sm border border-border bg-card px-4 py-2 text-sm text-foreground focus:border-gold focus:outline-none"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-card text-foreground">
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {products.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
