import type { Metadata } from "next";
import {
  Coins,
  Gauge,
  Globe,
  Recycle,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Subpage } from "@/components/subpage";

export const metadata: Metadata = {
  title: "Compute — Loxley",
  description:
    "The distributed GPU network behind Loxley simulation and training. Contribute capacity, earn $LOX.",
};

export default function ComputePage() {
  return (
    <Subpage
      eyebrow="Platform · Compute"
      title={
        <>
          The GPU network that
          <br />
          <span className="text-gradient">pays for itself.</span>
        </>
      }
      lead="Simulation and skill training run on a distributed compute network. Anyone can contribute GPU capacity and earn $LOX per verified work unit; builders get sim runs at a fraction of hyperscaler prices."
      facts={[
        ["620", "GPUs online"],
        ["400×", "peak sim speed vs realtime"],
        ["-72%", "cost vs hyperscalers"],
        ["19", "countries providing"],
      ]}
      features={[
        {
          icon: Server,
          title: "Bring your GPUs",
          body: "Run the provider agent on anything from a 4090 in a closet to a rack of H200s. Capacity is benchmarked, tiered and put to work within minutes.",
        },
        {
          icon: Coins,
          title: "Earn per work unit",
          body: "Sim steps and training epochs are metered as verifiable work units. Payouts settle in $LOX to your address every epoch — no invoices, no net-30.",
        },
        {
          icon: ShieldCheck,
          title: "Verified execution",
          body: "Work units are spot-checked by redundant execution. Providers that return wrong results lose stake and reputation; correct ones compound both.",
        },
        {
          icon: Gauge,
          title: "Burst scheduling",
          body: "A million-step run fans out across hundreds of providers and reassembles deterministically. Big validation sweeps finish in minutes, not nights.",
        },
        {
          icon: Globe,
          title: "Region pinning",
          body: "Keep regulated datasets in-region with residency constraints — the scheduler only places your work on providers that match the policy.",
        },
        {
          icon: Recycle,
          title: "Spot economics",
          body: "Idle capacity is cheap capacity. Deadline-flexible jobs bid on the spot tier and routinely clear at half the standard rate.",
        },
      ]}
      terminal={{
        title: "compute — provider earnings",
        lines: [
          "$ lox compute status",
          "provider lox1aron…f2 · tier A · 4× H100",
          "today: 3,940 work units · 99.98% verified",
          "epoch payout: +212.40 LOX ✓",
          "lifetime: 18,411 LOX · reputation 0.994",
        ],
      }}
      cta={{
        title: "Put your idle GPUs to work.",
        body: "Install the provider agent, stake, and start earning $LOX on capacity you already own.",
        href: "/#cta",
        label: "Join the network",
      }}
    />
  );
}
