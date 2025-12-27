"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MapPin, X } from "lucide-react";

import { projects, getCountry, getInitiative, type Country, countries } from "@/config/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Hotspot = {
  id: Country["id"];
  label: string;
  // percentage positions inside the SVG frame
  x: number;
  y: number;
};

const hotspots: Hotspot[] = [
  { id: "uganda", label: "Uganda", x: 57, y: 58 },
  { id: "south-sudan", label: "South Sudan", x: 55, y: 52 },
  { id: "rwanda", label: "Rwanda", x: 54.5, y: 62 },
  { id: "gambia", label: "The Gambia", x: 31, y: 63 },
  { id: "guinea", label: "Guinea", x: 33.5, y: 64.5 },
];

function ProjectCard({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug)!;
  const c = getCountry(p.country);
  const it = getInitiative(p.initiative);

  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group block overflow-hidden rounded-3xl border bg-card/80 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={p.heroImage}
          alt={p.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {p.featured ? <Badge>Featured</Badge> : null}
          <Badge variant="secondary">{c.name}</Badge>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold text-muted-foreground">{it.name}</p>
        <h3 className="mt-1 text-lg font-bold tracking-tight">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Learn more <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}

export function ImpactMapSection() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = React.useState<Country["id"] | "all">("all");

  const filtered = React.useMemo(() => {
    if (selected === "all") return projects;
    return projects.filter((p) => p.country === selected);
  }, [selected]);

  const selectedCountry = selected === "all" ? null : getCountry(selected);

  return (
    <section id="impact-map" className="container py-16">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-muted-foreground">Impact Map</p>
        <h2 className="text-3xl font-bold tracking-tight">Where we work across Africa</h2>
        <p className="max-w-3xl text-muted-foreground">
          Click a country hotspot to filter programs. This is a stylized map for storytelling, not a GIS representation.
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Card className="rounded-3xl bg-card/70 p-6 shadow-sm backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <p className="text-sm font-semibold">
                {selectedCountry ? selectedCountry.name : "All focus regions"}
              </p>
            </div>
            {selected !== "all" ? (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-xl"
                onClick={() => setSelected("all")}
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            ) : null}
          </div>

          <div className="relative mt-5 overflow-hidden rounded-3xl border bg-background">
            <div className="absolute inset-0 [background:radial-gradient(circle_at_20%_10%,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_60%)]" />

            {/* Stylized Africa silhouette */}
            <svg
              viewBox="0 0 100 100"
              aria-label="Stylized map of Africa"
              role="img"
              className="relative h-[320px] w-full"
            >
              <path
                d="M57 7c6 2 12 8 14 14 2 6 0 12-3 17-2 3 1 8 4 11 4 4 6 10 4 16-2 7-9 11-14 15-6 5-7 10-10 14-4 6-10 9-16 8-8-1-16-8-18-16-2-8 2-13 5-18 3-6 0-10-1-15-1-6 1-11 6-16 4-4 6-8 5-13-1-7 5-14 12-17 4-2 8-2 12 0z"
                fill="hsl(var(--foreground) / 0.06)"
                stroke="hsl(var(--border))"
                strokeWidth="1"
              />

              {hotspots.map((h) => {
                const active = selected === h.id;
                return (
                  <g key={h.id}>
                    <motion.circle
                      cx={h.x}
                      cy={h.y}
                      r={active ? 2.6 : 2.1}
                      className={cn(
                        "cursor-pointer",
                        active ? "fill-primary" : "fill-primary/70",
                      )}
                      initial={false}
                      animate={reduceMotion ? {} : { r: active ? 2.6 : 2.1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 26 }}
                      onClick={() => setSelected(h.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Filter projects by ${h.label}`}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelected(h.id);
                        }
                      }}
                    />
                    <motion.circle
                      cx={h.x}
                      cy={h.y}
                      r={6}
                      fill="transparent"
                      stroke="hsl(var(--primary) / 0.22)"
                      strokeWidth="1"
                      initial={reduceMotion ? false : { opacity: 0.2, scale: 0.7 }}
                      animate={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 2.2 }}
                      transition={{ duration: 1.7, repeat: Infinity, ease: "easeOut" }}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              type="button"
              variant={selected === "all" ? "default" : "outline"}
              size="sm"
              className="rounded-xl"
              onClick={() => setSelected("all")}
            >
              All
            </Button>
            {countries.map((c) => (
              <Button
                key={c.id}
                type="button"
                variant={selected === c.id ? "default" : "outline"}
                size="sm"
                className="rounded-xl"
                onClick={() => setSelected(c.id)}
              >
                {c.name}
              </Button>
            ))}
          </div>
        </Card>

        <div className="flex flex-col gap-4">
          <div className="rounded-3xl border bg-card/70 p-6 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-muted-foreground">Programs</p>
                <h3 className="mt-1 text-lg font-semibold">Explore projects</h3>
              </div>
              <Link href="/our-projects" className="text-sm font-semibold text-primary">
                View all →
              </Link>
            </div>

            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={selected}
                initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="mt-5 grid gap-4 sm:grid-cols-2"
              >
                {filtered.slice(0, 6).map((p) => (
                  <ProjectCard key={p.slug} slug={p.slug} />
                ))}
              </motion.div>
            </AnimatePresence>

            <p className="mt-4 text-xs text-muted-foreground">
              Tip: Visit the projects directory for search and advanced filters.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {countries.slice(0, 2).map((c) => (
              <Card
                key={c.id}
                className="rounded-3xl bg-card/70 p-5 shadow-sm backdrop-blur"
              >
                <p className="text-xs font-semibold text-muted-foreground">{c.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
