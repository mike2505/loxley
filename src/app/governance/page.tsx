import type { Metadata } from "next";
import {
  FileCheck,
  GitPullRequest,
  Scale,
  Shield,
  Users,
  Vote,
} from "lucide-react";
import { Subpage } from "@/components/subpage";

export const metadata: Metadata = {
  title: "Governance — Loxley",
  description:
    "Registry standards, safety gates and treasury spend are decided by the people who build on Loxley — one proposal at a time.",
};

export default function GovernancePage() {
  return (
    <Subpage
      eyebrow="Protocol · Governance"
      title={
        <>
          The platform is a commons.
          <br />
          <span className="text-gradient">Run it like one.</span>
        </>
      }
      lead="Interface standards, sim gate defaults, marketplace fees and treasury grants are governed by Loxley Improvement Proposals (LIPs). Voting power comes from staked $LOX plus creator reputation — builders steer, not just bagholders."
      facts={[
        ["14", "LIPs passed"],
        ["31%", "avg turnout"],
        ["7 days", "voting window"],
        ["2.4M", "$LOX staked to vote"],
      ]}
      features={[
        {
          icon: GitPullRequest,
          title: "LIP process",
          body: "Proposals start as pull requests against the standards repo — socket types, telemetry schemas, gate defaults. Discussion happens in the open, on the diff.",
        },
        {
          icon: Vote,
          title: "Stake + reputation",
          body: "Voting weight is staked $LOX multiplied by creator reputation. Shipping models that pass sim and earn licenses raises your weight more than buying tokens does.",
        },
        {
          icon: Scale,
          title: "Fee switch",
          body: "The marketplace fee (currently 2.5%) and its split between treasury and compute subsidies are governance-set parameters, revisited quarterly.",
        },
        {
          icon: Shield,
          title: "Safety floor",
          body: "Sim gate minimums can be raised by simple majority but only lowered by supermajority plus a security council sign-off. Safety ratchets one way.",
        },
        {
          icon: Users,
          title: "Delegation",
          body: "Delegate your weight to reviewers you trust — per-domain, revocable any time. Hardware people vote hardware; policy people vote policy.",
        },
        {
          icon: FileCheck,
          title: "On-chain execution",
          body: "Passed proposals execute automatically: parameter changes, treasury transfers and standard registrations land on Robinhood Chain without a multisig middleman.",
        },
      ]}
      terminal={{
        title: "governance — LIP-15",
        lines: [
          "$ lox gov show LIP-15",
          'title: "Adopt lox.pointcloud/3 as default LiDAR schema"',
          "status: voting · ends in 2d 14h",
          "for 1,102,884 LOX (68%) · against 371,020 LOX (23%) · abstain 9%",
          "quorum ✓ · executes at block #8,600,000 if passed",
        ],
      }}
      cta={{
        title: "Have a standard to propose?",
        body: "Open a LIP as a pull request and bring it to a vote. The template takes ten minutes.",
        href: "https://github.com/LoxleyRobotics/loxley-sdk",
        label: "Open a proposal",
      }}
    />
  );
}
