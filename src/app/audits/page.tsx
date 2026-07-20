import type { Metadata } from "next";
import {
  Bug,
  FileSearch,
  KeyRound,
  Lock,
  ShieldCheck,
  Siren,
} from "lucide-react";
import { Subpage } from "@/components/subpage";

export const metadata: Metadata = {
  title: "Audits & Security — Loxley",
  description:
    "Security posture of the Loxley platform: independent audits, signed builds, sandboxed skills and a live bug bounty.",
};

export default function AuditsPage() {
  return (
    <Subpage
      eyebrow="Protocol · Audits & Security"
      title={
        <>
          Robots in the real world.
          <br />
          <span className="text-gradient">Paranoia in the stack.</span>
        </>
      }
      lead="Machines that move around people don't get to have a casual security story. Every layer of Loxley — chain contracts, OTA pipeline, on-robot runtime — is independently audited, and the findings are public."
      facts={[
        ["4", "independent audits"],
        ["0", "criticals open"],
        ["250k", "$LOX max bounty"],
        ["100%", "reports published"],
      ]}
      features={[
        {
          icon: FileSearch,
          title: "Published reports",
          body: "Settlement contracts (Q1), OTA pipeline (Q2), LoxOS boot chain (Q2) and the royalty splitter (Q3) — every report is public in full, including what we got wrong.",
        },
        {
          icon: KeyRound,
          title: "Double-signed builds",
          body: "Author signature plus on-chain anchor, verified on-device before flashing. There is no code path that flashes an unverified manifest — we removed it, then audited the removal.",
        },
        {
          icon: Lock,
          title: "Capability sandboxes",
          body: "Third-party skills run capability-scoped: sensor reads in, actuation intents out, nothing else. Escapes are bounty-class events, and so far the record is clean.",
        },
        {
          icon: Bug,
          title: "Live bug bounty",
          body: "Up to 250,000 $LOX for critical findings in the settlement path or the OTA chain. Scope, rules and past payouts are public. security@loxley.work.",
        },
        {
          icon: ShieldCheck,
          title: "Sim as a safety layer",
          body: "Security review covers behavior too: adversarial scenarios — sensor spoofing, crowd surges, GPS denial — ship as first-class sim presets every quarter.",
        },
        {
          icon: Siren,
          title: "Incident policy",
          body: "Kill-switch rollouts propagate to a full fleet inside one wave cycle. Post-mortems publish within 14 days, named and dated. No silent patches.",
        },
      ]}
      terminal={{
        title: "security — audit ledger",
        lines: [
          "$ lox security audits",
          "2026-Q1 · settlement contracts · Trailhead Labs · 0 crit / 2 med (fixed) ✓",
          "2026-Q2 · OTA pipeline · Nightfall Security · 1 crit (fixed in 48h) ✓",
          "2026-Q2 · LoxOS boot chain · Nightfall Security · 0 crit / 1 low ✓",
          "2026-Q3 · royalty splitter · Trailhead Labs · 0 findings ✓",
        ],
      }}
      cta={{
        title: "Found something?",
        body: "Report it through the bounty program — critical findings in the settlement or OTA path pay up to 250k $LOX.",
        href: "/#cta",
        label: "security@loxley.work",
      }}
    />
  );
}
