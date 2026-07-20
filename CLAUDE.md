@AGENTS.md

# Loxley

Landing site for Loxley Robotics — open robotics platform on Robinhood Chain ($LOX).
Single-page site assembled in `src/app/page.tsx` from `src/components/*`.

- Design tokens live in `src/app/globals.css` (`@theme inline`): night/panel/line/fog/snow/lox. Use these, not raw hex.
- Shared animation primitives are in `src/components/primitives.tsx` (Reveal, WordReveal, Counter, GlowCard, TiltCard, SectionHeader) — reuse them for new sections.
- Naming theme: Robin Hood / Sherwood (robots named after Merry Men, e.g. WREN-2, TUCK-9, MARIAN).
- Package manager: pnpm. Verify with `pnpm build && pnpm lint`.
