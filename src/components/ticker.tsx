import { cn } from "@/lib/utils";

const EVENTS = [
  "ROBOT MINTED — WREN-2 #3181",
  "SKILL TRAINED — grasp_v9",
  "4.2 LOX ROYALTY → @marian",
  "FLEET DEPLOY — 64 UNITS",
  "SIM RUN — 1.2M STEPS",
  "MODEL FORKED — TUCK-9",
  "COMPUTE LEASED — 8×H200",
  "DATASET LICENSED — sherwood_nav",
  "GOVERNANCE — LIP-14 PASSED",
  "17.8 LOX ROYALTY → @scarlet",
];

/* infinite on-chain event tape — duplicated list + CSS keyframe marquee */
export function Ticker({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-line bg-panel/40 py-3",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night to-transparent" />
      <div className="flex w-max animate-marquee gap-10">
        {[...EVENTS, ...EVENTS].map((event, i) => (
          <span
            key={i}
            className="flex items-center gap-3 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.15em] text-fog"
          >
            <span className="h-1 w-1 rounded-full bg-lox/70" />
            {event}
          </span>
        ))}
      </div>
    </div>
  );
}
