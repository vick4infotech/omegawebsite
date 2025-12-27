"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { countries, initiatives, projects, getCountry, getInitiative, type Country, type Initiative } from "@/config/site";

type Filters = {
  initiative: Initiative["id"] | "all";
  country: Country["id"] | "all";
  featured: boolean;
  query: string;
};

function ProjectCard({ slug }: { slug: string }) {
  const p = projects.find((x) => x.slug === slug)!;
  const c = getCountry(p.country);
  const it = getInitiative(p.initiative);

  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group block overflow-hidden rounded-3xl border bg-card/80 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={p.heroImage}
          alt={p.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {p.featured ? <Badge className="gap-1"><Sparkles className="h-3 w-3" /> Featured</Badge> : null}
          <Badge variant="secondary">{c.name}</Badge>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold text-muted-foreground">{it.name}</p>
        <h3 className="mt-1 text-lg font-bold tracking-tight">{p.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          View details <span aria-hidden>→</span>
        </div>
      </div>
    </Link>
  );
}

export function ProjectsDirectory({
  initialInitiative = "all",
}: {
  initialInitiative?: Filters["initiative"];
}) {
  const reduceMotion = useReducedMotion();
  const sp = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = React.useState<Filters>({
    initiative: initialInitiative,
    country: "all",
    featured: false,
    query: "",
  });

  // Sync initial from querystring (initiative=...)
  React.useEffect(() => {
    const initiativeParam = sp.get("initiative") as Filters["initiative"] | null;
    if (initiativeParam && (initiativeParam === "all" || initiatives.some((i) => i.id === initiativeParam))) {
      setFilters((f) => ({ ...f, initiative: initiativeParam }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const list = React.useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return projects
      .filter((p) => (filters.featured ? Boolean(p.featured) : true))
      .filter((p) => (filters.initiative === "all" ? true : p.initiative === filters.initiative))
      .filter((p) => (filters.country === "all" ? true : p.country === filters.country))
      .filter((p) => (q ? `${p.title} ${p.summary}`.toLowerCase().includes(q) : true));
  }, [filters]);

  function setUrlParams(next: Partial<Filters>) {
    const params = new URLSearchParams(sp.toString());
    if (next.initiative) {
      if (next.initiative === "all") params.delete("initiative");
      else params.set("initiative", next.initiative);
    }
    router.replace(`/our-projects${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <section className="container py-12">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-muted-foreground">Project Directory</p>
        <h1 className="text-4xl font-black tracking-tight">Our Projects</h1>
        <p className="max-w-3xl text-muted-foreground">
          Search and filter initiatives across Uganda, South Sudan, Rwanda, The Gambia, and Guinea.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_2fr]">
        <Card className="rounded-3xl bg-card/70 p-6 shadow-sm backdrop-blur">
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                value={filters.query}
                onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                placeholder="Search projects"
                aria-label="Search projects"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold">Initiative type</label>
              <Select
                value={filters.initiative}
                onValueChange={(v) => {
                  const val = v as Filters["initiative"];
                  setFilters((f) => ({ ...f, initiative: val }));
                  setUrlParams({ initiative: val });
                }}
              >
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="Select initiative" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All initiatives</SelectItem>
                  {initiatives.map((i) => (
                    <SelectItem key={i.id} value={i.id}>
                      {i.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label className="text-sm font-semibold">Country</label>
              <Select
                value={filters.country}
                onValueChange={(v) => setFilters((f) => ({ ...f, country: v as Filters["country"] }))}
              >
                <SelectTrigger className="rounded-2xl">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All focus regions</SelectItem>
                  {countries.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between rounded-2xl border bg-background px-4 py-3">
              <div>
                <p className="text-sm font-semibold">Featured only</p>
                <p className="text-xs text-muted-foreground">Highlight flagship programs</p>
              </div>
              <Switch
                checked={filters.featured}
                onCheckedChange={(v) => setFilters((f) => ({ ...f, featured: Boolean(v) }))}
                aria-label="Toggle featured projects"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-2xl"
                onClick={() => setFilters({ initiative: "all", country: "all", featured: false, query: "" })}
              >
                Reset
              </Button>
              <p className="text-xs text-muted-foreground">Showing {list.length} project(s)</p>
            </div>
          </div>
        </Card>

        <div>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={`${filters.initiative}-${filters.country}-${filters.featured}-${filters.query}`}
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className={cn("grid gap-5 md:grid-cols-2 xl:grid-cols-3")}
            >
              {list.map((p) => (
                <ProjectCard key={p.slug} slug={p.slug} />
              ))}
            </motion.div>
          </AnimatePresence>

          {list.length === 0 ? (
            <Card className="mt-6 rounded-3xl bg-card/70 p-8 text-center shadow-sm backdrop-blur">
              <h3 className="text-lg font-semibold">No matches</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try different filters or clear your search.</p>
            </Card>
          ) : null}
        </div>
      </div>
    </section>
  );
}
