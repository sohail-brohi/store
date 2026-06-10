import { StaticPage } from "@/components/content/StaticPage";

export const metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <StaticPage title="Terms of Service">
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h2 className="text-xl font-semibold text-white light:text-black">Acceptance of Terms</h2>
      <p>By accessing and using Luxee Store, you accept and agree to be bound by these Terms of Service.</p>
      <h2 className="text-xl font-semibold text-white light:text-black">Products & Pricing</h2>
      <p>All products are subject to availability. We reserve the right to modify prices without prior notice. Prices are displayed in PKR.</p>
      <h2 className="text-xl font-semibold text-white light:text-black">Orders & Payment</h2>
      <p>Orders are confirmed upon successful payment or COD placement. We accept credit/debit cards and cash on delivery.</p>
      <h2 className="text-xl font-semibold text-white light:text-black">Limitation of Liability</h2>
      <p>Luxee Store shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
    </StaticPage>
  );
}
