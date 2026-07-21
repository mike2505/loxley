"use client";

import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { useWaitlist } from "./waitlist";
import { cn } from "@/lib/utils";

/* "/#x" instead of "#x" so links resolve from /docs too */
const LINKS = [
  { href: "/#platform", label: "Platform" },
  { href: "/#marketplace", label: "Marketplace" },
  { href: "/#chain", label: "Chain & $LOX" },
  { href: "/docs", label: "Docs" },
  { href: "/#roadmap", label: "Roadmap" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const waitlist = useWaitlist();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.21, 0.65, 0.32, 0.99] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl border px-5 py-3 transition-all duration-500",
          scrolled
            ? "border-line bg-night/80 backdrop-blur-xl shadow-[0_8px_40px_rgba(9,58,64,0.15)]"
            : "border-transparent bg-transparent"
        )}
      >
        <Link href="/" aria-label="Loxley home">
          <Logo />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-fog transition-colors hover:text-snow"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => waitlist.open()}
            className="group hidden items-center gap-1.5 rounded-xl bg-lox px-4 py-2 text-sm font-semibold text-night transition-all hover:bg-snow sm:flex"
          >
            Launch App
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
          <button
            className="text-snow md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-x-4 top-20 rounded-2xl border border-line bg-night/95 p-4 backdrop-blur-xl md:hidden"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-sm text-fog hover:bg-panel hover:text-snow"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                waitlist.open();
              }}
              className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl bg-lox px-4 py-3 text-sm font-semibold text-night"
            >
              Launch App
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
