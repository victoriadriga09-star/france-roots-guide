import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Cleo } from "@/components/concierge/Cleo";

export const Route = createFileRoute("/loading")({
  component: LoadingScreen,
});

const LINES = [
  "Analyzing your situation in France...",
  "Mapping your entitlements...",
  "Personalizing your quest journey...",
  "Almost ready...",
];

function LoadingScreen() {
  const [line, setLine] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const lineInt = setInterval(() => setLine((l) => (l + 1) % LINES.length), 1100);
    const t = setTimeout(() => navigate({ to: "/home", replace: true }), 4400);
    return () => {
      clearInterval(lineInt);
      clearTimeout(t);
    };
  }, [navigate]);

  return (
    <div
      className="mobile-shell flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #DDF1D6 0%, #EAF6E1 60%, #D5EEC7 100%)",
      }}
    >
      {/* Soft expanding rings */}
      {[0, 1, 2].map((i) => (
        <motion.span
          key={`ring-${i}`}
          className="absolute rounded-full border-2 border-jungle/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 2.6], opacity: [0.45, 0] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
          style={{ width: 160, height: 160 }}
        />
      ))}

      {/* Orbiting dots */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute h-2.5 w-2.5 rounded-full bg-forest"
            animate={{ rotate: 360 }}
            transition={{ duration: 4 - i * 0.6, repeat: Infinity, ease: "linear" }}
            style={{
              transformOrigin: "center",
              top: "50%",
              left: "50%",
              translateX: 70 + i * 8,
              translateY: -5,
            }}
          />
        ))}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-jungle/30 blur-2xl" />
          <Cleo pose="thinking" mood="focused" size={110} />
        </motion.div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-ink text-[24px] font-display font-bold mt-8 text-center"
      >
        Building your path...
      </motion.h2>

      <div className="mt-3 h-6 relative w-full max-w-xs flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="text-ink/65 text-[13px] absolute font-medium"
          >
            {LINES[line]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 w-full max-w-xs h-2 bg-white border border-ink-black/8 rounded-full overflow-hidden shadow-soft">
        <motion.div
          className="h-full bg-gradient-to-r from-jungle to-forest rounded-full relative"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "easeInOut" }}
        >
          <span className="absolute inset-x-0 top-0 h-1/2 bg-white/30 rounded-t-full" />
        </motion.div>
      </div>
    </div>
  );
}
