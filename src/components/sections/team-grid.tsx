"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Filter, Users } from "lucide-react";

import { team, type TeamMember } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const groups: TeamMember["group"][] = ["Leadership", "Board", "Regional Advisors", "Operations"];

function TeamCard({ person, onOpen }: { person: TeamMember; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full text-left"
    >
      <Card className="overflow-hidden rounded-3xl bg-card/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative aspect-[4/3]">
          <Image
            src={person.image}
            alt={person.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <div className="absolute left-4 top-4">
            <Badge variant="secondary">{person.group}</Badge>
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold tracking-tight">{person.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{person.role}</p>
          <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            View bio <span aria-hidden>→</span>
          </div>
        </div>
      </Card>
    </button>
  );
}

export function TeamGrid() {
  const reduceMotion = useReducedMotion();
  const [group, setGroup] = React.useState<TeamMember["group"] | "all">("all");
  const [active, setActive] = React.useState<TeamMember | null>(null);

  const list = React.useMemo(() => {
    const base = [...team];
    if (group === "all") return base;
    return base.filter((p) => p.group === group);
  }, [group]);

  return (
    <section className="container py-12">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-muted-foreground">Our Teams</p>
        <h1 className="text-4xl font-black tracking-tight">People behind the mission</h1>
        <p className="max-w-3xl text-muted-foreground">
          Leadership, board members, regional advisors, and operations partners working together to serve communities with dignity.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Filter className="h-4 w-4" /> Filter
          </span>
          <Button
            type="button"
            variant={group === "all" ? "default" : "outline"}
            size="sm"
            className="rounded-xl"
            onClick={() => setGroup("all")}
          >
            All
          </Button>
          {groups.map((g) => (
            <Button
              key={g}
              type="button"
              variant={group === g ? "default" : "outline"}
              size="sm"
              className="rounded-xl"
              onClick={() => setGroup(g)}
            >
              {g}
            </Button>
          ))}
        </div>

        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" /> {list.length} member(s)
        </div>
      </div>

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={group}
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((p) => (
            <TeamCard key={p.id} person={p} onOpen={() => setActive(p)} />
          ))}
        </motion.div>
      </AnimatePresence>

      <Dialog open={Boolean(active)} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-2xl">
          {active ? (
            <div className="grid gap-6 md:grid-cols-[220px_1fr]">
              <div className="relative overflow-hidden rounded-2xl border bg-muted">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    sizes="220px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <DialogHeader>
                  <DialogTitle>{active.name}</DialogTitle>
                  <DialogDescription>{active.role}</DialogDescription>
                </DialogHeader>

                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <p>{active.bio}</p>
                  <p>
                    Image slot placeholder: drop a real portrait into <span className="font-mono">public/assets/team</span> and update
                    <span className="font-mono"> src/config/site.ts</span> if needed.
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
