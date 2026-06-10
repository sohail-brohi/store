import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  limit,
  writeBatch,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import type {
  Product,
  BlogPost,
  FAQ,
  JobPosting,
  Order,
  Review,
  ContactMessage,
  DiscountCode,
} from "@/types";

export const COLLECTIONS = {
  products: "products",
  orders: "orders",
  blogs: "blogs",
  faqs: "faqs",
  jobs: "jobs",
  reviews: "reviews",
  messages: "messages",
  discountCodes: "discountCodes",
  users: "users",
} as const;

function withId<T>(snap: QueryDocumentSnapshot<DocumentData>): T & { id: string } {
  return { id: snap.id, ...snap.data() } as T & { id: string };
}

/** Firestore rejects undefined field values */
function stripUndefined<T extends Record<string, unknown>>(obj: T): T {
  return Object.fromEntries(
    Object.entries(obj).filter(([, value]) => value !== undefined)
  ) as T;
}

// ─── Products ───────────────────────────────────────────────

export async function getProducts(filters?: {
  category?: string;
  filter?: string;
  search?: string;
  featured?: boolean;
  limitCount?: number;
  sort?: string;
}) {
  const snap = await getDocs(collection(db, COLLECTIONS.products));
  let products = snap.docs.map((d) => withId<Product>(d));

  if (filters?.category) {
    products = products.filter((p) => p.category === filters.category);
  }
  if (filters?.featured) {
    products = products.filter((p) => p.featured);
  }
  if (filters?.filter === "new") {
    products = products.filter((p) => p.isNewArrival);
  }
  if (filters?.filter === "bestsellers") {
    products = products.filter((p) => p.isBestseller);
  }
  if (filters?.filter === "sale") {
    products = products.filter((p) => p.isOnSale);
  }
  if (filters?.search) {
    const term = filters.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.tags?.some((t) => t.toLowerCase().includes(term))
    );
  }

  const sort = filters?.sort || "newest";
  products.sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "name") return a.name.localeCompare(b.name);
    return (b.createdAt || "").localeCompare(a.createdAt || "");
  });

  if (filters?.limitCount) {
    products = products.slice(0, filters.limitCount);
  }

  return products;
}

