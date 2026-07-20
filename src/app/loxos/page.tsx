import type { Metadata } from "next";
import {
  Activity,
  Cpu,
  Lock,
  Radio,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import { Subpage } from "@/components/subpage";

export const metadata: Metadata = {
  title: "LoxOS — Loxley",
  description:
    "The runtime that robots trust: signed builds, on-chain verification, staged OTA rollouts and fleet telemetry.",
};

export default function LoxOSPage() {
  return (
    <Subpage
      eyebrow="Platform · LoxOS"
      title={
        <>
          The runtime that
          <br />
          <span className="text-gradient">verifies before it obeys.</span>
        </>
      }
      lead="LoxOS is the on-robot runtime. It boots signed builds, verifies every manifest against its Robinhood Chain anchor before flashing, and reports fleet health in real time. If the signature doesn't check out, the robot doesn't run it."
      facts={[
        ["2×", "signatures per build"],
        ["0.25s", "anchor verification"],
        ["64/64", "typical wave health"],
        ["1-call", "fleet rollback"],
      ]}
      features={[
        {
          icon: ShieldCheck,
          title: "Chain-verified boot",
          body: "Every build manifest is signed by its author and anchored on-chain. Units fetch the anchor and verify both before a single byte flashes. Supply-chain attacks bounce.",
        },
        {
          icon: Radio,
          title: "Staged OTA",
          body: "Rollouts ship in waves — 25% of the fleet at a time by default. Health checks gate each wave; a degraded wave halts the rollout automatically.",
        },
        {
          icon: RotateCcw,
          title: "Instant rollback",
          body: "abortRollout() is one call. Units revert to the last healthy manifest from their local A/B slot — no truck rolls, no bricked hardware.",
        },
        {
          icon: Cpu,
          title: "Skill sandboxing",
          body: "Community skills run in capability-scoped sandboxes. A navigation skill can read LiDAR; it cannot touch the payment keys or the OTA slot.",
        },
        {
          icon: Activity,
          title: "Fleet telemetry",
          body: "Heartbeats, task metrics and anomaly flags stream to your dashboard. unitsHealthy/unitsTotal isn't a guess — it's a live number you can query from the SDK.",
        },
        {
          icon: Lock,
          title: "Keys stay on-robot",
          body: "Unit identity keys live in the secure element and never leave the device. Signing happens locally; the chain only ever sees proofs.",
        },
      ]}
      terminal={{
        title: "loxos — ota status",
        lines: [
          "$ lox deploy status warehouse-eu-1",
          "manifest sha256:9f41…c2aa · anchor block #8,401,551 ✓",
          "wave 1/4 · 16/16 healthy ✓",
          "wave 2/4 · 16/16 healthy ✓",
          "wave 3/4 · rolling · 11/16 flashed",
          "fleet: 43/64 on 2.2.0 · 0 degraded",
        ],
      }}
      cta={{
        title: "Ship your first rollout.",
        body: "Sign a manifest and stage it across a fleet with two SDK calls. Abort is always one call away.",
        href: "/docs",
        label: "Read the docs",
      }}
    />
  );
}
