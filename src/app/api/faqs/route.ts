import { NextResponse } from "next/server";
import { getFAQs } from "@/lib/firestore";

export async function GET() {
  try {
    const faqs = await getFAQs();
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("FAQs fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}
