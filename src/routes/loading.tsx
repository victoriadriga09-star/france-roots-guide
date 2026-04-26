import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Search, CreditCard } from "lucide-react";
import {
  IconBank,
  IconDocument,
  IconCalculator,
  IconGift,
  IconHome,
  IconHeartPulse,
  IconTrain,
} from "@/components/concierge/Icons";

export const Route = createFileRoute("/loading")({
  component: LoadingScreen,
});

type Phase = "scan" | "discover" | "filter" | "select";

const PHASE_TEXT: Record<Phase, { title: string; sub: string }> = {
  scan: { title: "Scanning…", sub: "We're reading the French system for you" },
  discover: { title: "Discovering", sub: "Mapping every step you need" },
  filter: { title: "Filtering", sub: "Picking what truly matters for you" },
  select: { title: "Building your map", sub: "Almost there — c'est presque prêt" },
};

const ORBIT_ICONS = [IconBank, IconDocument, IconCalculator, IconGift, IconHome, IconHeartPulse, IconTrain];

function LoadingScreen() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>("scan");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = 6500;
    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / total) * 100));
    }, 40);

    const t1 = setTimeout(() => setPhase("discover"), 1800);
    const t2 = setTimeout(() => setPhase("filter"), 3600);
    const t3 = setTimeout(() => setPhase("select"), 5000);
    const t4 = setTimeout(() => navigate({ to: "/home" }), 6500);

    return () => {
      clearInterval(tick);
      [t1, t2, t3, t4].forEach(clearTimeout);
    };
  }, [navigate]);

  return (
    <div
      className="mobile-shell relative overflow-hidden flex flex-col items-center justify-center px-6"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, #1a1147 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #2a1a5e 0%, transparent 55%), linear-gradient(180deg, #0a0e3d 0%, #1a1147 100%)",
      }}
    >
      {/* Drifting spotlights */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 420,
          height: 420,
          background: "radial-gradient(circle, rgba(168,163,248,0.18), transparent 70%)",
        }}
        animate={{ x: [-100, 100, -100], y: [-80, 80, -80] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: 360,
          height: 360,
          background: "radial-gradient(circle, rgba(248,255,161,0.10), transparent 70%)",
          right: -80,
          bottom: -40,
        }}
        animate={{ x: [0, -60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Center stage */}
      <div className="relative w-[300px] h-[300px] flex items-center justify-center">
        {/* Concentric pulse waves */}
        {(phase === "scan" || phase === "discover") &&
          [0, 1, 2, 3, 4].map((i) => (
            <motion.span
              key={i}
              className="absolute rounded-full border-2 border-lemon/45"
              style={{ width: 100, height: 100 }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 3], opacity: [0.55, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
            />
          ))}

        {/* Orbiting icons (discover & filter) */}
        <AnimatePresence>
          {(phase === "discover" || phase === "filter") &&
            ORBIT_ICONS.map((Icon, i) => {
              const angle = (i / ORBIT_ICONS.length) * Math.PI * 2 - Math.PI / 2;
              const r = 120;
              const x = Math.cos(angle) * r;
              const y = Math.sin(angle) * r;
              const survives = i < 4;
              const fade = phase === "filter" && !survives;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ opacity: 0, scale: 0.6, x: 0, y: 0, filter: "blur(10px)" }}
                  animate={{
                    opacity: fade ? 0 : 1,
                    scale: fade ? 0.4 : 1,
                    x: fade ? x * 1.4 : x,
                    y: fade ? y * 1.4 : y,
                    filter: "blur(0px)",
                  }}
                  transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className="h-12 w-12 rounded-2xl bg-white/8 border border-lemon/30 flex items-center justify-center text-lemon backdrop-blur-md"
                    style={{ boxShadow: "0 0 16px rgba(248,255,161,0.3)" }}
                  >
                    <Icon size={22} />
                  </motion.div>
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* Center icon */}
        <AnimatePresence mode="wait">
          {phase !== "select" ? (
            <motion.div
              key="center"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.3, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="relative h-20 w-20 rounded-3xl bg-white flex items-center justify-center"
              style={{ boxShadow: "0 0 40px rgba(248,255,161,0.55)" }}
            >
              <CreditCard size={36} className="text-[#1a1147]" strokeWidth={2.4} />
              <span className="absolute -bottom-1.5 -right-1.5 h-9 w-9 rounded-full bg-lemon flex items-center justify-center border-2 border-white">
                <Search size={16} className="text-black" strokeWidth={3} />
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="select"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 280 }}
              className="relative h-24 w-24 rounded-full bg-gradient-lemon flex items-center justify-center shadow-lemon-lg"
              style={{ boxShadow: "0 0 60px rgba(248,255,161,0.8)" }}
            >
              <motion.span
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-black text-[28px] font-display font-extrabold"
              >
                ✓
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phase text */}
      <div className="h-20 mt-6 flex flex-col items-center justify-start text-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-white text-[24px] font-display font-bold tracking-[-0.5px]">
              {PHASE_TEXT[phase].title}
            </h1>
            <p className="mt-1.5 text-white/60 text-[14px] font-body">
              {PHASE_TEXT[phase].sub}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress */}
      <div className="mt-4 w-full max-w-[260px] h-1 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className="h-full bg-lemon rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-white/40 text-[10px] font-ui font-bold uppercase tracking-[2px]">
        {Math.floor(progress)}%
      </p>
    </div>
  );
}
