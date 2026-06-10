import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { fetchBlogs } from "@/lib/data";

export const metadata = {
  title: "Blog",
  description: "Fashion tips and news from Luxee Store.",
};

export default async function BlogPage() {
  const posts = await fetchBlogs();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <PageHeader title="The Luxee Journal" subtitle="Style inspiration and brand stories" />

      {posts.length === 0 ? (
        <p className="text-center text-muted">No blog posts yet.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group overflow-hidden rounded-sm border border-border transition-colors hover:border-gold/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <span className="text-xs uppercase tracking-widest text-gold">{post.category}</span>
                <h2 className="mt-2 text-lg font-semibold line-clamp-2 group-hover:text-gold">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-muted line-clamp-2">{post.excerpt}</p>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted">
                  <Clock size={12} />
                  {post.readTime} min read
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
