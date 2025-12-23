import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "@/lib/actions";
import { auth, signOut } from "@/auth";

export const metadata: Metadata = {
  title: "Admin • Posts",
};

export default async function AdminPostsPage() {
  const session = await auth();

  let posts: Array<{ id: string; title: string; published: boolean; updatedAt: Date }> = [];
  let dbReady = true;

  try {
    posts = await prisma.post.findMany({
      select: { id: true, title: true, published: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    });
  } catch {
    dbReady = false;
  }

  return (
    <section className="container pt-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold md:text-4xl">Admin • Posts</h1>
          <p className="mt-2 text-sm text-white/70">
            Signed in as <span className="font-mono">{session?.user?.email}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/posts/new" className="btn-primary">
            New post
          </Link>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <button className="btn-secondary" type="submit">
              Sign out
            </button>
          </form>
        </div>
      </div>

      {!dbReady ? (
        <div className="mt-8 card p-6">
          <div className="text-sm font-semibold">Database not initialized</div>
          <p className="mt-2 text-sm text-white/75">
            Run <span className="font-mono">npm run setup</span> first.
          </p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-3">
        {posts.map((p) => (
          <div key={p.id} className="card flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-white/65">
                {p.published ? "Published" : "Draft"} • Updated {p.updatedAt.toLocaleDateString()}
              </div>
            </div>
            <div className="flex gap-2">
              <Link className="btn-secondary" href={`/admin/posts/${p.id}/edit`}>
                Edit
              </Link>
              <form
                action={async () => {
                  "use server";
                  await deletePost(p.id);
                }}
              >
                <button className="btn-secondary" type="submit">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
