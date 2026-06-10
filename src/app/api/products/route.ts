import { NextRequest, NextResponse } from "next/server";
import { getProducts, createProduct } from "@/lib/firestore";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const products = await getProducts({
      category: searchParams.get("category") || undefined,
      filter: searchParams.get("filter") || undefined,
      search: searchParams.get("search") || undefined,
      featured: searchParams.get("featured") === "true",
      limitCount: parseInt(searchParams.get("limit") || "0") || undefined,
      sort: searchParams.get("sort") || "newest",
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error("Products fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = await createProduct(body);
    return NextResponse.json({ id, ...body }, { status: 201 });
  } catch (error) {
    console.error("Product create error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
