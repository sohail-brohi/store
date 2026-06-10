import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { getProducts } from "@/lib/firestore";
import { formatPrice } from "@/lib/utils";

export const metadata = { title: "Manage Products" };
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white light:text-black">Products</h1>
        <div className="flex gap-3">
          <Link
            href="/admin/seed"
            className="rounded-lg border border-gold px-4 py-2 text-sm text-gold hover:bg-gold/10"
          >
            Seed Data
          </Link>
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-sm font-medium text-black hover:bg-gold/90"
          >
            <Plus size={16} /> Add Product
          </Link>
        </div>
      </div>

      {products.length === 0 ? (
        <p className="text-white/50">No products yet. Click &quot;Seed Data&quot; to populate Firestore.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-white/10 light:border-black/10">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 light:border-black/10">
                <th className="px-4 py-3 text-left text-white/50">Product</th>
                <th className="px-4 py-3 text-left text-white/50">Category</th>
                <th className="px-4 py-3 text-left text-white/50">Price</th>
                <th className="px-4 py-3 text-left text-white/50">Stock</th>
                <th className="px-4 py-3 text-left text-white/50">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-white/5">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 overflow-hidden rounded">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <span className="text-white light:text-black">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 capitalize text-white/70">{product.category}</td>
                  <td className="px-4 py-3 text-white">{formatPrice(product.price)}</td>
                  <td className="px-4 py-3 text-white/70">{product.stock}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {product.isNewArrival && (
                        <span className="rounded bg-gold/20 px-2 py-0.5 text-xs text-gold">New</span>
                      )}
                      {product.isOnSale && (
                        <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-400">Sale</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
