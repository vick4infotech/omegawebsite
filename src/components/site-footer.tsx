"use client";

import Link from "next/link";
import { useState } from "react";
import { newsletterSchema } from "@/lib/validation";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = newsletterSchema.safeParse({ email });
    if (!parsed.success) {
      setMessage("Please enter a valid email.");
      setStatus("error");
      return;
    }

    setStatus("saving");
    setMessage("");
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    if (res.ok) {
      setStatus("done");
      setMessage("Thanks! You're signed up.");
      setEmail("");
    } else {
      const data = await res.json().catch(() => ({}));
      setStatus("error");
      setMessage(data?.error ?? "Something went wrong.");
    }
  }

  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="container grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <div className="text-lg font-semibold">Omega Global Development (OGD)</div>
          <p className="text-sm text-white/75">
            501(c)(3) nonprofit • P.O. Box 22126, Beachwood Oh, 44122
          </p>
          <p className="text-sm text-white/70">
            Faith-based development organization investing in African communities through restoration,
            empowerment, and sustainability.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold">Explore</div>
          <div className="grid gap-2 text-sm text-white/80">
            <Link className="link w-fit" href="/about">
              About Us
            </Link>
            <Link className="link w-fit" href="/projects">
              Projects
            </Link>
            <Link className="link w-fit" href="/blog">
              Blog
            </Link>
            <Link className="link w-fit" href="/donate">
              Donate
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold">Newsletter</div>
          <p className="text-sm text-white/70">
            Get occasional updates about education, maternal health, and disaster relief initiatives.
          </p>
          <form className="flex flex-col gap-3" onSubmit={onSubmit}>
            <label className="text-sm">
              <span className="sr-only">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white placeholder:text-white/40"
                type="email"
                required
              />
            </label>
            <button disabled={status === "saving"} className="btn-primary disabled:opacity-60">
              {status === "saving" ? "Signing up…" : "Sign up"}
            </button>
            {message ? (
              <p className="text-sm text-white/75" role="status" aria-live="polite">
                {message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container flex flex-col gap-2 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Omega Global Development (OGD)</span>
          <span>Built to run locally with SQLite • Switch to Postgres in production via Prisma</span>
        </div>
      </div>
    </footer>
  );
}
