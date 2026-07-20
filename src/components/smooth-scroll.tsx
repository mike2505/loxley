"use client";

import { motion, useScroll, useSpring } from "motion/react";
import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

/* Lenis buttery scrolling + top scroll-progress bar */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: { offset: -96 }, // clear the fixed navbar
    });

    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-lox-dim via-lox to-lox shadow-[0_0_12px_rgba(77,255,143,0.8)]"
      />
      {children}
    </>
  );
}
