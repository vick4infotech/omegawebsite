"use client";

import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { ParticleField } from "@/components/sections/particle-field";
import { useDonate } from "@/components/layout/donation-context";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const { open } = useDonate();
  const reduceMotion = useReducedMotion();
  const bgRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (reduceMotion) return;
    if (!bgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        y: 80,
        ease: "none",
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section className="relative overflow-hidden">
      <div ref={bgRef} className="absolute inset-0">
        <Image
          src="/assets/hero.jpg"
          alt="OGD hero"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.18),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.28),transparent_50%)]" />
      </div>

      <ParticleField className="absolute inset-0" />

      <div className="container relative flex min-h-[78vh] flex-col justify-center py-20">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold tracking-wide text-white backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-primary" />
            Faith-rooted initiatives • Sustainable impact across Africa
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 }}
            className="mt-6 text-balance text-4xl font-black tracking-tight text-white sm:text-6xl"
          >
            {site.tagline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16 }}
            className="mt-5 max-w-2xl text-pretty text-base text-white/85 sm:text-lg"
          >
            Restoration. Investment. Change. Enrichment. We partner with local leaders to uplift lives,
            restore dignity, and build community-powered pathways—beyond charity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              onClick={() => open()}
              className="h-11 rounded-2xl px-6 text-base"
            >
              Donate
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-11 rounded-2xl border-white/25 bg-white/5 px-6 text-base text-white hover:bg-white/10"
            >
              <a href="#projects" aria-label="Explore projects">
                Explore Projects
              </a>
            </Button>
            <Button asChild variant="ghost" className="h-11 rounded-2xl text-white hover:bg-white/10">
              <Link href="/about-us">Learn our story</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="mt-10 grid max-w-xl grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur"
          >
            <div>
              <p className="text-xs font-semibold text-white/70">Where we serve</p>
              <p className="mt-1 text-sm font-semibold text-white">Uganda • South Sudan • Rwanda</p>
              <p className="text-sm font-semibold text-white">The Gambia • Guinea</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-white/70">How we work</p>
              <p className="mt-1 text-sm text-white/90">
                Partner-led programs, local resources, and long-term productivity.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
