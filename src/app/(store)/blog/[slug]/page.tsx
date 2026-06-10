import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { fetchBlog } from "@/lib/data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlog(slug);
  if (!post) return { title: "Blog Post" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await fetchBlog(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gold hover:underline"
      >
        <ArrowLeft size={16} /> Back to Blog
      </Link>

      <span className="text-xs uppercase tracking-widest text-gold">{post.category}</span>
      <h1 className="font-display mt-2 text-3xl font-semibold md:text-4xl">{post.title}</h1>

      <div className="mt-4 flex items-center gap-4 text-sm text-muted">
        <span>By {post.author}</span>
        <span className="flex items-center gap-1">
          <Clock size={14} />
          {post.readTime} min read
        </span>
      </div>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-sm">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority sizes="100vw" />
      </div>

      <div className="mt-8 space-y-4 leading-relaxed text-muted">
        {post.content.split("\n\n").map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
