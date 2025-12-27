import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DonationModule } from "@/components/sections/donation-module";
import { DonateToProject } from "@/components/sections/donate-to-project";
import { getProject, projects, getCountry, getInitiative, site } from "@/config/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: "Project" };

  const c = getCountry(project.country);
  const it = getInitiative(project.initiative);

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      images: [{ url: project.heroImage }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | ${site.name}`,
      description: project.summary,
      images: [project.heroImage],
    },
  };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) return notFound();

  const c = getCountry(project.country);
  const it = getInitiative(project.initiative);

  return (
    <main>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-background" />
        </div>

        <div className="container relative py-16">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{c.name}</Badge>
              <Badge variant="outline">{it.name}</Badge>
              {project.featured ? <Badge>Featured</Badge> : null}
            </div>
            <h1 className="mt-5 text-balance text-4xl font-black tracking-tight text-white sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-2xl text-white/85">{project.summary}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <DonateToProject projectSlug={project.slug} />
              <Button asChild variant="outline" className="rounded-2xl border-white/25 bg-white/5 text-white hover:bg-white/10">
                <a href="#how-to-help">How to help</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
          <div className="space-y-6">
            <Card className="rounded-3xl bg-card/70 p-6 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-muted-foreground">Overview</p>
              <h2 className="mt-2 text-xl font-semibold">What this initiative does</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {project.summary}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Where we work:</span> {project.whereWeWork}
              </p>
            </Card>

            <Card className="rounded-3xl bg-card/70 p-6 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-muted-foreground">Goals</p>
              <h2 className="mt-2 text-xl font-semibold">What success looks like</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {project.goals.map((g) => (
                  <li key={g} className="flex gap-3">
                    <span aria-hidden className="mt-1 h-2 w-2 flex-none rounded-full bg-primary" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card id="how-to-help" className="rounded-3xl bg-card/70 p-6 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-muted-foreground">How to help</p>
              <h2 className="mt-2 text-xl font-semibold">Ways you can support</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {project.howToHelp.map((h) => (
                  <div key={h} className="rounded-2xl border bg-background p-4">
                    <p className="text-sm font-semibold">{h}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Actionable support option (placeholder text).</p>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <DonationModule projectSlug={project.slug} compact />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-3xl bg-card/70 p-6 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-muted-foreground">Quick facts</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Initiative</span>
                  <span className="font-semibold">{it.name}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Country</span>
                  <span className="font-semibold">{c.name}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Region focus</span>
                  <span className="font-semibold">Broader Africa</span>
                </div>
              </div>
            </Card>

            <Card className="rounded-3xl bg-card/70 p-6 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-muted-foreground">Gallery</p>
              <h3 className="mt-2 text-lg font-semibold">Project moments</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {project.gallery.slice(0, 4).map((src) => (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-2xl border">
                    <Image src={src} alt="Project photo" fill sizes="200px" className="object-cover" />
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Replace placeholders by dropping images into <span className="font-mono">public/assets/projects</span>.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
