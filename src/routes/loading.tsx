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
  const [reveal, setReveal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const lineInt = setInterval(() => setLine((l) => (l + 1) % LINES.length), 1200);
    const t1 = setTimeout(() => setReveal(true), 4000);
    const t2 = setTimeout(() => navigate({ to: "/home", replace: true }), 4400);
    return () => {
      clearInterval(lineInt);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [navigate]);

  return (
    <div className="mobile-shell flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Coral reveal flash */}
      <AnimatePresence>
        {reveal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-coral z-50"
          />
        )}
      </AnimatePresence>

      <div className="relative w-44 h-44 flex items-center justify-center">
        {/* Orbiting dots */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute h-2 w-2 rounded-full bg-coral"
            animate={{ rotate: 360 }}
            transition={{ duration: 4 - i * 0.6, repeat: Infinity, ease: "linear" }}
            style={{
              transformOrigin: "center",
              top: "50%",
              left: "50%",
              translateX: 60 + i * 6,
              translateY: -4,
            }}
          />
        ))}
        <Cleo pose="thinking" size={100} />
      </div>

      <h2 className="text-white text-[24px] font-bold mt-6">Building your path...</h2>

      <div className="mt-3 h-6 relative w-full max-w-xs flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={line}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.4 }}
            className="text-silver text-[13px] absolute"
          >
            {LINES[line]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 w-full max-w-xs h-1.5 bg-slate-blue rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-coral"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
