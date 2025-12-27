"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { Card } from "@/components/ui/card";

const stats = [
  { label: "Countries served", value: 5 },
  { label: "Initiatives", value: 7 },
  { label: "Partners", value: 24 },
  { label: "Communities reached", value: 1200 },
] as const;

function Counter({ value }: { value: number }) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (!inView) return;
    const el = ref.current;
    if (!el) return;
    if (reduceMotion) {
      el.textContent = String(value);
      return;
    }

    const duration = 900;
    const start = performance.now();
    const from = 0;

    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const current = Math.round(from + (value - from) * eased);
      el.textContent = current.toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, reduceMotion, value]);

  return <span ref={ref} />;
}

export function ImpactStatsSection() {
  return (
    <section className="container py-16">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-muted-foreground">Impact Stats</p>
        <h2 className="text-3xl font-bold tracking-tight">Momentum you can feel</h2>
        <p className="max-w-2xl text-muted-foreground">
          Numbers below are tasteful placeholders for demo purposes. Replace with verified metrics when available.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="rounded-3xl bg-card/80 p-6 backdrop-blur">
              <div className="text-3xl font-black tracking-tight">
                <Counter value={s.value} />
                {s.label === "Communities reached" ? "+" : ""}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
