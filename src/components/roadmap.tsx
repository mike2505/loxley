"use client";

import { motion } from "motion/react";
import { Reveal, SectionHeader } from "./primitives";
import { FloatingDrone } from "./floating-drone";
import { cn } from "@/lib/utils";

const MILESTONES = [
  {
    quarter: "Q3 2026",
    title: "Marketplace beta",
    body: "Robot & skill marketplace live on Robinhood Chain testnet. First royalty settlements.",
    status: "live" as const,
  },
  {
    quarter: "Q4 2026",
    title: "LoxOS 1.0 + Compute mainnet",
    body: "Stable robot OS release, decentralized GPU network opens to contributors, $LOX generation event.",
    status: "next" as const,
  },
  {
    quarter: "Q1 2027",
    title: "No-code Builder",
    body: "Visual robot canvas for everyone — drag hardware, drop skills, deploy to sim instantly.",
    status: "planned" as const,
  },
  {
    quarter: "Q2 2027",
    title: "Fleet staking & attestation",
    body: "Stake $LOX to secure fleet identity, on-chain safety attestations for physical deployments.",
    status: "planned" as const,
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="relative mx-auto max-w-4xl scroll-mt-28 px-4 py-28">
      <FloatingDrone className="-left-52 top-32 hidden xl:block" distance={220} flip size={130} />
      <SectionHeader
        eyebrow="Roadmap"
        title="The path through the forest."
      />

      <div className="relative">
        {/* animated spine */}
        <motion.div
          aria-hidden
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-lox via-line to-line sm:left-1/2"
        />

        <div className="space-y-12">
          {MILESTONES.map((m, i) => (
            <Reveal key={m.quarter} delay={i * 0.1}>
              <div
                className={cn(
                  "relative flex flex-col gap-3 pl-10 sm:w-1/2 sm:pl-0",
                  i % 2 === 0
                    ? "sm:pr-12 sm:text-right"
                    : "sm:ml-auto sm:pl-12"
                )}
              >
                {/* node */}
                <span
                  className={cn(
                    "absolute top-1.5 left-0 h-[15px] w-[15px] rounded-full border-2",
                    i % 2 === 0
                      ? "sm:left-auto sm:-right-[8px]"
                      : "sm:-left-[7px]",
                    m.status === "live"
                      ? "border-lox bg-lox shadow-[0_0_16px_rgba(77,255,143,0.6)] animate-pulse-dot"
                      : m.status === "next"
                        ? "border-lox bg-night"
                        : "border-line bg-panel"
                  )}
                />
                <span
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.22em]",
                    m.status === "planned" ? "text-fog" : "text-lox"
                  )}
                >
                  {m.quarter}
                  {m.status === "live" && " — live"}
                </span>
                <h3 className="font-display text-xl font-medium text-snow">
                  {m.title}
                </h3>
                <p className="text-sm leading-relaxed text-fog">{m.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
