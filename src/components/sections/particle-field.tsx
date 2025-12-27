"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

export function ParticleField({ className }: { className?: string }) {
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (reduceMotion) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.2,
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
      a: 0.25 + Math.random() * 0.35,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.clientWidth * dpr);
      canvas.height = Math.floor(canvas.clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x * canvas.clientWidth, p.y * canvas.clientHeight, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduceMotion]);

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
    />
  );
}
