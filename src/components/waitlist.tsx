"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

/* "Launch App" opens this until the real app ships — an early-access
   email capture posting to /api/waitlist */

const WaitlistContext = createContext<{ open: () => void }>({ open: () => {} });

export const useWaitlist = () => useContext(WaitlistContext);

type Status = "idle" | "sending" | "done" | "error";

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!show) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShow(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [show]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  const close = () => {
    setShow(false);
    /* reset after the exit animation so the card doesn't flash */
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
    }, 300);
  };

  return (
    <WaitlistContext.Provider value={{ open: () => setShow(true) }}>
      {children}

      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-snow/25 px-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Join the waitlist"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.21, 0.65, 0.32, 0.99] }}
              className="relative w-full max-w-md rounded-3xl border border-line bg-panel p-8 shadow-[0_24px_80px_rgba(9,58,64,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-lg p-1.5 text-fog transition-colors hover:bg-night hover:text-snow"
              >
                <X className="h-4 w-4" />
              </button>

              {status === "done" ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lox/15 text-lox">
                    <Check className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-medium tracking-tight text-snow">
                    You&apos;re on the list.
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-fog">
                    Watch your inbox — invites go out in waves as the gates
                    open.
                  </p>
                </div>
              ) : (
                <>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-lox">
                    Early access
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-snow">
                    The app is almost out of the forest.
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fog">
                    LoxOS Builder is in closed beta. Leave your email and
                    we&apos;ll send your invite when the next wave ships.
                  </p>

                  <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@sherwood.dev"
                      className="w-full rounded-xl border border-line bg-night px-4 py-3 text-sm text-snow placeholder:text-fog/60 outline-none transition-colors focus:border-lox/50"
                    />
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group flex items-center justify-center gap-2 rounded-xl bg-lox px-6 py-3 text-sm font-semibold text-night transition-all hover:bg-snow disabled:opacity-60"
                    >
                      {status === "sending" ? "Joining…" : "Join the waitlist"}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    {status === "error" && (
                      <p className="text-center text-xs text-fog">
                        Something went wrong — try again in a moment.
                      </p>
                    )}
                  </form>

                  <p className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-fog/70">
                    No spam · Unsubscribe anytime
                  </p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WaitlistContext.Provider>
  );
}
