"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm({ callbackUrl }: { callbackUrl?: string }) {
  const [email, setEmail] = useState("admin@omegaglobaldevelopment.org");
  const [password, setPassword] = useState("ChangeMe123!");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: callbackUrl ?? "/admin/posts",
    });

    // If redirect is true, NextAuth handles navigation.
    if ((res as any)?.error) {
      setBusy(false);
      setError("Invalid email or password.");
    }
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
      <label className="grid gap-1 text-sm">
        <span className="text-white/80">Email</span>
        <input
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </label>

      <label className="grid gap-1 text-sm">
        <span className="text-white/80">Password</span>
        <input
          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </label>

      {error ? (
        <p role="alert" className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80">
          {error}
        </p>
      ) : null}

      <button disabled={busy} className="btn-primary disabled:opacity-60">
        {busy ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-xs text-white/60">
        After signing in, change the default password by updating the stored hash in the database (see README).
      </p>
    </form>
  );
}
