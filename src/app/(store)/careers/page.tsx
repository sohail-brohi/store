import { PageHeader } from "@/components/ui/PageHeader";
import { fetchJobs } from "@/lib/data";

export const metadata = {
  title: "Careers",
  description: "Join the Luxee Store team.",
};

export default async function CareersPage() {
  const jobs = await fetchJobs();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <PageHeader title="Careers at Luxee" subtitle="Join our team and shape the future of luxury fashion" />

      {jobs.length === 0 ? (
        <p className="text-center text-muted">No open positions at the moment.</p>
      ) : (
        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="rounded-sm border border-border p-6">
              <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{job.title}</h2>
                  <p className="mt-1 text-sm text-gold">
                    {job.department} · {job.location} · {job.type}
                  </p>
                </div>
                <a
                  href={`mailto:careers@luxees.com?subject=Application: ${job.title}`}
                  className="rounded-sm bg-gold px-4 py-2 text-sm font-medium text-black hover:bg-gold/90"
                >
                  Apply Now
                </a>
              </div>
              <p className="mb-4 text-sm text-muted">{job.description}</p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-muted">
                {job.requirements.map((req) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
