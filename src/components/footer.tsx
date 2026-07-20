import Link from "next/link";
import { Logo } from "./logo";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Robot Builder", href: "#platform" },
      { label: "Simulator", href: "#platform" },
      { label: "LoxOS", href: "#platform" },
      { label: "Compute", href: "#platform" },
      { label: "Marketplace", href: "#marketplace" },
    ],
  },
  {
    title: "Protocol",
    links: [
      { label: "$LOX Token", href: "#chain" },
      { label: "Litepaper", href: "#chain" },
      { label: "Governance", href: "#chain" },
      { label: "Roadmap", href: "#roadmap" },
      { label: "Audits", href: "#chain" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Discord", href: "https://discord.gg/loxley", external: true },
      { label: "X / Twitter", href: "https://x.com/loxleyrobotics", external: true },
      { label: "GitHub", href: "https://github.com/loxley-robotics", external: true },
      { label: "Creator Hub", href: "#marketplace" },
      { label: "Grants", href: "#cta" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel/30">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 py-16 md:grid-cols-5">
        <div className="col-span-2 flex flex-col gap-4">
          <Logo />
          <p className="max-w-[32ch] text-sm leading-relaxed text-fog">
            The people&apos;s robotics platform. Build, simulate, deploy and
            monetize robots on-chain.
          </p>
          <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-night px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
            <span className="h-1.5 w-1.5 rounded-full bg-lox" />
            Powered by Robinhood Chain
          </span>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-snow">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...("external" in link && link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="text-sm text-fog transition-colors hover:text-lox"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 font-mono text-[11px] uppercase tracking-[0.15em] text-fog sm:flex-row">
          <span>© 2026 Loxley Robotics</span>
          <span>Robotics for the many, not the few.</span>
        </div>
      </div>
    </footer>
  );
}
