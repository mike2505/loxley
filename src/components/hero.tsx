"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, type MouseEvent } from "react";
import { Counter, WordReveal } from "./primitives";

const STATS = [
  { value: 12400, suffix: "+", label: "builders on-chain" },
  { value: 3180, suffix: "", label: "robot models published" },
  { value: 24, prefix: "$", suffix: "M", label: "paid out to creators" },
  { value: 0.25, suffix: "s", decimals: 2, label: "block time" },
];

/* lucide dropped brand icons — inline GitHub mark */
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 2.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

/* deterministic particle field — module-level so SSR and client agree */
const PARTICLES = Array.from({ length: 16 }, (_, i) => ({
  left: `${(i * 137.5) % 100}%`,
  top: `${20 + ((i * 61) % 62)}%`,
  size: 1 + (i % 3),
  duration: 7 + (i % 5) * 2.2,
  delay: (i * 0.9) % 6,
}));

/**
 * Cinematic product-reveal hero. Depth stack (back → front):
 *  1. stage environment    — slowest scroll drift, inverse mouse
 *  2. LOXLEY watermark     — outline type behind the machine
 *  3. reveal glows         — radial light behind each robot
 *  4. robots + reflections — flanking left/right, mid scroll speed, follow mouse
 *  5. dust particles       — ambient drift
 *  6. headline content     — centered, subtle inverse mouse, fades on scroll exit
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  /* scroll-linked depth */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const robotY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const robot2Y = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const contentY = useTransform(scrollYProgress, [0, 0.7], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const sceneOpacity = useTransform(scrollYProgress, [0.55, 1], [1, 0.25]);

  /* mouse-linked depth: -0.5..0.5 per axis, spring-smoothed */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const smy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });

  const stageMX = useTransform(smx, (v) => v * -16);
  const stageMY = useTransform(smy, (v) => v * -8);
  const markMX = useTransform(smx, (v) => v * 12);
  const robotMX = useTransform(smx, (v) => v * 32);
  const robotMY = useTransform(smy, (v) => v * 14);
  const robot2MX = useTransform(smx, (v) => v * 22);
  const robot2MY = useTransform(smy, (v) => v * 10);
  const contentMX = useTransform(smx, (v) => v * -10);
  const contentMY = useTransform(smy, (v) => v * -6);

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    mx.set(e.clientX / window.innerWidth - 0.5);
    my.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <>
      <section
        ref={ref}
        onMouseMove={onMouseMove}
        className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden"
      >
        {/* 1 — stage environment */}
        <motion.div
          style={{ y: stageY, opacity: sceneOpacity }}
          className="absolute inset-0 will-change-transform"
          aria-hidden
        >
          <motion.div style={{ x: stageMX, y: stageMY }} className="absolute -inset-[3%]">
            <Image
              src="/layers/stage.webp"
              alt=""
              fill
              priority
              sizes="110vw"
              className="object-cover"
            />
          </motion.div>
          {/* blend the plate into the page */}
          <div className="absolute inset-0 bg-gradient-to-b from-night/60 via-transparent to-night" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/70 via-night/10 to-night/50" />

        </motion.div>

        {/* 2 — watermark type behind the machine */}
        <motion.div
          style={{ y: markY, x: markMX, opacity: sceneOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[10%] flex select-none justify-center will-change-transform"
          aria-hidden
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "-0.02em" }}
            transition={{ duration: 1.6, delay: 0.2, ease: [0.21, 0.65, 0.32, 0.99] }}
            className="font-display text-[clamp(110px,20vw,320px)] font-semibold leading-none text-transparent"
            style={{ WebkitTextStroke: "1.5px rgba(233,242,236,0.08)" }}
          >
            LOXLEY
          </motion.span>
        </motion.div>

        {/* 3 — reveal glows behind the robots */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[8%] right-[2%] h-[60vh] w-[46vw] opacity-70 blur-3xl md:right-[4%]"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 60% 65%, rgba(77,255,143,0.12), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[8%] left-[2%] hidden h-[56vh] w-[40vw] opacity-60 blur-3xl md:left-[4%] md:block"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 40% 65%, rgba(77,255,143,0.10), transparent 70%)",
          }}
        />

        {/* 4a — left robot + floor reflection (desktop only) */}
        <motion.div
          style={{ y: robot2Y, opacity: sceneOpacity }}
          className="absolute inset-0 hidden will-change-transform md:block"
          aria-hidden
        >
          <motion.div
            style={{ x: robot2MX, y: robot2MY }}
            className="absolute bottom-[9%] left-[7%] h-[62vh] w-[21vh] lg:left-[11%]"
          >
            <motion.div
              className="relative h-full w-full"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.65, ease: [0.21, 0.65, 0.32, 0.99] }}
            >
              <Image
                src="/layers/robot2.webp"
                alt=""
                fill
                priority
                sizes="21vh"
                className="object-contain object-bottom"
              />

              {/* polished-floor reflection */}
              <div
                className="absolute left-0 top-full h-[26%] w-full overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 75%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 75%)",
                }}
              >
                <div className="relative h-[380%] w-full -scale-y-100">
                  <Image
                    src="/layers/robot2.webp"
                    alt=""
                    fill
                    sizes="21vh"
                    className="object-contain object-bottom blur-[3px]"
                  />
                </div>
              </div>

              {/* contact glow at the feet */}
              <div
                className="absolute -bottom-1 left-1/2 h-6 w-[85%] -translate-x-1/2 rounded-[100%] blur-lg"
                style={{ background: "rgba(77,255,143,0.12)" }}
              />
              <div className="absolute -bottom-2 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/70 blur-xl" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 4 — robot + floor reflection */}
        <motion.div
          style={{ y: robotY, opacity: sceneOpacity }}
          className="absolute inset-0 will-change-transform"
          aria-hidden
        >
          <motion.div
            style={{ x: robotMX, y: robotMY }}
            className="absolute bottom-[9%] right-[6%] h-[66vh] w-[28vh] max-w-[70vw] opacity-30 md:right-[12%] md:opacity-100"
          >
            {/* entrance lives on an inner wrapper so the responsive
                opacity classes above aren't overridden by inline styles */}
            <motion.div
              className="relative h-full w-full"
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.21, 0.65, 0.32, 0.99] }}
            >
              <Image
                src="/layers/robot.webp"
                alt=""
                fill
                priority
                sizes="(max-width: 768px) 70vw, 28vh"
                className="object-contain object-bottom"
              />

              {/* polished-floor reflection */}
              <div
                className="absolute left-0 top-full h-[26%] w-full overflow-hidden"
                style={{
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 75%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 75%)",
                }}
              >
                <div className="relative h-[380%] w-full -scale-y-100">
                  <Image
                    src="/layers/robot.webp"
                    alt=""
                    fill
                    sizes="(max-width: 768px) 70vw, 28vh"
                    className="object-contain object-bottom blur-[3px]"
                  />
                </div>
              </div>

              {/* contact glow at the feet */}
              <div
                className="absolute -bottom-1 left-1/2 h-6 w-[85%] -translate-x-1/2 rounded-[100%] blur-lg"
                style={{ background: "rgba(77,255,143,0.14)" }}
              />
              <div className="absolute -bottom-2 left-1/2 h-8 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/70 blur-xl" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* 5 — dust particles */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-lox/40"
              style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
              animate={{ y: [0, -70], opacity: [0, 0.7, 0] }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* 6 — headline content */}
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto w-full max-w-6xl px-4"
        >
          <motion.div
            style={{ x: contentMX, y: contentMY }}
            className="mx-auto flex max-w-2xl flex-col items-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center gap-2.5 rounded-full border border-line bg-panel/80 px-4 py-2 backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-lox animate-pulse-dot" />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-fog">
                Live on <span className="text-lox">Robinhood Chain</span>
              </span>
            </motion.div>

            <h1 className="font-display text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              <WordReveal text="Robotics for the" delay={0.15} />
              <br />
              {/* background-clip:text can't paint through transformed children,
                  so the gradient line animates as a single element */}
              <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em]">
                <motion.span
                  className="text-gradient inline-block will-change-transform"
                  initial={{ y: "110%", rotate: 2 }}
                  animate={{ y: 0, rotate: 0 }}
                  transition={{ duration: 0.9, delay: 0.5, ease: [0.21, 0.65, 0.32, 0.99] }}
                >
                  many, not the few.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0 }}
              className="mt-7 max-w-xl text-base leading-relaxed text-fog sm:text-lg"
            >
              Loxley is the open platform to build, simulate, deploy and
              monetize robots — with every model, skill and dataset owned
              on-chain. Powered by Robinhood Chain.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.15 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
            >
              <Link
                href="/#platform"
                className="group flex items-center gap-2 rounded-xl bg-lox px-7 py-3.5 text-sm font-semibold text-night shadow-[0_0_40px_rgba(77,255,143,0.25)] transition-all hover:bg-snow hover:shadow-[0_0_60px_rgba(77,255,143,0.4)]"
              >
                Start building
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="https://github.com/LoxleyRobotics/loxley-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-line bg-panel/60 px-7 py-3.5 text-sm font-medium text-snow backdrop-blur transition-colors hover:border-lox/30 hover:bg-panel"
              >
                <GithubIcon className="h-4 w-4 text-fog" />
                View on GitHub
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* vignette */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 120% 90% at 50% 45%, transparent 60%, rgba(6,9,7,0.55) 100%)",
          }}
        />

        {/* scroll hint */}
        <motion.div
          style={{ opacity: contentOpacity }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
          aria-hidden
        >
          <div className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1.5">
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-lox"
            />
          </div>
        </motion.div>
      </section>

      {/* stat strip — its own band right under the scene */}
      <div className="relative z-10 border-y border-line bg-panel/60 backdrop-blur">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 px-4 py-6">
              <Counter
                to={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
                className="font-display text-2xl font-semibold text-snow sm:text-3xl"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
