import { redirect } from "next/navigation";

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const params = await searchParams;
  const query = params.order ? `?order=${encodeURIComponent(params.order)}` : "";
  redirect(`/order-success${query}`);
}
