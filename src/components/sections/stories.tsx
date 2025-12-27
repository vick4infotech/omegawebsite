"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const stories = [
  {
    title: "A classroom opens—and a future expands",
    date: "May 2022",
    excerpt: "A new school building opened, creating safe space for learning and community pride. Now we’re growing teacher support and supplies.",
  },
  {
    title: "Goat farming as a pathway to resilience",
    date: "Program highlight",
    excerpt: "Women-led goat farming boosts household income, nutrition, and community stability—aligned with SDGs like No Poverty and Zero Hunger.",
  },
  {
    title: "Sports camps that spark confidence",
    date: "Summer",
    excerpt: "With equipment and visiting coaches, kids experience mentorship, teamwork, and joy through free camps in low-income communities.",
  },
  {
    title: "Maternal care that meets families where they are",
    date: "Clinic support",
    excerpt: "From post-natal kits to medications and sliding-scale services, we’re helping clinics serve mothers and babies in remote villages.",
  },
  {
    title: "Relief today, resilience tomorrow",
    date: "Disaster response",
    excerpt: "Flooding and drought call for rapid aid—and long-term strategies like seeds, greenhouses, and small water infrastructure.",
  },
];

export function StoriesSection() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = React.useState(0);

  const current = stories[index];

  function prev() {
    setIndex((i) => (i - 1 + stories.length) % stories.length);
  }
  function next() {
    setIndex((i) => (i + 1) % stories.length);
  }

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % stories.length);
    }, 6500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="container py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-muted-foreground">Stories & Updates</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight">Moments that move communities</h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Sample updates for the website experience. Swap in real field stories as they’re verified.
          </p>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <Button variant="outline" size="icon" className="rounded-xl" onClick={prev} aria-label="Previous story">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-xl" onClick={next} aria-label="Next story">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.title}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
          >
            <Card className="rounded-3xl bg-card/80 backdrop-blur">
              <CardHeader>
                <p className="text-xs font-semibold text-muted-foreground">{current.date}</p>
                <CardTitle className="text-2xl">{current.title}</CardTitle>
                <CardDescription>{current.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-muted-foreground">
                    Carousel placeholder. Replace excerpts with real narratives and photos.
                  </div>
                  <div className="flex items-center gap-2 sm:hidden">
                    <Button variant="outline" size="icon" className="rounded-xl" onClick={prev} aria-label="Previous story">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-xl" onClick={next} aria-label="Next story">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-5 flex gap-2" aria-label="Story progress">
                  {stories.map((s, i) => (
                    <button
                      key={s.title}
                      onClick={() => setIndex(i)}
                      className={
                        "h-2 flex-1 rounded-full transition " +
                        (i === index ? "bg-primary" : "bg-muted")
                      }
                      aria-label={`Go to story ${i + 1}`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
