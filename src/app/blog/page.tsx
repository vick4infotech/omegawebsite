import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Blog",
  description: "Updates and stories from Omega Global Development (OGD).",
};

export default async function BlogIndexPage() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === "ADMIN";

  let posts: Array<{ id: string; title: string; slug: string; excerpt: string; tags: string; createdAt: Date }> = [];
  let dbReady = true;

  try {
    posts = await prisma.post.findMany({
      where: { published: true },
      select: { id: true, title: true, slug: true, excerpt: true, tags: true, createdAt: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    dbReady = false;
  }

  return (
    <section className="container pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold md:text-4xl">Blog</h1>
          <p className="mt-3 max-w-2xl text-white/75">
            Updates and stories connected to our mission of restoration, empowerment, and sustainability.
          </p>
        </div>

        <div className="flex gap-3">
          {isAdmin ? (
            <Link className="btn-secondary" href="/admin/posts">
              Admin dashboard
            </Link>
          ) : (
            <Link className="btn-secondary" href="/login">
              Sign in
            </Link>
          )}
        </div>
      </div>

      {!dbReady ? (
        <div className="mt-8 card p-6">
          <div className="text-sm font-semibold">Database not initialized</div>
          <p className="mt-2 text-sm text-white/75">
            Run <span className="font-mono">npm run setup</span> to apply migrations and seed the admin user and sample posts.
          </p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.id} href={`/blog/${p.slug}`} className="card p-6 hover:bg-white/10 transition">
            <div className="text-lg font-semibold">{p.title}</div>
            <div className="mt-2 text-sm text-white/75">{p.excerpt}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.tags
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .slice(0, 6)
                .map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
            </div>
            <div className="mt-4 text-sm text-white/85">
              Read more <span aria-hidden>→</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
