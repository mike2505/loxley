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

    /* Lenis' `anchors` option only binds `href="#x"` links; ours are "/#x"
       (so they resolve from /docs too). When already on the homepage, drive
       those through Lenis ourselves — otherwise the native hash jump is
       immediately overridden by Lenis' rAF loop and the click does nothing. */
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.('a[href^="/#"]');
      if (!a || window.location.pathname !== "/") return;
      const el = document.getElementById(a.getAttribute("href")!.slice(2));
      if (!el) return;
      e.preventDefault();
      history.pushState(null, "", `#${el.id}`);
      lenis.scrollTo(el, { offset: -96 });
    };
    document.addEventListener("click", onClick);

    let raf: number;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-lox-dim via-lox to-lox shadow-[0_0_12px_rgba(10,162,178,0.8)]"
      />
      {children}
    </>
  );
}
