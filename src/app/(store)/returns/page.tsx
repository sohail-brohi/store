import { StaticPage } from "@/components/content/StaticPage";

export const metadata = { title: "Returns & Exchanges" };

export default function ReturnsPage() {
  return (
    <StaticPage title="Returns & Exchanges" subtitle="Hassle-free 14-day return policy">
      <h2 className="text-xl font-semibold text-white light:text-black">Return Policy</h2>
      <p>Items can be returned within 14 days of delivery. Products must be unworn, unwashed, and have original tags attached.</p>
      <h2 className="text-xl font-semibold text-white light:text-black">How to Return</h2>
      <ol className="list-decimal space-y-2 pl-6">
        <li>Contact our support team at contact@luxees.com</li>
        <li>Receive your return authorization and shipping label</li>
        <li>Pack items securely and ship within 7 days</li>
        <li>Refund processed within 5-7 business days of receipt</li>
      </ol>
      <h2 className="text-xl font-semibold text-white light:text-black">Exchanges</h2>
      <p>Free exchanges for different sizes or colors, subject to availability. Contact support to initiate an exchange.</p>
    </StaticPage>
  );
}
