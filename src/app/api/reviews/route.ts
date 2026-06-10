import { NextRequest, NextResponse } from "next/server";
import { getReviews, createReview, approveReview } from "@/lib/firestore";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId") || undefined;
    const approved = searchParams.get("approved") !== "false";

    const reviews = await getReviews(productId, approved);
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = await createReview(body);
    return NextResponse.json({ id, ...body, approved: false }, { status: 201 });
  } catch (error) {
    console.error("Review create error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, approved, productId } = body;

    if (approved && productId) {
      await approveReview(id, productId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Review update error:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}
