# Loxley — Open Robotics on Robinhood Chain

> Robotics for the many, not the few.

Landing site for **Loxley Robotics** — an open platform to build, simulate,
deploy and monetize robots, with every model, skill and dataset owned on-chain
via **Robinhood Chain** (`$LOX`).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Motion](https://motion.dev) (framer-motion v12) for animation
- [lucide-react](https://lucide.dev) icons
- Space Grotesk + Geist / Geist Mono via `next/font`

## Development

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm lint
```

## Structure

```
src/
  app/
    layout.tsx        # fonts, metadata
    page.tsx          # section assembly
    globals.css       # design tokens, keyframes (dark Sherwood-green theme)
    icon.svg          # arrowhead favicon
  components/
    primitives.tsx    # Reveal, WordReveal, Counter, GlowCard, TiltCard, SectionHeader
    navbar.tsx  hero.tsx  ticker.tsx  bento.tsx  how-it-works.tsx
    marketplace.tsx  chain.tsx  roadmap.tsx  cta.tsx  footer.tsx  logo.tsx
  lib/utils.ts        # cn()
```

## Design tokens

Defined in `globals.css` (`@theme inline`): `night` (bg), `panel`, `line`
(borders), `fog` (muted text), `snow` (text), `lox` (mint accent),
`lox-dim`, `lox-deep`.
