import type { Metadata } from "next";
import {
  BadgeCheck,
  Coins,
  GitFork,
  LineChart,
  Megaphone,
  Split,
} from "lucide-react";
import { Subpage } from "@/components/subpage";

export const metadata: Metadata = {
  title: "Creator Hub — Loxley",
  description:
    "Everything for people who publish on Loxley: royalty tooling, fork lineage, analytics and promotion.",
};

export default function CreatorsPage() {
  return (
    <Subpage
      eyebrow="Community · Creator Hub"
      title={
        <>
          You build the robots.
          <br />
          <span className="text-gradient">You keep the upside.</span>
        </>
      }
      lead="The Creator Hub is home base for the 2,300 people publishing on Loxley: live royalty dashboards, split management, fork lineage maps and the tools that turn a good component into an income stream."
      facts={[
        ["$530K", "paid to creators"],
        ["2,300", "active creators"],
        ["3.2k", "top model downloads"],
        ["0.25s", "royalty settlement"],
      ]}
      features={[
        {
          icon: Coins,
          title: "Live royalty feed",
          body: "Every license event streams to your dashboard the block it settles. Watch a marketplace feature spike your earnings in real time — no monthly statements.",
        },
        {
          icon: Split,
          title: "Split management",
          body: "Royalty splits are basis points on-chain: co-authors, data providers, your lab. Change takes effect next license event; history stays auditable forever.",
        },
        {
          icon: GitFork,
          title: "Lineage maps",
          body: "See every fork of your work and what it earns you. Upstream royalties mean a popular derivative is good news, not theft — the map shows exactly how good.",
        },
        {
          icon: LineChart,
          title: "Model analytics",
          body: "Downloads, conversion, sim pass rates of forks, fleet deployment counts. Know whether to cut price, ship a v3 or spin off the nav stack as its own skill.",
        },
        {
          icon: BadgeCheck,
          title: "Verified builder",
          body: "Pass a review of one shipped model and get the verified mark — higher marketplace ranking, governance reputation weight and access to partner hardware programs.",
        },
        {
          icon: Megaphone,
          title: "Featured slots",
          body: "Weekly marketplace features are picked from creator submissions, not ad budgets. A great launch post and a passing sim suite beat a marketing team.",
        },
      ]}
      terminal={{
        title: "creator — royalty stream",
        lines: [
          "$ lox royalties stream lox1aron…f2",
          "+4.20 LOX · wren-2-scout · license · block #8,401,223",
          "+1.26 LOX · wren-2-scout · fork royalty (nightowl) · #8,401,290",
          "+8.40 LOX · wren-2-scout · fleet license ×2 · #8,401,377",
          "today: +214.80 LOX · 51 events",
        ],
      }}
      cta={{
        title: "Publish your first model.",
        body: "From component graph to marketplace listing in an afternoon — the docs walk you through the whole loop.",
        href: "/docs",
        label: "Start publishing",
      }}
    />
  );
}
