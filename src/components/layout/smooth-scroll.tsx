"use client";

import * as React from "react";
import Lenis from "lenis";
import { useReducedMotion } from "framer-motion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.0,
      smoothWheel: true,
      smoothTouch: false,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [reduceMotion]);

  return <>{children}</>;
}
