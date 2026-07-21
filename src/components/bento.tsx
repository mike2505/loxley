"use client";

import {
  Blocks,
  Boxes,
  Cpu,
  Fingerprint,
  Rocket,
  TerminalSquare,
} from "lucide-react";
import { GlowCard, ParallaxOrb, Reveal, SectionHeader } from "./primitives";
import { FloatingDrone } from "./floating-drone";
import { cn } from "@/lib/utils";

/* small decorative visuals ------------------------------------------------- */

function NodeGraph() {
  return (
    <svg viewBox="0 0 320 120" fill="none" className="h-full w-full" aria-hidden>
      <g stroke="#b4e0da" strokeWidth="1.5">
        <path d="M60 30 C110 30 110 60 160 60" />
        <path d="M60 90 C110 90 110 60 160 60" />
        <path d="M160 60 C210 60 210 40 260 40" />
        <path d="M160 60 C210 60 210 80 260 80" />
      </g>
      <g className="animate-pulse">
        <circle cx="60" cy="30" r="4" fill="#0aa2b2" />
        <circle cx="60" cy="90" r="4" fill="#077f8d" />
        <circle cx="160" cy="60" r="5" fill="#0aa2b2" />
        <circle cx="260" cy="40" r="4" fill="#077f8d" />
        <circle cx="260" cy="80" r="4" fill="#0aa2b2" />
      </g>
      <g fill="#40757b" fontFamily="monospace" fontSize="8">
        <text x="38" y="18">chassis</text>
        <text x="44" y="108">lidar_v3</text>
        <text x="142" y="46">controller</text>
        <text x="246" y="28">nav_skill</text>
        <text x="240" y="100">grasp_v9</text>
      </g>
    </svg>
  );
}

function TerminalLines() {
  const lines = [
    ["$", "lox deploy fleet --units 64"],
    ["✓", "manifest signed on-chain"],
    ["✓", "OTA rollout: 64/64 healthy"],
  ];
  return (
    <div className="space-y-1.5 font-mono text-[11px]">
      {lines.map(([sym, text], i) => (
        <div key={i} className="flex gap-2">
          <span className={sym === "$" ? "text-fog" : "text-lox"}>{sym}</span>
          <span className={sym === "$" ? "text-snow" : "text-fog"}>{text}</span>
        </div>
      ))}
      <span className="ml-4 inline-block h-3 w-1.5 animate-pulse bg-lox" />
    </div>
  );
}

function RoyaltySplit() {
  const rows = [
    { who: "@marian · model author", pct: 62 },
    { who: "@tuck · dataset", pct: 26 },
    { who: "protocol treasury", pct: 12 },
  ];
  return (
    <div className="space-y-2.5">
      {rows.map((row) => (
        <div key={row.who}>
          <div className="mb-1 flex justify-between font-mono text-[10px] uppercase tracking-wider text-fog">
            <span>{row.who}</span>
            <span className="text-lox">{row.pct}%</span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-line">
            <div
              className="h-full rounded-full bg-gradient-to-r from-lox-dim to-lox"
              style={{ width: `${row.pct}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SimScan() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-line bg-night/60">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(7,127,141,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(7,127,141,0.12) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute inset-x-0 h-1/3 animate-scan bg-gradient-to-b from-transparent via-lox/15 to-transparent" />
      <div className="absolute bottom-2 left-3 font-mono text-[10px] text-fog">
        physics: 1.2M steps/s
      </div>
    </div>
  );
}

/* the grid ------------------------------------------------------------------ */

const CARDS = [
  {
    icon: Blocks,
    title: "Visual Robot Builder",
    body: "Compose hardware, controllers and skills on a node canvas. No-code to full-code — export to LoxOS in one click.",
    className: "md:col-span-2",
    visual: (
      <div className="mt-6 h-32">
        <NodeGraph />
      </div>
    ),
  },
  {
    icon: Boxes,
    title: "Physics Simulator",
    body: "Train and stress-test in a high-fidelity simulator before a single motor spins.",
    className: "",
    visual: (
      <div className="mt-6 h-32">
        <SimScan />
      </div>
    ),
  },
  {
    icon: TerminalSquare,
    title: "LoxOS",
    body: "A lightweight, real-time robot operating system with deterministic scheduling and on-chain attestation baked in.",
    className: "",
    visual: (
      <div className="mt-6 rounded-lg border border-line bg-night/60 p-4">
        <TerminalLines />
      </div>
    ),
  },
  {
    icon: Fingerprint,
    title: "On-chain IP Registry",
    body: "Every model, skill and dataset is minted on Robinhood Chain. Provenance is permanent, royalties are enforced by the protocol — not by promises.",
    className: "md:col-span-2",
    visual: (
      <div className="mt-6">
        <RoyaltySplit />
      </div>
    ),
  },
  {
    icon: Rocket,
    title: "One-click Deploy",
    body: "Signed OTA rollouts to a single robot or a fleet of thousands, with automatic rollback.",
    className: "",
    visual: null,
  },
  {
    icon: Cpu,
    title: "Loxley Compute",
    body: "A decentralized GPU network for training. Pay in $LOX, or earn it by contributing idle compute.",
    className: "md:col-span-2",
    visual: null,
  },
];

export function Bento() {
  return (
    <section id="platform" className="relative mx-auto max-w-6xl scroll-mt-28 px-4 py-28">
      <ParallaxOrb className="-left-40 top-1/4 h-96 w-96" distance={140} />
      <ParallaxOrb className="-right-48 bottom-1/4 h-[28rem] w-[28rem]" distance={100} />
      <FloatingDrone className="-top-8 right-0 hidden lg:block" distance={200} size={150} />
      <SectionHeader
        eyebrow="The Platform"
        title={
          <>
            Everything robotics needs,
            <br />
            <span className="text-gradient">in one open stack.</span>
          </>
        }
        body="Building intelligent machines used to mean stitching together a dozen closed tools. Loxley unifies the whole loop — and puts ownership on-chain."
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {CARDS.map((card, i) => (
          <Reveal key={card.title} delay={(i % 3) * 0.08} className={card.className}>
            <GlowCard className={cn("group h-full p-7")}>
              <div className="mb-5 inline-flex rounded-xl border border-line bg-night p-2.5 text-lox transition-colors group-hover:border-lox/30">
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-medium text-snow">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">{card.body}</p>
              {card.visual}
            </GlowCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
