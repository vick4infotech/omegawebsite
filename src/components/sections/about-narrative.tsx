"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeartHandshake, Sprout, School, Stethoscope, Flag, ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { useDonate } from "@/components/layout/donation-context";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "Local church roots",
    title: "From a church context to global partnerships",
    body:
      "Omega Global Development began from a local church context, shaped by co-founders engaged in international ministry. The heart has always been the same: faith-rooted restoration that uplifts lives.",
  },
  {
    year: "May 2022",
    title: "A school building opens",
    body:
      "A school building opened in Uganda—proof that partner-led investment can turn hope into brick-and-mortar opportunity. From there, we’ve grown supplies, teacher support, and Omega Pals cultural exchange.",
  },
  {
    year: "Today",
    title: "Beyond charity—toward sustainable productivity",
    body:
      "We partner with local leaders to unlock community resources, build skills, and create durable pathways for thriving.",
  },
] as const;

const values = [
  {
    title: "Restoration",
    icon: HeartHandshake,
    text: "We pursue healing and wholeness for people and communities—spiritually, socially, and economically.",
  },
  {
    title: "Investment",
    icon: Sprout,
    text: "We invest in local capacity: skills, leadership, and tools that increase productivity beyond short-term aid.",
  },
  {
    title: "Change",
    icon: Flag,
    text: "We work for lasting change through partner-led programs that honor dignity across religion, ethnicity, race, and nationality.",
  },
  {
    title: "Enrichment",
    icon: School,
    text: "We cultivate growth—education, arts, sports, and leadership—so communities can flourish and share hope.",
  },
] as const;

export function AboutNarrative() {
  const reduceMotion = useReducedMotion();
  const { open } = useDonate();

  const pinRef = React.useRef<HTMLDivElement | null>(null);
  const progressRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (reduceMotion) return;
    if (!pinRef.current) return;
    if (!progressRef.current) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-about-panel]");

      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });

      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: `+=${Math.max(600, panels.length * 520)}`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          gsap.to(progressRef.current, { scaleX: self.progress, duration: 0.12, overwrite: true });
        },
      });

      panels.forEach((panel, i) => {
        gsap.fromTo(
          panel,
          { opacity: 0.3, y: 24 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: pinRef.current,
              start: () => `top+=${i * 420} top+=110`,
              end: () => `top+=${i * 420 + 320} top+=110`,
              scrub: true,
            },
          },
        );
      });
    }, pinRef);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <div className="pb-20">
      <section className="container pt-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">About Us</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight">Who we are</h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {site.acronym} is a faith-rooted nonprofit committed to transforming lives—regardless of religion, ethnicity, race, or nationality.
              We empower communities beyond charity by investing in local resources, skills, and leadership.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="secondary">Uganda</Badge>
              <Badge variant="secondary">South Sudan</Badge>
              <Badge variant="secondary">Rwanda</Badge>
              <Badge variant="secondary">The Gambia</Badge>
              <Badge variant="secondary">Guinea</Badge>
              <Badge variant="outline">Broader Africa</Badge>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map((v) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.title}
                    initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
                    whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Card className="rounded-3xl bg-card/70 p-6 shadow-sm backdrop-blur">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-background">
                          <Icon className="h-5 w-5 text-primary" />
                        </span>
                        <div>
                          <h3 className="text-lg font-semibold">{v.title}</h3>
                          <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <Card className="relative overflow-hidden rounded-3xl bg-card/70 shadow-sm backdrop-blur">
            <div className="relative aspect-[4/5]">
              <Image
                src="/assets/projects/3.jpg"
                alt="Community impact"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="text-xs font-semibold text-white/70">Mission</p>
                <h2 className="mt-2 text-2xl font-bold text-white">Empowering communities, guided by faith</h2>
                <p className="mt-2 text-sm text-white/85">
                  We build with people, not for people—supporting education, livelihoods, health, and leadership.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="container mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground">Timeline</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight">A story told through steps of faith</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Scroll to experience a pinned timeline sequence. It becomes a simple list when reduced motion is enabled.
            </p>
          </div>

          <Button asChild variant="outline" className="hidden rounded-2xl md:inline-flex">
            <Link href="/our-projects">Explore projects</Link>
          </Button>
        </div>

        <div ref={pinRef} className="relative mt-8 overflow-hidden rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur">
          <div className="absolute inset-x-6 top-6 h-1 rounded-full bg-muted">
            <div ref={progressRef} className="h-full rounded-full bg-primary" />
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {timeline.map((t) => (
              <Card
                key={t.title}
                data-about-panel
                className="rounded-3xl bg-background/70 p-6 shadow-sm"
              >
                <p className="text-xs font-semibold text-muted-foreground">{t.year}</p>
                <h3 className="mt-2 text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {t.year === "May 2022" ? (
                    <Badge variant="secondary" className="gap-2">
                      <School className="h-3 w-3" /> School build
                    </Badge>
                  ) : null}
                  {t.year === "Today" ? (
                    <>
                      <Badge variant="secondary" className="gap-2"><Sprout className="h-3 w-3" /> Livelihoods</Badge>
                      <Badge variant="secondary" className="gap-2"><Stethoscope className="h-3 w-3" /> Health</Badge>
                    </>
                  ) : null}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mt-14">
        <Card className="overflow-hidden rounded-3xl border bg-card/70 p-8 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Join the mission</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">Make a faith-rooted impact today</h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Support programs that restore dignity, grow skills, strengthen health, and build servant leadership.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => open()} className="rounded-2xl px-6">Donate</Button>
              <Button asChild variant="outline" className="rounded-2xl px-6">
                <Link href="/our-projects" className="inline-flex items-center gap-2">
                  Browse projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
