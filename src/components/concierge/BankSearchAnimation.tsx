import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, CreditCard } from "lucide-react";
import { BankLogo } from "@/components/concierge/BankLogo";

/**
 * BankSearchAnimation — premium 4-phase AI bank scanner.
 * Phase 1: Scan (1.5s) — pulsing waves around card+search icon
 * Phase 2: Discover (1.6s) — bank logos orbit in
 * Phase 3: Filter (1.4s) — most logos fade out
 * Phase 4: Lock-in (0.8s) — top 3 highlighted, then onDone()
 */

const ALL_BANKS = ["BNP Paribas", "Société Générale", "Crédit Agricole", "LCL", "Boursorama", "Revolut", "N26"];
const TOP_3 = ["Revolut", "N26", "Société Générale"];

type Phase = "scan" | "discover" | "filter" | "lock";

export function BankSearchAnimation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<Phase>("scan");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("discover"), 1500);
    const t2 = setTimeout(() => setPhase("filter"), 3100);
    const t3 = setTimeout(() => setPhase("lock"), 4500);
    const t4 = setTimeout(() => onDone(), 5400);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, #1a1147 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #2a1a5e 0%, transparent 55%), linear-gradient(180deg, #0a0e3d 0%, #1a1147 100%)",
      }}
    >
      {/* Skip */}
      <button
        onClick={onDone}
        className="absolute top-6 right-6 text-white/50 text-[12px] font-ui font-semibold tracking-wider uppercase active:scale-95"
        style={{ paddingTop: "max(8px, env(safe-area-inset-top))" }}
      >
        Skip
      </button>

      <div className="relative w-[320px] h-[320px] flex items-center justify-center">
        {/* Pulsing waves — visible during scan + discover */}
        {(phase === "scan" || phase === "discover") &&
          [0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full border-2 border-lemon/50"
              style={{ width: 100, height: 100 }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 3], opacity: [0.55, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
            />
          ))}

        {/* Orbital banks — discover + filter */}
        <AnimatePresence>
          {(phase === "discover" || phase === "filter") &&
            ALL_BANKS.map((bank, i) => {
              const angle = (i / ALL_BANKS.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 130;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const survives = TOP_3.includes(bank);
              const fadeOut = phase === "filter" && !survives;
              return (
                <motion.div
                  key={bank}
                  className="absolute"
                  initial={{ opacity: 0, scale: 0.6, x: 0, y: 0, filter: "blur(10px)" }}
                  animate={{
                    opacity: fadeOut ? 0 : 1,
                    scale: fadeOut ? 0.4 : 1,
                    x: fadeOut ? x * 1.4 : x,
                    y: fadeOut ? y * 1.4 : y,
                    filter: "blur(0px)",
                  }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  >
                    <BankLogo bank={bank} size={46} />
                  </motion.div>
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* Center icon */}
        <AnimatePresence mode="wait">
          {phase !== "lock" && (
            <motion.div
              key="center"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="relative h-20 w-20 rounded-3xl bg-white flex items-center justify-center shadow-2xl"
              style={{ boxShadow: "0 0 40px rgba(248,255,161,0.6)" }}
            >
              <CreditCard size={36} className="text-[#1a1147]" strokeWidth={2.4} />
              <span className="absolute -bottom-1.5 -right-1.5 h-9 w-9 rounded-full bg-lemon flex items-center justify-center border-2 border-white">
                <Search size={16} className="text-black" strokeWidth={3} />
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lock-in: top 3 row */}
        <AnimatePresence>
          {phase === "lock" && (
            <motion.div
              className="absolute flex items-center gap-5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {TOP_3.map((bank, i) => (
                <motion.div
                  key={bank}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 280 }}
                  style={{ filter: "drop-shadow(0 0 18px rgba(248,255,161,0.7))" }}
                >
                  <BankLogo bank={bank} size={64} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text */}
      <div className="mt-12 text-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-white text-[22px] font-display font-bold tracking-[-0.5px]">
              {phase === "scan" && "Recherche…"}
              {phase === "discover" && "Discovering banks"}
              {phase === "filter" && "Filtering for you"}
              {phase === "lock" && "Your top 3"}
            </h2>
            <p className="mt-2 text-white/60 text-[14px] font-body">
              {phase === "scan" && "Nous analysons les meilleures options pour vous"}
              {phase === "discover" && "Scanning every French bank…"}
              {phase === "filter" && "Matching your profile and goals"}
              {phase === "lock" && "Tap below to compare"}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
