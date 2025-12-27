"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { useDonate } from "@/components/layout/donation-context";

export function CtaBand() {
  const { open } = useDonate();
  const reduceMotion = useReducedMotion();

  return (
    <section className="container pb-20">
      <motion.div
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
        whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border bg-card/70 p-8 shadow-sm backdrop-blur"
      >
        <div className="absolute inset-0 -z-10 [background:radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.18),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_55%)]" />
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Ready to help?</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight">Partner with {site.acronym} to empower communities</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Your giving supports education, health, leadership, and sustainable livelihoods—guided by faith and rooted in dignity.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => open()} className="rounded-2xl px-6">
              Donate
            </Button>
            <Button asChild variant="outline" className="rounded-2xl px-6">
              <Link href="/our-projects">Browse projects</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
