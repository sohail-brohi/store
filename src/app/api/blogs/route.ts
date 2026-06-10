import { NextRequest, NextResponse } from "next/server";
import { getBlogs, getBlogBySlug } from "@/lib/firestore";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await getBlogBySlug(slug);
      if (!post) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    const posts = await getBlogs();
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Blogs fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
