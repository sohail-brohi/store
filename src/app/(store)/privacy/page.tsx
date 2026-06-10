import { StaticPage } from "@/components/content/StaticPage";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p>Last updated: {new Date().toLocaleDateString()}</p>
      <h2 className="text-xl font-semibold text-white light:text-black">Information We Collect</h2>
      <p>We collect information you provide directly, including name, email, shipping address, and payment details when you place an order or create an account.</p>
      <h2 className="text-xl font-semibold text-white light:text-black">How We Use Your Information</h2>
      <p>Your information is used to process orders, communicate about your purchases, improve our services, and send marketing communications (with your consent).</p>
      <h2 className="text-xl font-semibold text-white light:text-black">Data Security</h2>
      <p>We implement industry-standard security measures to protect your personal information. Payment data is processed securely and never stored on our servers.</p>
      <h2 className="text-xl font-semibold text-white light:text-black">Contact</h2>
      <p>For privacy-related inquiries, contact us at contact@luxees.com.</p>
    </StaticPage>
  );
}
