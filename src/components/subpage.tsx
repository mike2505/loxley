import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Reveal, SectionHeader } from "./primitives";

export interface SubpageProps {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  /** mono factoids rendered as a stat strip under the header */
  facts?: [string, string][];
  features: { icon: LucideIcon; title: string; body: string }[];
  /** optional terminal-style panel under the features */
  terminal?: { title: string; lines: string[] };
  cta?: { title: string; body: string; href: string; label: string };
}

/* shared layout for product / protocol subpages */
export function Subpage({
  eyebrow,
  title,
  lead,
  facts,
  features,
  terminal,
  cta,
}: SubpageProps) {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-36">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-lox">
            {eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-medium leading-[1.06] tracking-tight text-snow sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-fog sm:text-lg">
            {lead}
          </p>
        </Reveal>

        {facts && (
          <Reveal delay={0.1}>
            <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
              {facts.map(([value, label]) => (
                <div key={label} className="flex flex-col gap-1 bg-panel px-5 py-5">
                  <span className="font-display text-2xl font-semibold text-snow">
                    {value}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-lox/25">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-night text-lox">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-medium text-snow">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-fog">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {terminal && (
          <Reveal delay={0.15}>
            <div className="mt-16 overflow-hidden rounded-2xl border border-line bg-night">
              <div className="flex items-center gap-2 border-b border-line bg-panel px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-lox/50" />
                <span className="ml-3 font-mono text-[11px] text-fog">{terminal.title}</span>
              </div>
              <div className="space-y-1.5 px-5 py-5 font-mono text-[12.5px] leading-relaxed">
                {terminal.lines.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.startsWith("$") || line.startsWith(">")
                        ? "text-snow"
                        : line.includes("✓") || line.includes("PASS")
                          ? "text-lox"
                          : "text-fog"
                    }
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}

        {cta && (
          <Reveal delay={0.1}>
            <div className="mt-20 flex flex-col items-start justify-between gap-6 rounded-3xl border border-lox/20 bg-panel/60 px-8 py-10 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-display text-2xl font-medium tracking-tight text-snow">
                  {cta.title}
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-fog">{cta.body}</p>
              </div>
              <Link
                href={cta.href}
                className="group flex shrink-0 items-center gap-2 rounded-xl bg-lox px-6 py-3.5 text-sm font-semibold text-night transition-all hover:bg-snow"
              >
                {cta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        )}
      </main>
      <Footer />
    </>
  );
}

export { SectionHeader };
