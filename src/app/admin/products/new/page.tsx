"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { slugify } from "@/lib/utils";
import toast from "react-hot-toast";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    compareAtPrice: "",
    category: "men",
    sizes: "S, M, L, XL",
    colors: "Black",
    stock: "10",
    isNewArrival: false,
    isBestseller: false,
    isOnSale: false,
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          slug: slugify(form.name),
          description: form.description,
          price: Number(form.price),
          compareAtPrice: form.compareAtPrice
            ? Number(form.compareAtPrice)
            : undefined,
          images,
          category: form.category,
          sizes: form.sizes.split(",").map((s) => s.trim()),
          colors: form.colors.split(",").map((c) => c.trim()),
          stock: Number(form.stock),
          isNewArrival: form.isNewArrival,
          isBestseller: form.isBestseller,
          isOnSale: form.isOnSale,
          featured: form.featured,
          tags: [],
          rating: 0,
          reviewCount: 0,
        }),
      });

      if (!res.ok) throw new Error("Failed to create product");

      toast.success("Product created!");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white focus:border-gold focus:outline-none light:border-black/20 light:text-black";

  return (
    <div className="p-8">
      <Link
        href="/admin/products"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gold hover:underline"
      >
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <h1 className="mb-8 text-2xl font-bold text-white light:text-black">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="mb-2 block text-sm text-white/70">Images</label>
          <ImageUpload
            images={images}
            onChange={setImages}
            folder="luxee-store/products"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-white/70">Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-white/70">Description</label>
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-white/70">Price (PKR)</label>
            <input
              required
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/70">
              Compare at Price
            </label>
            <input
              type="number"
              value={form.compareAtPrice}
              onChange={(e) =>
                setForm({ ...form, compareAtPrice: e.target.value })
              }
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-white/70">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className={inputClass}
            >
              {["men", "women", "accessories", "shoes", "kids"].map((c) => (
                <option key={c} value={c} className="bg-[#1a1a1a]">
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/70">Stock</label>
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-white/70">
              Sizes (comma-separated)
            </label>
            <input
              value={form.sizes}
              onChange={(e) => setForm({ ...form, sizes: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-white/70">
              Colors (comma-separated)
            </label>
            <input
              value={form.colors}
              onChange={(e) => setForm({ ...form, colors: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {[
            { key: "isNewArrival", label: "New Arrival" },
            { key: "isBestseller", label: "Bestseller" },
            { key: "isOnSale", label: "On Sale" },
            { key: "featured", label: "Featured" },
          ].map((flag) => (
            <label key={flag.key} className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                checked={form[flag.key as keyof typeof form] as boolean}
                onChange={(e) =>
                  setForm({ ...form, [flag.key]: e.target.checked })
                }
                className="accent-gold"
              />
              {flag.label}
            </label>
          ))}
        </div>

        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>
    </div>
  );
}
