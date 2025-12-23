"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { postSchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";
import { revalidatePath } from "next/cache";

async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as any)?.role;
  if (!session || role !== "ADMIN") throw new Error("Unauthorized");
  return session;
}

export async function createPost(formData: FormData) {
  await requireAdmin();
  const raw = {
    title: String(formData.get("title") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    contentMarkdown: String(formData.get("contentMarkdown") ?? ""),
    tags: String(formData.get("tags") ?? ""),
    published: formData.get("published") === "on",
  };
  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const slug = slugify(parsed.data.title);

  const post = await prisma.post.create({
    data: { ...parsed.data, slug, tags: parsed.data.tags ?? "" },
  });

  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  return { ok: true, id: post.id };
}

export async function updatePost(id: string, formData: FormData) {
  await requireAdmin();
  const raw = {
    title: String(formData.get("title") ?? ""),
    excerpt: String(formData.get("excerpt") ?? ""),
    contentMarkdown: String(formData.get("contentMarkdown") ?? ""),
    tags: String(formData.get("tags") ?? ""),
    published: formData.get("published") === "on",
  };
  const parsed = postSchema.safeParse(raw);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };

  const slug = slugify(parsed.data.title);

  await prisma.post.update({
    where: { id },
    data: { ...parsed.data, slug, tags: parsed.data.tags ?? "" },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/admin/posts");
  return { ok: true };
}

export async function deletePost(id: string) {
  await requireAdmin();
  await prisma.post.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/posts");
  return { ok: true };
}
