import { StaticPage } from "@/components/content/StaticPage";

export const metadata = { title: "Shipping Information" };

export default function ShippingPage() {
  return (
    <StaticPage title="Shipping Information" subtitle="Fast and reliable delivery across Pakistan">
      <h2 className="text-xl font-semibold text-white light:text-black">Standard Shipping</h2>
      <p>Free on orders over PKR 5,000. Delivery within 3-5 business days.</p>
      <h2 className="text-xl font-semibold text-white light:text-black">Express Shipping</h2>
      <p>PKR 500 flat rate. Delivery within 1-2 business days to major cities.</p>
      <h2 className="text-xl font-semibold text-white light:text-black">Order Tracking</h2>
      <p>Track your order via email confirmation or your account dashboard once shipped.</p>
      <h2 className="text-xl font-semibold text-white light:text-black">Delivery Areas</h2>
      <p>We deliver nationwide across Pakistan including all major cities and remote areas.</p>
    </StaticPage>
  );
}
