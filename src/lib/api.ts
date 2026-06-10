import type { Product, BlogPost, FAQ, JobPosting } from "@/types";

const BASE = process.env.NEXT_PUBLIC_APP_URL || "";

async function fetchAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE}${endpoint}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getProducts(params?: Record<string, string>) {
  const query = params ? "?" + new URLSearchParams(params).toString() : "";
  return fetchAPI<Product[]>(`/api/products${query}`);
}

export async function getProduct(slug: string) {
  const res = await fetch(`${BASE}/api/products/${slug}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json();
}

export async function getBlogs() {
  return fetchAPI<BlogPost[]>("/api/blogs");
}

export async function getBlog(slug: string) {
  return fetchAPI<BlogPost>(`/api/blogs?slug=${slug}`);
}

export async function getFAQs() {
  return fetchAPI<FAQ[]>("/api/faqs");
}

export async function getJobs() {
  return fetchAPI<JobPosting[]>("/api/jobs");
}
