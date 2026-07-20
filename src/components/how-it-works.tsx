"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

/* keeps scroll-driven values on the JS path (WAAPI scroll timelines mis-map
   container-target progress) and adds a pleasing lag to the crossfades */
const SPRING = { stiffness: 260, damping: 34, mass: 0.6 };
import { Hammer, FlaskConical, Send, Coins, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const STEPS: {
  icon: LucideIcon;
  num: string;
  title: string;
  body: string;
  detail: string;
}[] = [
  {
    icon: Hammer,
    num: "01",
    title: "Build",
    body: "Design your robot from open hardware and community skills on the visual canvas.",
    detail: "wren_scout.chassis + lidar_v3 + nav_skill → compiled",
  },
  {
    icon: FlaskConical,
    num: "02",
    title: "Simulate",
    body: "Train and validate in the physics sim until behavior is provably safe.",
    detail: "sim run: 1.2M steps · collision rate 0.00021 · PASS",
  },
  {
    icon: Send,
    num: "03",
    title: "Deploy",
    body: "Ship signed builds over the air to real machines — one unit or a fleet.",
    detail: "OTA rollout 64/64 units healthy · manifest signed on-chain",
  },
  {
    icon: Coins,
    num: "04",
    title: "Earn",
    body: "Every reuse of your work pays you in $LOX. Royalties settle instantly on-chain.",
    detail: "royalty event: +4.2 LOX → @you · block #8,401,223",
  },
];

const N = STEPS.length;

/* one full-screen step panel inside the pinned scene */
function StepPanel({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const start = index / N;
  const end = (index + 1) / N;
  const fade = 0.35 / N;

  /* WAAPI scroll offsets must be strictly increasing — no duplicate points,
     so the first/last panels get 3-point windows instead of 4 */
  const opacity = useSpring(
    useTransform(
      progress,
      index === 0
        ? [start, end - fade, end]
        : index === N - 1
          ? [start, start + fade, end]
          : [start, start + fade, end - fade, end],
      index === 0 ? [1, 1, 0] : index === N - 1 ? [0, 1, 1] : [0, 1, 1, 0]
    ),
    SPRING
  );
  const y = useSpring(
    useTransform(progress, [start, start + fade, end - fade, end], [60, 0, 0, -60]),
    SPRING
  );
  const scale = useSpring(
    useTransform(progress, [start, start + fade, end - fade, end], [0.96, 1, 1, 0.96]),
    SPRING
  );

  const step = STEPS[index];
  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center text-center"
    >
      <span className="font-mono text-[12px] tracking-[0.4em] text-lox">{step.num}</span>
      <div className="my-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-line bg-panel text-lox shadow-[0_0_50px_rgba(77,255,143,0.15)]">
        <step.icon className="h-9 w-9" />
      </div>
      <h3 className="font-display text-5xl font-medium tracking-tight text-snow sm:text-7xl">
        {step.title}
      </h3>
      <p className="mt-5 max-w-md text-base leading-relaxed text-fog sm:text-lg">{step.body}</p>
      <div className="mt-8 rounded-xl border border-line bg-night/70 px-5 py-3 font-mono text-[11px] text-lox/80 backdrop-blur">
        {step.detail}
      </div>
    </motion.div>
  );
}

/* rail item that lights up while its step is active */
function RailItem({
  progress,
  index,
}: {
  progress: MotionValue<number>;
  index: number;
}) {
  const start = index / N;
  const end = (index + 1) / N;
  const active = useSpring(
    useTransform(
      progress,
      index === 0
        ? [start, end, end + 0.02]
        : index === N - 1
          ? [start - 0.02, start, end]
          : [start - 0.02, start, end, end + 0.02],
      index === 0
        ? [1, 1, 0.35]
        : index === N - 1
          ? [0.35, 1, 1]
          : [0.35, 1, 1, 0.35]
    ),
    SPRING
  );

  return (
    <motion.div style={{ opacity: active }} className="flex items-center gap-3">
      <span className="font-mono text-[11px] tracking-[0.2em] text-lox">{STEPS[index].num}</span>
      <span className="hidden font-display text-sm text-snow md:block">{STEPS[index].title}</span>
    </motion.div>
  );
}

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    /* 4 steps × 100vh of scroll distance, scene pinned the whole way */
    <div ref={ref} className="relative h-[400vh]">
      <section className="sticky top-0 flex h-screen flex-col items-center overflow-hidden">
        {/* backdrop */}
        <div className="hero-grid absolute inset-0 opacity-40" aria-hidden />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(77,255,143,0.08), transparent 70%)",
          }}
        />

        <div className="z-10 mt-24 flex flex-col items-center gap-3 px-4 text-center">
          <span className="inline-flex items-center rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-lox">
            How it works
          </span>
          <h2 className="font-display text-3xl font-medium tracking-tight text-snow sm:text-4xl">
            From idea to income.
          </h2>
        </div>

        {/* pinned step panels */}
        <div className="relative z-10 w-full max-w-3xl flex-1 px-4">
          {STEPS.map((_, i) => (
            <StepPanel key={i} progress={scrollYProgress} index={i} />
          ))}
        </div>

        {/* bottom rail: step markers + progress line */}
        <div className="z-10 mb-10 w-full max-w-3xl px-4">
          <div className={cn("mb-4 flex items-center justify-between")}>
            {STEPS.map((_, i) => (
              <RailItem key={i} progress={scrollYProgress} index={i} />
            ))}
          </div>
          <div className="h-px w-full overflow-hidden bg-line">
            <motion.div
              style={{ scaleX: railScale }}
              className="h-full origin-left bg-gradient-to-r from-lox-dim to-lox"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
