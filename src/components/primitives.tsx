"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";
import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------- Reveal --------------------------------- */

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay, ease: [0.21, 0.65, 0.32, 0.99] },
  }),
};

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "span" | "p" | "h2" | "h3";
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      custom={delay}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------- Word reveal ------------------------------- */

export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={cn("inline-block", className)}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "110%", rotate: 4 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.08,
              ease: [0.21, 0.65, 0.32, 0.99],
            }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* --------------------------------- Counter --------------------------------- */

export function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: 1.8, bounce: 0 });
  const display = useTransform(spring, (v) =>
    `${prefix}${v.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`
  );

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}

/* -------------------------------- Glow card -------------------------------- */
/* mouse-follow radial glow; the gradient itself lives in globals.css */

export function GlowCard({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  const ref = useRef<HTMLDivElement>(null);

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn(
        "glow-card rounded-2xl border border-line bg-panel transition-colors duration-300 hover:border-lox/25",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -------------------------------- Tilt card -------------------------------- */

export function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 20 });
  const sry = useSpring(ry, { stiffness: 220, damping: 20 });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  function onMouseLeave() {
    rx.set(0);
    ry.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
      className={cn("glow-card [perspective:1000px]", className)}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------- Parallax -------------------------------- */
/* translates children vertically as the element crosses the viewport */

export function Parallax({
  children,
  distance = 80,
  className,
}: {
  children?: ReactNode;
  /** px travelled over the full crossing; negative = drifts up */
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/* soft glow orb used as a parallax accent between sections */
export function ParallaxOrb({
  className,
  distance = 120,
}: {
  className?: string;
  distance?: number;
}) {
  return (
    <Parallax
      distance={distance}
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        className
      )}
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(10,162,178,0.2), transparent 70%)",
        }}
      />
    </Parallax>
  );
}

/* ------------------------------ Section header ----------------------------- */

export function SectionHeader({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mb-14 flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left"
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-lox">
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="max-w-2xl font-display text-4xl font-medium tracking-tight text-snow sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.16}>
          <p className="max-w-xl text-base leading-relaxed text-fog">{body}</p>
        </Reveal>
      )}
    </div>
  );
}
