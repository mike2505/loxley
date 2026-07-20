import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Docs — @loxley/sdk",
  description:
    "TypeScript SDK documentation for Loxley: publish robots, validate in sim, deploy OTA and stream $LOX royalties on Robinhood Chain.",
};

/* minimal syntax accents without a highlighter dependency */
function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-line bg-night px-5 py-4 font-mono text-[12.5px] leading-relaxed text-snow">
      {children}
    </pre>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-line py-10 last:border-b-0">
      <h2 className="font-display text-2xl font-medium tracking-tight text-snow">{title}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-fog">{children}</div>
    </section>
  );
}

const NAV = [
  ["install", "Installation"],
  ["quickstart", "Quickstart"],
  ["client", "LoxleyClient"],
  ["registry", "Registry"],
  ["marketplace", "Marketplace"],
  ["sim", "Simulation"],
  ["deploy", "Deploy"],
  ["royalties", "Royalties"],
  ["chain", "Chain RPC"],
  ["amounts", "$LOX amounts"],
  ["errors", "Errors"],
  ["networks", "Networks"],
] as const;

export default function DocsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-24 pt-32">
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-lox">
            SDK Docs
          </span>
          <span className="font-mono text-[11px] text-fog">v0.4.2</span>
        </div>
        <h1 className="font-display text-4xl font-medium tracking-tight text-snow sm:text-5xl">
          @loxley/sdk
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-fog">
          The official TypeScript SDK for Loxley. Publish robots to the on-chain
          registry, validate them in the physics sim, ship signed OTA rollouts
          and watch $LOX royalties settle in real time. Zero runtime
          dependencies, Node ≥ 18, MIT.{" "}
          <Link
            href="https://github.com/LoxleyRobotics/loxley-sdk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lox underline decoration-lox/40 underline-offset-4 hover:decoration-lox"
          >
            Source on GitHub ↗
          </Link>
        </p>

        <div className="mt-12 flex gap-12">
          {/* sidebar */}
          <nav className="sticky top-28 hidden h-fit w-48 shrink-0 lg:block" aria-label="Docs">
            <ul className="space-y-1 border-l border-line">
              {NAV.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="-ml-px block border-l border-transparent py-1 pl-4 font-mono text-[12px] text-fog transition-colors hover:border-lox hover:text-snow"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* content */}
          <div className="min-w-0 flex-1">
            <Section id="install" title="Installation">
              <Code>{`npm install @loxley/sdk    # pnpm add @loxley/sdk · bun add @loxley/sdk`}</Code>
              <p>
                Grab an API key from{" "}
                <span className="font-mono text-[13px] text-snow">
                  loxley.work/settings/keys
                </span>{" "}
                and export it as{" "}
                <span className="font-mono text-[13px] text-snow">LOXLEY_API_KEY</span>.
              </p>
            </Section>

            <Section id="quickstart" title="Quickstart">
              <p>The full platform loop — publish, simulate, deploy, earn:</p>
              <Code>{`import { LoxleyClient, parseLox, formatLox } from "@loxley/sdk";

const lox = new LoxleyClient({ apiKey: process.env.LOXLEY_API_KEY });

// 1 · publish — the manifest hash anchors on Robinhood Chain
const model = await lox.registry.publish({
  name: "wren-2-scout",
  category: "aerial-recon",
  version: "2.1.0",
  priceLox: parseLox("84"),
  components: [
    { ref: "wren_scout.chassis@2.1.0", kind: "chassis" },
    { ref: "lidar_v3@^1.4", kind: "sensor" },
    { ref: "nav_skill@^4", kind: "skill" },
  ],
});

// 2 · simulate until provably safe
const run = await lox.sim.createRun({
  modelId: model.id,
  scenario: "warehouse-dense-v2",
  steps: 1_200_000,
  maxCollisionRate: 0.001,
});
await lox.sim.waitForRun(run.id); // resolves on PASS

// 3 · deploy over the air, signed + staged
const manifest = await lox.deploy.signManifest(model.id);
await lox.deploy.createRollout({ manifest, fleet: "warehouse-eu-1" });

// 4 · earn — royalties settle in ~0.25s
for await (const ev of lox.royalties.streamEvents(model.owner)) {
  console.log(\`+\${formatLox(ev.amount)} from \${ev.modelId}\`);
}`}</Code>
            </Section>

            <Section id="client" title="LoxleyClient">
              <Code>{`const lox = new LoxleyClient({
  apiKey: "…",          // from loxley.work/settings/keys
  network: "mainnet",   // or "testnet"
  baseUrl: "…",         // optional: self-hosted gateway
  rpcUrl: "…",          // optional: your own chain node
});`}</Code>
              <p>
                Every module hangs off the client:{" "}
                <span className="font-mono text-[13px] text-snow">
                  registry · marketplace · sim · deploy · royalties · chain
                </span>
                . Requests retry on 429/5xx with exponential backoff.
              </p>
            </Section>

            <Section id="registry" title="Registry">
              <p>
                The on-chain source of truth for robot models. Content-hashed
                manifests, semantic versions, fork lineage.
              </p>
              <Code>{`await lox.registry.publish(input)        // compile graph + anchor manifest
await lox.registry.get("wren-2-scout")   // fetch a model record
await lox.registry.list({ category: "aerial-recon" })
await lox.registry.fork("wren-2-scout", "wren-2-nightowl")
await lox.registry.deprecate(id, "2.0.0") // yank from discovery`}</Code>
              <p>
                Forks preserve the upstream royalty split on the lineage —
                original authors keep earning from every derivative license.
              </p>
            </Section>

            <Section id="marketplace" title="Marketplace">
              <Code>{`const page = await lox.marketplace.list({ sort: "downloads" });
const listing = await lox.marketplace.get("wren-2-scout");

// settles $LOX on-chain, routes royalties, returns a signed artifact URL
const receipt = await lox.marketplace.license("wren-2-scout", { units: 4 });
receipt.artifactUrl; // valid for 15 minutes`}</Code>
            </Section>

            <Section id="sim" title="Simulation">
              <p>
                Physics validation with pass/fail gates. A model that has not
                passed sim cannot be deployed.
              </p>
              <Code>{`const run = await lox.sim.createRun({
  modelId,
  scenario: "warehouse-dense-v2",
  steps: 1_200_000,
  seed: 42,                 // deterministic replays
  maxCollisionRate: 0.001,  // fail the run above this
});

await lox.sim.waitForRun(run.id, {
  pollMs: 3_000,
  onProgress: (r) => console.log(r.status, r.stepsCompleted),
}); // → SimRun with status "passed" | "failed" | "cancelled"`}</Code>
            </Section>

            <Section id="deploy" title="Deploy">
              <p>
                Builds are signed twice: your account key signs the manifest,
                and the signature anchors on Robinhood Chain. Units verify the
                anchor before flashing.
              </p>
              <Code>{`const manifest = await lox.deploy.signManifest(modelId);

const rollout = await lox.deploy.createRollout({
  manifest,
  fleet: "warehouse-eu-1",
  waveSize: 0.25, // 4 staged waves
});

await lox.deploy.waitForRollout(rollout.id, {
  onProgress: (d) => console.log(d.status, \`\${d.unitsHealthy}/\${d.unitsTotal}\`),
}); // "healthy" | "degraded" | "aborted"

await lox.deploy.abortRollout(rollout.id); // one-call rollback`}</Code>
            </Section>

            <Section id="royalties" title="Royalties">
              <p>
                Splits are basis points and must sum to exactly 10,000. They are
                enforced by the chain on every license event.
              </p>
              <Code>{`await lox.royalties.getSplits(modelId);
await lox.royalties.setSplits(modelId, [
  { recipient: "lox1aron…", bps: 7_000 },
  { recipient: "lox1sensor…", bps: 3_000 },
]);

// historical payouts
await lox.royalties.listEvents("lox1aron…");

// live feed — long-polls under the hood
for await (const ev of lox.royalties.streamEvents("lox1aron…")) {
  console.log(\`+\${ev.amount} uLOX @ block \${ev.block}\`);
}`}</Code>
            </Section>

            <Section id="chain" title="Chain RPC">
              <Code>{`await lox.chain.blockHeight();
await lox.chain.balance("lox1aron…");          // bigint micro-LOX

const tx = await lox.chain.transfer(from, to, parseLox("4.20"));
await lox.chain.waitForTx(tx);                 // blocks are 0.25s — quick`}</Code>
              <p>
                <span className="font-mono text-[13px] text-snow">transfer()</span>{" "}
                checks the sender balance before broadcasting and throws{" "}
                <span className="font-mono text-[13px] text-snow">
                  InsufficientLoxError
                </span>{" "}
                client-side.
              </p>
            </Section>

            <Section id="amounts" title="$LOX amounts">
              <p>
                All amounts are integer micro-LOX as{" "}
                <span className="font-mono text-[13px] text-snow">bigint</span> —
                1 LOX = 1,000,000 uLOX. No floats, no rounding drift.
              </p>
              <Code>{`import { LOX, parseLox, formatLox } from "@loxley/sdk";

parseLox("4.20");     // 4200000n
formatLox(4200000n);  // "4.20 LOX"
LOX;                  // 1000000n`}</Code>
            </Section>

            <Section id="errors" title="Errors">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-line font-mono text-[11px] uppercase tracking-[0.15em] text-fog">
                      <th className="py-2 pr-6">Class</th>
                      <th className="py-2">Thrown when</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {[
                      ["ApiError", "non-2xx from the REST API (has .status, .code) — 429/5xx retried first"],
                      ["RpcError", "JSON-RPC error from a Robinhood Chain node"],
                      ["InsufficientLoxError", "balance can't cover a transfer — checked before broadcast"],
                      ["TimeoutError", "a waitFor* helper hit its deadline"],
                    ].map(([cls, when]) => (
                      <tr key={cls}>
                        <td className="py-2.5 pr-6 font-mono text-[12.5px] text-lox">{cls}</td>
                        <td className="py-2.5 text-fog">{when}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Everything extends{" "}
                <span className="font-mono text-[13px] text-snow">LoxleyError</span>.
              </p>
            </Section>

            <Section id="networks" title="Networks">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-[13.5px]">
                  <thead>
                    <tr className="border-b border-line font-mono text-[11px] uppercase tracking-[0.15em] text-fog">
                      <th className="py-2 pr-6">Network</th>
                      <th className="py-2 pr-6">REST</th>
                      <th className="py-2">RPC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line font-mono text-[12.5px]">
                    <tr>
                      <td className="py-2.5 pr-6 text-snow">mainnet</td>
                      <td className="py-2.5 pr-6 text-fog">api.loxley.work</td>
                      <td className="py-2.5 text-fog">rpc.robinhood.exchange</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-6 text-snow">testnet</td>
                      <td className="py-2.5 pr-6 text-fog">api.testnet.loxley.work</td>
                      <td className="py-2.5 text-fog">rpc.testnet.robinhood.exchange</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Code>{`const lox = new LoxleyClient({ network: "testnet" });`}</Code>
            </Section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
