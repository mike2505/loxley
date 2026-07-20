"use client";

import { motion } from "motion/react";
import { Layers, ShieldCheck, Vote, Zap } from "lucide-react";
import { Counter, GlowCard, ParallaxOrb, Reveal, SectionHeader } from "./primitives";

const CHAIN_STATS = [
  { value: 0.001, prefix: "<$", decimals: 3, label: "avg. transaction fee" },
  { value: 250, suffix: "ms", label: "block time" },
  { value: 100, suffix: "%", label: "royalties enforced" },
];

const UTILITIES = [
  { icon: Zap, title: "Pay for compute", body: "Lease GPU time on the Loxley Compute network." },
  { icon: Layers, title: "Marketplace currency", body: "Buy, license and fork robots, skills and datasets." },
  { icon: ShieldCheck, title: "Stake for fleets", body: "Secure fleet attestations and earn protocol fees." },
  { icon: Vote, title: "Govern the protocol", body: "Vote on LIPs — from fee splits to sim standards." },
];

const DISTRIBUTION = [
  { label: "Community & builders", pct: 40 },
  { label: "Creator rewards fund", pct: 25 },
  { label: "Core team (4y vest)", pct: 15 },
  { label: "Treasury", pct: 12 },
  { label: "Liquidity", pct: 8 },
];

export function Chain() {
  return (
    <section id="chain" className="relative mx-auto max-w-6xl scroll-mt-28 px-4 py-28">
      <ParallaxOrb className="-right-40 top-10 h-96 w-96" distance={120} />
      <SectionHeader
        eyebrow="Chain & Token"
        title={
          <>
            Built on <span className="text-gradient">Robinhood Chain.</span>
          </>
        }
        body="A high-throughput L2 built for real-world assets. Loxley uses it as the settlement layer for robot identity, IP provenance and creator royalties."
      />

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* left: chain stats + utilities */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-4">
            {CHAIN_STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-1 rounded-2xl border border-line bg-panel p-5">
                  <Counter
                    to={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    decimals={stat.decimals}
                    className="font-display text-xl font-semibold text-lox sm:text-2xl"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-fog">
                    {stat.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {UTILITIES.map((util, i) => (
              <Reveal key={util.title} delay={0.1 + i * 0.06}>
                <GlowCard className="h-full p-5">
                  <util.icon className="mb-3 h-5 w-5 text-lox" />
                  <h4 className="font-display text-sm font-medium text-snow">
                    {util.title}
                  </h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-fog">
                    {util.body}
                  </p>
                </GlowCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* right: $LOX distribution */}
        <Reveal delay={0.15}>
          <GlowCard className="h-full p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="font-display text-2xl font-medium text-snow">
                  $LOX
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-fog">
                  Fixed supply · 1,000,000,000
                </p>
              </div>
              <span className="rounded-full border border-lox/30 bg-lox-deep px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-lox">
                ERC-20 · Robinhood Chain
              </span>
            </div>

            <div className="space-y-5">
              {DISTRIBUTION.map((slice, i) => (
                <div key={slice.label}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-fog">{slice.label}</span>
                    <span className="font-mono text-snow">{slice.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-line">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${slice.pct}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + i * 0.1,
                        ease: [0.21, 0.65, 0.32, 0.99],
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-lox-dim to-lox"
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-8 border-t border-line pt-5 text-[13px] leading-relaxed text-fog">
              No pre-mine games. 65% of supply flows to the people building,
              training and sharing robots — released by protocol activity, not
              by calendar.
            </p>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}