export async function getProductBySlug(slug: string) {
  const q = query(collection(db, COLLECTIONS.products), where("slug", "==", slug), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return withId<Product>(snap.docs[0]);
}

export async function getProductById(id: string) {
  const snap = await getDoc(doc(db, COLLECTIONS.products, id));
  if (!snap.exists()) return null;
  return withId<Product>(snap);
}

export async function createProduct(data: Omit<Product, "id">) {
  const ref = await addDoc(collection(db, COLLECTIONS.products), {
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function updateProduct(id: string, data: Partial<Product>) {
  await updateDoc(doc(db, COLLECTIONS.products, id), {
    ...data,
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteProduct(id: string) {
  await deleteDoc(doc(db, COLLECTIONS.products, id));
}

// ─── Orders ───────────────────────────────────────────────

export async function getOrders(filters?: { userId?: string; email?: string }) {
  const snap = await getDocs(collection(db, COLLECTIONS.orders));
  let orders = snap.docs.map((d) => withId<Order>(d));

  if (filters?.userId) orders = orders.filter((o) => o.userId === filters.userId);
  if (filters?.email) orders = orders.filter((o) => o.email === filters.email);

  return orders.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

export async function createOrder(data: Omit<Order, "id">) {
  const payload = stripUndefined({
    ...data,
    createdAt: new Date().toISOString(),
  });
  const ref = await addDoc(collection(db, COLLECTIONS.orders), payload);
  return { id: ref.id, ...payload };
}

// ─── Users ───────────────────────────────────────────────

export async function upsertUserProfile(data: {
  uid: string;
  email: string;
  displayName?: string;
}) {
  const ref = doc(db, COLLECTIONS.users, data.uid);
  const snap = await getDoc(ref);
  const now = new Date().toISOString();
  const payload = stripUndefined({
    email: data.email,
    displayName: data.displayName || null,
    updatedAt: now,
    ...(snap.exists() ? {} : { createdAt: now }),
  });
  if (snap.exists()) {
    await updateDoc(ref, payload);
  } else {
    await setDoc(ref, payload);
  }
}

export async function getUsers() {
  const snap = await getDocs(collection(db, COLLECTIONS.users));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function updateOrder(id: string, data: Partial<Order>) {
  await updateDoc(doc(db, COLLECTIONS.orders, id), data);
}

// ─── Blogs ───────────────────────────────────────────────

export async function getBlogs() {
  const snap = await getDocs(collection(db, COLLECTIONS.blogs));
  return snap.docs
    .map((d) => withId<BlogPost>(d))
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

export async function getBlogBySlug(slug: string) {
  const q = query(collection(db, COLLECTIONS.blogs), where("slug", "==", slug), limit(1));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  return withId<BlogPost>(snap.docs[0]);
}

// ─── FAQs ───────────────────────────────────────────────

export async function getFAQs() {
  const snap = await getDocs(collection(db, COLLECTIONS.faqs));
  return snap.docs
    .map((d) => withId<FAQ>(d))
    .sort((a, b) => a.order - b.order);
}

// ─── Jobs ───────────────────────────────────────────────

export async function getJobs() {
  const snap = await getDocs(collection(db, COLLECTIONS.jobs));
  return snap.docs
    .map((d) => withId<JobPosting>(d))
    .filter((j) => j.active)
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

// ─── Reviews ───────────────────────────────────────────────

export async function getReviews(productId?: string, approvedOnly = true) {
  const snap = await getDocs(collection(db, COLLECTIONS.reviews));
  let reviews = snap.docs.map((d) => withId<Review>(d));

  if (productId) reviews = reviews.filter((r) => r.productId === productId);
  if (approvedOnly) reviews = reviews.filter((r) => r.approved);

  return reviews.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

export async function createReview(data: Omit<Review, "id">) {
  const ref = await addDoc(collection(db, COLLECTIONS.reviews), {
    ...data,
    approved: false,
    createdAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function approveReview(id: string, productId: string) {
  await updateDoc(doc(db, COLLECTIONS.reviews, id), { approved: true });
  const reviews = await getReviews(productId, true);
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / (reviews.length || 1);
  await updateProduct(productId, {
    rating: Math.round(avg * 10) / 10,
    reviewCount: reviews.length,
  });
}

// ─── Contact ───────────────────────────────────────────────

export async function createContactMessage(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  const ref = await addDoc(collection(db, COLLECTIONS.messages), {
    ...data,
    read: false,
    createdAt: new Date().toISOString(),
  });
  return ref.id;
}

export async function getContactMessages() {
  const snap = await getDocs(collection(db, COLLECTIONS.messages));
  return snap.docs
    .map((d) => withId<ContactMessage>(d))
    .sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
}

// ─── Discount Codes ───────────────────────────────────────────────

export async function getDiscountCode(code: string) {
  const snap = await getDocs(collection(db, COLLECTIONS.discountCodes));
  const found = snap.docs
    .map((d) => withId<DiscountCode>(d))
    .find((c) => c.code === code.toUpperCase() && c.active);
  return found || null;
}

export async function incrementDiscountUse(id: string, usedCount: number) {
  await updateDoc(doc(db, COLLECTIONS.discountCodes, id), { usedCount: usedCount + 1 });
}

// ─── Seed ───────────────────────────────────────────────

export async function seedDatabase(seedData: {
  products: Omit<Product, "id">[];
  blogs: Omit<BlogPost, "id">[];
  faqs: Omit<FAQ, "id">[];
  jobs: Omit<JobPosting, "id">[];
  discountCodes: Record<string, unknown>[];
}) {
  const batch = writeBatch(db);
  const now = new Date().toISOString();

  for (const col of [
    COLLECTIONS.products,
    COLLECTIONS.blogs,
    COLLECTIONS.faqs,
    COLLECTIONS.jobs,
    COLLECTIONS.discountCodes,
  ]) {
    const existing = await getDocs(collection(db, col));
    existing.docs.forEach((d) => batch.delete(d.ref));
  }

  seedData.products.forEach((p) => {
    batch.set(doc(collection(db, COLLECTIONS.products)), {
      ...p,
      createdAt: now,
      updatedAt: now,
    });
  });

  seedData.blogs.forEach((b) => {
    batch.set(doc(collection(db, COLLECTIONS.blogs)), {
      ...b,
      published: true,
      createdAt: now,
    });
  });

  seedData.faqs.forEach((f) => {
    batch.set(doc(collection(db, COLLECTIONS.faqs)), { ...f, createdAt: now });
  });

  seedData.jobs.forEach((j) => {
    batch.set(doc(collection(db, COLLECTIONS.jobs)), { ...j, createdAt: now });
  });

  seedData.discountCodes.forEach((d) => {
    batch.set(doc(collection(db, COLLECTIONS.discountCodes)), {
      ...d,
      usedCount: 0,
      createdAt: now,
    });
  });

  await batch.commit();

  return {
    products: seedData.products.length,
    blogs: seedData.blogs.length,
    faqs: seedData.faqs.length,
    jobs: seedData.jobs.length,
    discountCodes: seedData.discountCodes.length,
  };
}
