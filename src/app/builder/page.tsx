import type { Metadata } from "next";
import {
  Boxes,
  GitFork,
  Layers,
  Puzzle,
  Share2,
  Workflow,
} from "lucide-react";
import { Subpage } from "@/components/subpage";

export const metadata: Metadata = {
  title: "Robot Builder — Loxley",
  description:
    "Design robots on a visual canvas from open hardware and community skills. Every component versioned and owned on-chain.",
};

export default function BuilderPage() {
  return (
    <Subpage
      eyebrow="Platform · Robot Builder"
      title={
        <>
          Design robots like you
          <br />
          <span className="text-gradient">compose software.</span>
        </>
      }
      lead="The Builder is a visual canvas where a robot is a component graph: chassis, actuators, sensors, skills and datasets — each one a versioned, on-chain asset with its own authors. Drag, wire, compile."
      facts={[
        ["3,180", "published models"],
        ["11,900", "reusable components"],
        ["96%", "builds reuse ≥1 community part"],
        ["<10s", "graph compile time"],
      ]}
      features={[
        {
          icon: Boxes,
          title: "Component graph",
          body: "Robots are recipes, not monoliths. Reference any registry component by semver range — wren_scout.chassis@2.1.0, nav_skill@^4 — and the Builder resolves the graph.",
        },
        {
          icon: Puzzle,
          title: "Typed sockets",
          body: "Mechanical, power and data interfaces are typed. A LiDAR that speaks lox.pointcloud/2 only mounts where it fits — incompatibilities surface at design time, not on the bench.",
        },
        {
          icon: GitFork,
          title: "Fork anything",
          body: "One click forks any public model into your namespace. The upstream royalty split rides along on the lineage, so original authors earn from your improvements.",
        },
        {
          icon: Layers,
          title: "Versioned everything",
          body: "Every save is a content-hashed manifest. Roll back, diff two revisions, or pin a fleet to an exact build — the registry remembers all of it.",
        },
        {
          icon: Workflow,
          title: "Compile to manifest",
          body: "Compiling produces a signed build manifest — the same artifact the simulator validates and LoxOS units verify before flashing. One graph, one truth.",
        },
        {
          icon: Share2,
          title: "Publish in place",
          body: "When it's ready, publish straight from the canvas: set a price in $LOX, define the royalty split, and the model is live on the marketplace in one block.",
        },
      ]}
      terminal={{
        title: "loxley build — wren-2-nightowl",
        lines: [
          "$ lox build wren-2-nightowl",
          "resolving graph… 14 components, 3 with updates available",
          "wren_scout.chassis@2.1.0 ✓   lidar_v3@1.4.2 ✓   nav_skill@4.1.0 ✓",
          "compiling manifest… sha256:9f41…c2aa",
          "anchored on Robinhood Chain · block #8,401,551 ✓",
        ],
      }}
      cta={{
        title: "Start with the SDK.",
        body: "Everything the canvas does is also an API. Publish your first model from TypeScript in about twenty lines.",
        href: "/docs",
        label: "Read the docs",
      }}
    />
  );
}
