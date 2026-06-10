import { PageHeader } from "@/components/ui/PageHeader";
import { FAQAccordion } from "./FAQAccordion";
import { fetchFAQs } from "@/lib/data";

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Luxee Store.",
};

export default async function FAQPage() {
  const faqs = await fetchFAQs();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <PageHeader title="Frequently Asked Questions" subtitle="Find answers to common questions" />
      <FAQAccordion faqs={faqs} />
    </div>
  );
}
