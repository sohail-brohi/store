"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Database, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminSeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    counts?: Record<string, number>;
    error?: string;
  } | null>(null);

  const handleSeed = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ success: false, error: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <Link
        href="/admin/products"
        className="mb-6 inline-flex items-center gap-2 text-sm text-gold hover:underline"
      >
        <ArrowLeft size={16} /> Back to Products
      </Link>

      <h1 className="mb-4 text-2xl font-bold text-white light:text-black">
        Seed Firestore Database
      </h1>
      <p className="mb-8 max-w-lg text-sm text-white/60 light:text-black/60">
        This will populate Firestore with sample products, blogs, FAQs, jobs, and discount
        codes. Existing data in these collections will be replaced.
      </p>

      <Button onClick={handleSeed} size="lg" disabled={loading}>
        <Database size={18} className="mr-2" />
        {loading ? "Seeding..." : "Seed Database"}
      </Button>

      {result && (
        <div
          className={`mt-8 max-w-md rounded-lg border p-6 ${
            result.success
              ? "border-green-500/30 bg-green-500/10"
              : "border-red-500/30 bg-red-500/10"
          }`}
        >
          <div className="flex items-center gap-3">
            {result.success ? (
              <CheckCircle size={24} className="text-green-400" />
            ) : (
              <AlertCircle size={24} className="text-red-400" />
            )}
            <div>
              <p className="font-medium text-white light:text-black">
                {result.success ? "Database seeded!" : "Seed failed"}
              </p>
              {result.counts && (
                <ul className="mt-2 text-sm text-white/70">
                  {Object.entries(result.counts).map(([k, v]) => (
                    <li key={k}>
                      {k}: {v}
                    </li>
                  ))}
                </ul>
              )}
              {result.error && (
                <p className="mt-2 text-sm text-red-400">{result.error}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 rounded-lg border border-white/10 p-6 light:border-black/10">
        <h2 className="mb-2 font-semibold text-white light:text-black">
          Firestore Setup Required
        </h2>
        <p className="text-sm text-white/60">
          Enable Firestore in your Firebase Console and set security rules to allow reads/writes
          during development. See <code className="text-gold">firestore.rules</code> in the
          project root.
        </p>
      </div>
    </div>
  );
}
