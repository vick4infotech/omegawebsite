import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DonateReviewActions } from "@/components/sections/donate-review-actions";
import { DonationModule } from "@/components/sections/donation-module";
import { getProject, getCountry, getInitiative, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Donate",
  description: `Support ${site.name} programs with a one-time or monthly gift (demo flow).`,
};

function parseAmount(value: unknown) {
  const n = typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(n) && n > 0 ? Math.round(n) : 25;
}

function parseFrequency(value: unknown): "one-time" | "monthly" {
  return value === "monthly" ? "monthly" : "one-time";
}

export default function DonatePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const amount = parseAmount(searchParams?.amount);
  const frequency = parseFrequency(searchParams?.frequency);
  const projectSlug = typeof searchParams?.project === "string" ? searchParams?.project : undefined;
  const project = projectSlug ? getProject(projectSlug) : undefined;

  return (
    <main className="container py-12">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Donate</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight">Give with purpose</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            This page demonstrates a donation flow. No payment is processed here.
            When you’re ready, connect a real payment provider or use the external donate form.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Card className="rounded-3xl bg-card/70 p-6 shadow-sm backdrop-blur">
              <p className="text-xs font-semibold text-muted-foreground">Your selection</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary">${amount}</Badge>
                <Badge variant="outline">{frequency === "monthly" ? "Monthly" : "One-time"}</Badge>
                {project ? (
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                    {getInitiative(project.initiative).name}
                  </Badge>
                ) : null}
                {project ? <Badge variant="secondary">{getCountry(project.country).name}</Badge> : null}
              </div>

              {project ? (
                <div className="mt-4 rounded-2xl border bg-background p-4">
                  <p className="text-sm font-semibold">{project.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{project.summary}</p>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-3 inline-flex text-sm font-semibold text-primary"
                  >
                    View project details →
                  </Link>
                </div>
              ) : null}

              <div className="mt-5 flex flex-col gap-3">
                <DonateReviewActions amount={amount} frequency={frequency} projectSlug={projectSlug} />
                <Button asChild className="rounded-2xl">
                  <a href={site.donateExternalUrl} target="_blank" rel="noreferrer">
                    Continue on external donate page
                  </a>
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Payment integration placeholder. Replace with Stripe, PayPal, or your preferred provider.
              </p>
            </Card>

            <Card className="relative overflow-hidden rounded-3xl bg-card/70 shadow-sm backdrop-blur">
              <div className="relative aspect-[4/5]">
                <Image
                  src={project?.heroImage ?? "/assets/hero.jpg"}
                  alt="Donation hero"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <p className="text-xs font-semibold text-white/70">Your support helps</p>
                  <h2 className="mt-2 text-2xl font-bold text-white">Restore dignity, build sustainable impact</h2>
                  <p className="mt-2 text-sm text-white/85">
                    Education, maternal health, leadership development, and resilient livelihoods across Africa.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="rounded-3xl bg-card/70 p-6 shadow-sm backdrop-blur">
            <p className="text-xs font-semibold text-muted-foreground">Donate here</p>
            <h2 className="mt-2 text-lg font-semibold">Adjust your gift</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Prefer not to use the modal? Use this module to adjust and reload this page with updated query parameters.
            </p>
            <div className="mt-4">
              <DonationModule projectSlug={projectSlug} />
            </div>
          </Card>

          <Card className="rounded-3xl bg-card/70 p-6 shadow-sm backdrop-blur">
            <p className="text-xs font-semibold text-muted-foreground">Need help?</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Email <span className="font-semibold text-foreground">{site.contact.email}</span> for partnership or donation questions.
            </p>
          </Card>
        </div>
      </div>
    </main>
  );
}
