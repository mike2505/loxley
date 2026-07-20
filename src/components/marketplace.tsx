"use client";

import { ArrowUpRight, Download, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Parallax, Reveal, SectionHeader, TiltCard } from "./primitives";

/* per-column drift distances — middle column travels further = depth */
const COLUMN_DRIFT = [36, 90, 36];

type Robot = {
  name: string;
  category: string;
  creator: string;
  price: number;
  downloads: string;
  rating: number;
  img: string;
};

const ROBOTS: Robot[] = [
  { name: "WREN-2 Scout", category: "Aerial recon", creator: "@marian", price: 84, downloads: "12.1k", rating: 4.9, img: "/robots/wren.webp" },
  { name: "L-JOHN Heavy", category: "Warehouse haul", creator: "@littlejohn", price: 210, downloads: "8.4k", rating: 4.8, img: "/robots/ljohn.webp" },
  { name: "TUCK-9 Arm", category: "Manipulation", creator: "@tuck", price: 126, downloads: "20.3k", rating: 4.9, img: "/robots/tuck.webp" },
  { name: "SCARLET Rover", category: "Field survey", creator: "@scarlet", price: 95, downloads: "6.7k", rating: 4.7, img: "/robots/scarlet.webp" },
  { name: "MARIAN Assist", category: "Home robotics", creator: "@marian", price: 58, downloads: "31.8k", rating: 5.0, img: "/robots/marian.webp" },
  { name: "ALAN-A Cart", category: "Last-mile delivery", creator: "@alanadale", price: 149, downloads: "4.2k", rating: 4.6, img: "/robots/alan.webp" },
];

export function Marketplace() {
  return (
    <section id="marketplace" className="scroll-mt-28 border-y border-line bg-panel/30 py-28">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Marketplace"
          title={
            <>
              The robot store where
              <br />
              <span className="text-gradient">creators actually get paid.</span>
            </>
          }
          body="Fork a design, license a skill, or deploy a full robot. Every download routes royalties to its builders — enforced by Robinhood Chain, settled in $LOX."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ROBOTS.map((robot, i) => (
            <Parallax key={robot.name} distance={COLUMN_DRIFT[i % 3]}>
              <Reveal delay={(i % 3) * 0.08}>
              <TiltCard className="group h-full rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-lox/25">
                <div style={{ transform: "translateZ(30px)" }}>
                  <div className="relative h-44 overflow-hidden rounded-xl border border-line">
                    <Image
                      src={robot.img}
                      alt={`${robot.name} — ${robot.category} robot`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-panel/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-[0.2em] text-lox/70">
                      {robot.name.split(" ")[0]}.unit
                    </span>
                  </div>
                  <div className="mt-5 flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-lg font-medium text-snow">
                        {robot.name}
                      </h3>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-fog">
                        {robot.category} · by{" "}
                        <span className="text-lox">{robot.creator}</span>
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full border border-line bg-night px-2 py-1 font-mono text-[11px] text-snow">
                      <Star className="h-3 w-3 fill-lox text-lox" />
                      {robot.rating}
                    </span>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-fog">
                      <Download className="h-3.5 w-3.5" />
                      {robot.downloads}
                    </span>
                    <span className="font-display text-base font-semibold text-lox">
                      {robot.price} LOX
                    </span>
                  </div>
                </div>
              </TiltCard>
              </Reveal>
            </Parallax>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <Link
            href="/#cta"
            className="group flex items-center gap-2 rounded-xl border border-line bg-panel px-6 py-3 text-sm font-medium text-snow transition-colors hover:border-lox/30"
          >
            Browse all 3,180 models
            <ArrowUpRight className="h-4 w-4 text-lox transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
