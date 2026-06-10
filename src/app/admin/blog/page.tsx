import { getBlogs } from "@/lib/firestore";

export const metadata = { title: "Blog Posts" };
export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  let posts: Awaited<ReturnType<typeof getBlogs>> = [];
  try {
    posts = await getBlogs();
  } catch {
    posts = [];
  }

  return (
    <div className="p-8">
      <h1 className="mb-8 text-2xl font-bold text-white light:text-black">Blog Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="rounded-lg border border-white/10 p-4 light:border-black/10">
            <h2 className="font-medium text-white light:text-black">{post.title}</h2>
            <p className="text-sm text-gold">{post.category}</p>
            <p className="mt-2 text-sm text-white/60 line-clamp-2">{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
