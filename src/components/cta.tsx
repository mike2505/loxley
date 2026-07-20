"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Reveal } from "./primitives";

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

  return (
    <section ref={ref} id="cta" className="scroll-mt-28 px-4 py-28">
      <Reveal className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-3xl border border-lox/20 px-6 py-24 text-center sm:px-16">
          {/* parallax keyart backdrop */}
          <motion.div
            style={{ y: bgY }}
            aria-hidden
            className="absolute -inset-y-[18%] inset-x-0 will-change-transform"
          >
            <Image
              src="/keyart.webp"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover opacity-60"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-night/80 via-night/40 to-night/90" aria-hidden />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <h2 className="font-display text-4xl font-medium tracking-tight text-snow sm:text-6xl">
              Build. Deploy. Own.
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-fog sm:text-lg">
              The robotics revolution won&apos;t be closed-source. Join 12,400
              builders taking it back — one robot at a time.
            </p>
            <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href="#platform"
                className="group flex items-center gap-2 rounded-xl bg-lox px-8 py-4 text-sm font-semibold text-night shadow-[0_0_50px_rgba(77,255,143,0.3)] transition-all hover:bg-snow"
              >
                Launch the app
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="https://github.com/LoxleyRobotics/loxley-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-line bg-night/60 px-8 py-4 text-sm font-medium text-snow backdrop-blur transition-colors hover:border-lox/30"
              >
                View on GitHub
              </Link>
            </div>
            <span className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
              Free to build · Pay only when you deploy
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
