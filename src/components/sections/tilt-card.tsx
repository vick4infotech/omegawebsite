"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export function TiltCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [rotate, setRotate] = React.useState({ rx: 0, ry: 0 });

  function onMove(e: React.MouseEvent) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) * 10;
    const rx = -(py - 0.5) * 10;
    setRotate({ rx, ry });
  }

  function reset() {
    setRotate({ rx: 0, ry: 0 });
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={reduceMotion ? undefined : { transformStyle: "preserve-3d" }}
      animate={reduceMotion ? undefined : { rotateX: rotate.rx, rotateY: rotate.ry }}
      transition={{ type: "spring", stiffness: 180, damping: 18, mass: 0.6 }}
      className={cn("will-change-transform", className)}
    >
      <div className="relative" style={reduceMotion ? undefined : { transform: "translateZ(0px)" }}>
        {children}
      </div>
    </motion.div>
  );
}
