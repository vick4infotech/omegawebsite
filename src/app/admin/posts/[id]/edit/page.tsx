import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updatePost } from "@/lib/actions";
import { PostEditor } from "@/components/post-editor";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin • Edit post",
};

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: { id: params.id },
    select: { id: true, title: true, excerpt: true, contentMarkdown: true, tags: true, published: true },
  });

  if (!post) return notFound();

  const action = updatePost.bind(null, post.id);

  return (
    <section className="container pt-10">
      <Link className="link text-sm text-white/70" href="/admin/posts">
        ← Back
      </Link>
      <div className="mt-6 card p-8">
        <h1 className="text-2xl font-semibold">Edit post</h1>
        <p className="mt-2 text-sm text-white/70">Update content and publish when ready.</p>
        <div className="mt-6">
          <PostEditor
            action={action}
            submitLabel="Save changes"
            defaultValues={{
              title: post.title,
              excerpt: post.excerpt,
              contentMarkdown: post.contentMarkdown,
              tags: post.tags,
              published: post.published,
            }}
          />
        </div>
      </div>
    </section>
  );
}
