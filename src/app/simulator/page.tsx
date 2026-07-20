import type { Metadata } from "next";
import {
  FlaskConical,
  Gauge,
  GitCompare,
  Repeat,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { Subpage } from "@/components/subpage";

export const metadata: Metadata = {
  title: "Simulator — Loxley",
  description:
    "Validate robot behavior in physics simulation before it touches hardware. Million-step runs, collision gates, deterministic replays.",
};

export default function SimulatorPage() {
  return (
    <Subpage
      eyebrow="Platform · Simulator"
      title={
        <>
          If it hasn&apos;t passed sim,
          <br />
          <span className="text-gradient">it doesn&apos;t ship.</span>
        </>
      }
      lead="The Simulator runs your build manifest through million-step physics scenarios with hard pass/fail gates. A model that hasn't passed cannot be deployed — safety is enforced by the platform, not by policy documents."
      facts={[
        ["1.2M", "steps per standard run"],
        ["0.00021", "median collision rate"],
        ["40+", "scenario presets"],
        ["100%", "deploys sim-gated"],
      ]}
      features={[
        {
          icon: FlaskConical,
          title: "Scenario presets",
          body: "warehouse-dense-v2, sidewalk-crowd, home-kitchen, field-mud — battle-tested environments with parameterized difficulty, or bring your own scene.",
        },
        {
          icon: ShieldCheck,
          title: "Hard gates",
          body: "Set maxCollisionRate and the run fails above it. Gates are recorded with the result, so a PASS means something specific — not a vibe.",
        },
        {
          icon: Repeat,
          title: "Deterministic seeds",
          body: "Every run is seeded. Reproduce a failure exactly, bisect a regression between two manifest versions, replay the same crowd crossing a thousand times.",
        },
        {
          icon: Timer,
          title: "CI-friendly",
          body: "createRun + waitForRun from the SDK blocks your pipeline until a terminal state. Red build if the robot can't behave. Green if it provably can.",
        },
        {
          icon: Gauge,
          title: "Faster than realtime",
          body: "Runs execute at up to 400× realtime on the compute network. A million steps of warehouse traffic finishes before your coffee does.",
        },
        {
          icon: GitCompare,
          title: "Result diffing",
          body: "Compare two runs side by side — collision heatmaps, intervention counts, energy budgets. See exactly what your last commit did to behavior.",
        },
      ]}
      terminal={{
        title: "sim run — warehouse-dense-v2",
        lines: [
          "$ lox sim run --model wren-2-nightowl --scenario warehouse-dense-v2 --steps 1200000",
          "queued → running · seed 42",
          "steps 400,000 · collisions 0 · interventions 0",
          "steps 800,000 · collisions 1 · rate 0.00013",
          "steps 1,200,000 · rate 0.00021 < gate 0.001",
          "PASS ✓ · report: loxley.work/runs/9f41c2aa",
        ],
      }}
      cta={{
        title: "Gate your first deploy.",
        body: "Wire the simulator into CI with three SDK calls and never ship an unvalidated build again.",
        href: "/docs",
        label: "Read the docs",
      }}
    />
  );
}
