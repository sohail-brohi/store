import { NextResponse } from "next/server";
import { seedDatabase } from "@/lib/firestore";
import {
  seedProducts,
  seedBlogs,
  seedFAQs,
  seedJobs,
  seedDiscountCodes,
} from "@/lib/seed-data";
import type { Product, BlogPost, FAQ, JobPosting } from "@/types";

export async function POST() {
  try {
    const counts = await seedDatabase({
      products: seedProducts as Omit<Product, "id">[],
      blogs: seedBlogs as Omit<BlogPost, "id">[],
      faqs: seedFAQs as Omit<FAQ, "id">[],
      jobs: seedJobs as Omit<JobPosting, "id">[],
      discountCodes: seedDiscountCodes,
    });

    return NextResponse.json({
      success: true,
      message: "Firestore seeded successfully",
      counts,
    });
  } catch (error) {
    console.error("Seed error:", error);
    const message = error instanceof Error ? error.message : "Failed to seed database";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
