"use client";

import { useEffect, useMemo, useState } from "react";
import { causes, getCauseBySlug, cn } from "@/lib/utils";
import { donationSchema } from "@/lib/validation";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const chips = [5, 10, 25, 50] as const;

type Props = {
  initialCause?: string | null;
  compact?: boolean;
};

export function DonationWidget({ initialCause, compact }: Props) {
  const reduce = useReducedMotion();
  const initial = useMemo(() => getCauseBySlug(initialCause), [initialCause]);

  const [interval, setInterval] = useState<"one-time" | "monthly">("one-time");
  const [cause, setCause] = useState<string>(initial.slug);
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState<string>("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setCause(initial.slug);
  }, [initial.slug]);

  function setChip(val: number) {
    setAmount(val);
    setCustom("");
    setError("");
  }

  function setCustomAmount(val: string) {
    setCustom(val);
    const n = Number(val);
    if (!Number.isFinite(n)) return;
    setAmount(n);
    setError("");
  }

  async function onDonate() {
    setBusy(true);
    setError("");

    const cents = Math.round(amount * 100);
    const parsed = donationSchema.safeParse({
      amount: cents,
      interval,
      cause,
    });
    if (!parsed.success) {
      setBusy(false);
      setError(parsed.error.issues[0]?.message ?? "Please check your donation details.");
      return;
    }

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setBusy(false);
      setError(data?.error ?? "Unable to start checkout.");
      return;
    }

    const data: { url?: string } = await res.json();
    if (data.url) window.location.href = data.url;
    else {
      setBusy(false);
      setError("Checkout URL missing. Please try again.");
    }
  }

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0, y: 8 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      className={cn("card p-5 md:p-6", compact ? "" : "shadow-2xl shadow-black/40")}
      aria-label="Donation widget"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <HeartHandshake aria-hidden size={18} />
            Donate
          </div>
          <div className="text-xs text-white/65">Secure Stripe Checkout (test mode)</div>
        </div>

        <div className="flex rounded-xl border border-white/15 bg-white/5 p-1 text-xs">
          <button
            type="button"
            className={cn("rounded-lg px-3 py-1.5", interval === "one-time" && "bg-white/10")}
            onClick={() => setInterval("one-time")}
          >
            One-time
          </button>
          <button
            type="button"
            className={cn("rounded-lg px-3 py-1.5", interval === "monthly" && "bg-white/10")}
            onClick={() => setInterval("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className={cn("grid gap-4", compact ? "" : "md:grid-cols-2")}>
        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Amount</div>
          <div className="flex flex-wrap gap-2">
            {chips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setChip(c)}
                className={cn("chip", amount === c && !custom && "border-white/35 bg-white/10")}
              >
                ${c}
              </button>
            ))}
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
              <span className="text-sm text-white/80">$</span>
              <input
                inputMode="decimal"
                value={custom}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder="Custom"
                className="w-24 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                aria-label="Custom amount"
              />
            </div>
          </div>
          <div className="text-xs text-white/60">Minimum $1.00</div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/60">Cause</div>
          <div className="grid gap-2">
            <label className="text-sm">
              <span className="sr-only">Select cause</span>
              <select
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-white"
              >
                {causes.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <div className="text-xs text-white/65">
              {getCauseBySlug(cause).regions}
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <p className="mt-4 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="button"
        onClick={onDonate}
        disabled={busy}
        className="btn-primary mt-5 w-full disabled:opacity-60"
      >
        {busy ? "Starting checkout…" : "Donate with Stripe"}
        <ArrowRight aria-hidden size={18} />
      </button>

      <div className="mt-3 text-xs text-white/60">
        Your donation supports restoration, empowerment, and sustainability.
      </div>
    </motion.div>
  );
}
