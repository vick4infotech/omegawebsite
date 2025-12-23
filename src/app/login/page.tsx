import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Sign in",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { callbackUrl?: string };
}) {
  return (
    <section className="container pt-10">
      <div className="mx-auto max-w-md">
        <div className="card p-8">
          <h1 className="text-2xl font-semibold">Admin sign in</h1>
          <p className="mt-2 text-sm text-white/75">
            Use the seeded admin account to manage blog posts.
          </p>
          <LoginForm callbackUrl={searchParams?.callbackUrl} />
        </div>
      </div>
    </section>
  );
}
