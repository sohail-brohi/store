/** Server-side data access — uses Firestore directly (no HTTP round-trip) */
import {
  getProducts,
  getProductBySlug,
  getBlogs,
  getBlogBySlug,
  getFAQs,
  getJobs,
  getReviews,
} from "./firestore";

export async function fetchProducts(params?: {
  category?: string;
  filter?: string;
  search?: string;
  featured?: boolean;
  limitCount?: number;
  sort?: string;
}) {
  try {
    return await getProducts({
      category: params?.category,
      filter: params?.filter,
      search: params?.search,
      featured: params?.featured,
      limitCount: params?.limitCount,
      sort: params?.sort,
    });
  } catch (error) {
    console.error("fetchProducts error:", error);
    return [];
  }
}

export async function fetchProduct(slug: string) {
  try {
    const product = await getProductBySlug(slug);
    if (!product) return null;

    const reviews = await getReviews(product.id, true);
    const related = (await getProducts({ category: product.category }))
      .filter((p) => p.id !== product.id)
      .slice(0, 4);

    return { product, reviews, related };
  } catch (error) {
    console.error("fetchProduct error:", error);
    return null;
  }
}

export async function fetchBlogs() {
  try {
    return await getBlogs();
  } catch {
    return [];
  }
}

export async function fetchBlog(slug: string) {
  try {
    return await getBlogBySlug(slug);
  } catch {
    return null;
  }
}

export async function fetchFAQs() {
  try {
    return await getFAQs();
  } catch {
    return [];
  }
}

export async function fetchJobs() {
  try {
    return await getJobs();
  } catch {
    return [];
  }
}
