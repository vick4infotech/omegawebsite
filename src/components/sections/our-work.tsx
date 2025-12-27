"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { initiatives } from "@/config/site";
import { CardContent, CardHeader, CardTitle, CardDescription, Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fadeUp, stagger } from "@/lib/motion";
import { TiltCard } from "@/components/sections/tilt-card";

export function OurWorkSection() {
  return (
    <section className="container py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Our Work</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Initiatives that restore dignity</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            From schools to clinics to leadership training, we partner with local communities to build sustainable, faith-rooted impact.
          </p>
        </div>
        <Link href="/our-projects" className="hidden items-center gap-2 text-sm font-semibold text-primary sm:flex">
          Browse projects <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        {initiatives.map((it) => (
          <motion.div key={it.id} variants={fadeUp}>
            <TiltCard className="h-full">
              <Card className="h-full rounded-3xl bg-card/80 backdrop-blur">
                <CardHeader>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{it.name}</Badge>
                    {it.sdg?.slice(0, 2).map((s) => (
                      <Badge key={s} variant="outline">
                        SDG: {s}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="mt-2">{it.tagline}</CardTitle>
                  <CardDescription className="mt-2">
                    Learn more about programs and how to get involved.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Link
                    href={`/our-projects?initiative=${it.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
