import { NextRequest, NextResponse } from "next/server";
import { updateOrder } from "@/lib/firestore";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    await updateOrder(id, body);
    return NextResponse.json({ success: true, id, ...body });
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
