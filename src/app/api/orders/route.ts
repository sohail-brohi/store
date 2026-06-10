import { NextRequest, NextResponse } from "next/server";
import {
  getOrders,
  createOrder,
  getProductById,
  getDiscountCode,
  incrementDiscountUse,
  updateProduct,
} from "@/lib/firestore";
import type { CartItem, ShippingAddress } from "@/types";

function generateOrderNumber() {
  return `LX-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orders = await getOrders({
      userId: searchParams.get("userId") || undefined,
      email: searchParams.get("email") || undefined,
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, email, userId, shippingAddress, paymentMethod, discountCode } = body as {
      items: CartItem[];
      email: string;
      userId?: string;
      shippingAddress: ShippingAddress;
      paymentMethod: string;
      discountCode?: string;
    };

    let subtotal = 0;
    for (const item of items) {
      const product = await getProductById(item.productId);
      if (!product) {
        return NextResponse.json({ error: `Product not found: ${item.name}` }, { status: 400 });
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${item.name}` },
          { status: 400 }
        );
      }
      subtotal += item.price * item.quantity;
    }

    let discount = 0;
    if (discountCode) {
      const code = await getDiscountCode(discountCode);
      if (code) {
        discount =
          code.type === "percentage"
            ? Math.round(subtotal * (code.value / 100))
            : code.value;
        await incrementDiscountUse(code.id, code.usedCount);
      }
    }

    const shipping = subtotal >= 5000 ? 0 : 500;
    const total = subtotal + shipping - discount;

    const order = await createOrder({
      orderNumber: generateOrderNumber(),
      email,
      items,
      subtotal,
      shipping,
      discount,
      total,
      paymentMethod: (paymentMethod as "cod" | "card") || "cod",
      shippingAddress,
      status: "pending",
      ...(userId ? { userId } : {}),
      ...(discountCode ? { discountCode } : {}),
    });

    for (const item of items) {
      const product = await getProductById(item.productId);
      if (product) {
        await updateProduct(item.productId, { stock: product.stock - item.quantity });
      }
    }

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Order create error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
