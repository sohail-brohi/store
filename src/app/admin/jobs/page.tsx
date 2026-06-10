import { getJobs } from "@/lib/firestore";

export const metadata = { title: "Job Postings" };
export const dynamic = "force-dynamic";

export default async function AdminJobsPage() {
  let jobs: Awaited<ReturnType<typeof getJobs>> = [];
  try {
    jobs = await getJobs();
  } catch {
    jobs = [];
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-white light:text-black">Job Postings</h1>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="rounded-lg border border-white/10 p-4 light:border-black/10">
            <div className="flex items-center justify-between">
              <h2 className="font-medium text-white light:text-black">{job.title}</h2>
              <span className="rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                Active
              </span>
            </div>
            <p className="text-sm text-gold">
              {job.department} · {job.location}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
