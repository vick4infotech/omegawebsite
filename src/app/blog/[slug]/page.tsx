import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Markdown } from "@/components/markdown";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const post = await prisma.post.findUnique({
      where: { slug: params.slug },
      select: { title: true, excerpt: true },
    });
    if (!post) return { title: "Post not found" };
    return { title: post.title, description: post.excerpt };
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
    select: { title: true, excerpt: true, contentMarkdown: true, createdAt: true, tags: true, published: true },
  });

  if (!post || !post.published) return notFound();

  return (
    <section className="container pt-10">
      <Link className="link text-sm text-white/70" href="/blog">
        ← Back to blog
      </Link>

      <div className="mt-6 card p-8">
        <h1 className="text-3xl font-semibold">{post.title}</h1>
        <p className="mt-3 text-white/75">{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean)
            .map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
        </div>
        <hr className="my-8 border-white/10" />
        <Markdown content={post.contentMarkdown} />
      </div>
    </section>
  );
}
