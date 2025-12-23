import type { Metadata } from "next";
import Link from "next/link";
import { createPost } from "@/lib/actions";
import { PostEditor } from "@/components/post-editor";

export const metadata: Metadata = {
  title: "Admin • New post",
};

export default function NewPostPage() {
  return (
    <section className="container pt-10">
      <Link className="link text-sm text-white/70" href="/admin/posts">
        ← Back
      </Link>
      <div className="mt-6 card p-8">
        <h1 className="text-2xl font-semibold">New post</h1>
        <p className="mt-2 text-sm text-white/70">Write in Markdown and preview in real time.</p>
        <div className="mt-6">
          <PostEditor action={createPost} submitLabel="Create post" />
        </div>
      </div>
    </section>
  );
}
