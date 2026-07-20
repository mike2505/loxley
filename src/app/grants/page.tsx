import type { Metadata } from "next";
import {
  Coins,
  Compass,
  GraduationCap,
  HeartHandshake,
  Rocket,
  Wrench,
} from "lucide-react";
import { Subpage } from "@/components/subpage";

export const metadata: Metadata = {
  title: "Grants — Loxley",
  description:
    "Treasury-funded grants for open hardware, skills, datasets and tooling that make robotics more accessible.",
};

export default function GrantsPage() {
  return (
    <Subpage
      eyebrow="Community · Grants"
      title={
        <>
          Good ideas shouldn&apos;t wait
          <br />
          <span className="text-gradient">for a rich uncle.</span>
        </>
      }
      lead="The grants program funds work that makes robotics more open: reference hardware, foundational skills, public datasets and tooling. Funded by the treasury, decided by governance, paid in $LOX with milestone-based tranches."
      facts={[
        ["1.8M", "$LOX granted to date"],
        ["112", "projects funded"],
        ["73%", "shipped to registry"],
        ["2 weeks", "median decision time"],
      ]}
      features={[
        {
          icon: Wrench,
          title: "Open hardware",
          body: "Reference chassis, grippers and sensor mounts published under open licenses. If your design lowers the cost of a capable robot, the treasury wants it built.",
        },
        {
          icon: Compass,
          title: "Foundational skills",
          body: "Navigation, manipulation and perception skills released to the registry with permissive royalty splits — infrastructure the whole ecosystem forks from.",
        },
        {
          icon: GraduationCap,
          title: "Learning tracks",
          body: "Courses, workshops and university robotics clubs. The next 10,000 builders need on-ramps, and we pay people to build them.",
        },
        {
          icon: Rocket,
          title: "Fast grants",
          body: "Under 25k $LOX? A rolling committee decides in two weeks, no governance vote needed. Momentum matters more than ceremony at small sizes.",
        },
        {
          icon: Coins,
          title: "Milestone tranches",
          body: "Funds release per shipped milestone, verified against the registry — a published component, a passing sim suite, a merged tool. Ship, unlock, repeat.",
        },
        {
          icon: HeartHandshake,
          title: "No equity, no strings",
          body: "Grants are not investments. You keep your IP, your royalties and your roadmap — the only ask is that funded work lands open in the registry.",
        },
      ]}
      terminal={{
        title: "grants — recent awards",
        lines: [
          "$ lox grants list --recent",
          "GR-108 · open gripper v2 (force-feedback) · 40,000 LOX · milestone 2/3",
          "GR-109 · sidewalk-winter sim dataset · 18,000 LOX · shipped ✓",
          "GR-111 · university lab starter kit · 60,000 LOX · milestone 1/4",
          "GR-112 · lox-ros2 bridge · 22,000 LOX · under review",
        ],
      }}
      cta={{
        title: "Apply in an afternoon.",
        body: "One page: what you're building, why it should be open, what it costs. Fast grants decide in two weeks.",
        href: "/#cta",
        label: "Apply for a grant",
      }}
    />
  );
}
