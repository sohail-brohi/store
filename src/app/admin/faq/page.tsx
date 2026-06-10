import { getFAQs } from "@/lib/firestore";

export const metadata = { title: "FAQ Management" };
export const dynamic = "force-dynamic";

export default async function AdminFAQPage() {
  let faqs: Awaited<ReturnType<typeof getFAQs>> = [];
  try {
    faqs = await getFAQs();
  } catch {
    faqs = [];
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-white light:text-black">FAQ Management</h1>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="rounded-lg border border-white/10 p-4 light:border-black/10">
            <p className="font-medium text-white light:text-black">{faq.question}</p>
            <p className="mt-2 text-sm text-white/60">{faq.answer}</p>
            <span className="mt-2 inline-block text-xs text-gold capitalize">{faq.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
