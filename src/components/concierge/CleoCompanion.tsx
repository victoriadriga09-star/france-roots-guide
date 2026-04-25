import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import { Cleo } from "./Cleo";
import { X } from "lucide-react";

/**
 * CleoCompanion — a small animated Cleo that lives in the bottom-right
 * corner of every screen, gently bobbing. Tapping it surfaces a contextual
 * tip bubble. Hidden on splash, onboarding, and loading screens.
 */
const TIPS_BY_ROUTE: Record<string, string[]> = {
  "/home": [
    "Tap a glowing node to continue your quest! ✨",
    "Streaks unlock bonus XP — come back daily 🔥",
    "Each section opens after the boss before it 👑",
  ],
  "/dashboard": [
    "Hidden benefits could add €1,200/year — let's claim them 💰",
    "Tap a card to see exactly where the money goes 📊",
  ],
  "/deadlines": [
    "Red = urgent. Green = chill. I'll nudge you in time ⏰",
    "Mark a quest done and earn instant XP ⚡",
  ],
  "/profile": [
    "Level up by completing quests! Each level unlocks new tools 🎯",
  ],
  "/level/banking": [
    "Neobanks open in 10 minutes — perfect first move 🏦",
    "Pick what fits YOU, not just what's popular 💡",
  ],
  "/level/taxes": [
    "First year? Paper declaration. Welcome to French tradition 📜",
    "I'll remind you weeks before the deadline — promise ✋",
  ],
  "/level/benefits": [
    "Most newcomers miss CAF — that alone is €200/mo 🏠",
    "Eligibility is rarely all-or-nothing. Always worth a check ✅",
  ],
};

const HIDE_ON = new Set(["/", "/onboarding", "/loading"]);

export function CleoCompanion() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tips = TIPS_BY_ROUTE[pathname] ?? TIPS_BY_ROUTE["/home"];
  const hidden = HIDE_ON.has(pathname);

  // Auto-pop a friendly tip 6s after entering a route, only once per route.
  useEffect(() => {
    if (hidden) return;
    setOpen(false);
    setTipIndex(0);
    idleTimer.current && clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setOpen(true), 6000);
    return () => {
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [pathname, hidden]);

  if (hidden) return null;

  const handleTap = () => {
    if (open) {
      setTipIndex((i) => (i + 1) % tips.length);
    } else {
      setOpen(true);
    }
  };

  return (
    <div
      className="fixed z-30 pointer-events-none"
      style={{
        bottom: "calc(96px + env(safe-area-inset-bottom, 0px))",
        right: "max(12px, calc((100vw - 430px) / 2 + 12px))",
      }}
    >
      <div className="relative pointer-events-auto">
        <AnimatePresence>
          {open && (
            <motion.div
              key={`tip-${pathname}-${tipIndex}`}
              initial={{ opacity: 0, y: 6, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-[64px] right-0 w-[230px]"
            >
              <div className="relative bg-white rounded-[18px] px-3.5 py-3 border border-ink-black/8 shadow-soft">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute -top-2 -left-2 h-6 w-6 rounded-full bg-ink-black text-porcelain flex items-center justify-center shadow-soft active:scale-95"
                  aria-label="Dismiss"
                >
                  <X size={12} strokeWidth={2.6} />
                </button>
                <p className="text-ink text-[12.5px] font-semibold leading-snug">
                  {tips[tipIndex]}
                </p>
                <span
                  className="absolute -bottom-1.5 right-7 w-3 h-3 rotate-45 bg-white border-r border-b border-ink-black/8"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={handleTap}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -4, 0] }}
          transition={{
            y: { duration: 2.6, repeat: Infinity, ease: "easeInOut" },
          }}
          className="relative h-14 w-14 rounded-full bg-white border border-ink-black/10 flex items-center justify-center"
          style={{
            boxShadow:
              "0 1px 0 rgba(255,255,255,0.9) inset, 0 8px 18px -6px rgba(36,130,50,0.35), 0 4px 10px -2px rgba(4,15,15,0.10)",
          }}
          aria-label="Open Cleo tips"
        >
          <span className="absolute inset-0 rounded-full bg-jungle/15 animate-pulse-ring pointer-events-none" />
          <div className="scale-[0.62]">
            <Cleo pose="waving" mood="happy" size={64} animated />
          </div>
        </motion.button>
      </div>
    </div>
  );
}
