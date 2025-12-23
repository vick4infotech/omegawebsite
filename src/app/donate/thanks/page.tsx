import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank you",
};

export default function DonateThanksPage({
  searchParams,
}: {
  searchParams?: { session_id?: string };
}) {
  return (
    <section className="container pt-10">
      <div className="card max-w-2xl p-8">
        <h1 className="text-2xl font-semibold">Thank you for your donation</h1>
        <p className="mt-3 text-white/75">
          We appreciate your support for restoration, empowerment, and sustainability.
        </p>
        {searchParams?.session_id ? (
          <p className="mt-3 text-sm text-white/65">
            Stripe session: <span className="font-mono">{searchParams.session_id}</span>
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn-primary" href="/projects">
            Explore projects
          </Link>
          <Link className="btn-secondary" href="/blog">
            Read the blog
          </Link>
        </div>
      </div>
    </section>
  );
}
