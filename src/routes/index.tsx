import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Cleo } from "@/components/concierge/Cleo";
import { CButton } from "@/components/concierge/CButton";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: SplashScreen,
});

function SplashScreen() {
  const navigate = useNavigate();
  const onboarded = useApp((s) => s.onboarded);

  useEffect(() => {
    if (onboarded) {
      navigate({ to: "/home", replace: true });
    }
  }, [onboarded, navigate]);

  return (
    <div
      className="mobile-shell relative overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 70% at 50% 0%, #DDF1D6 0%, #EAF6E1 55%, #D5EEC7 100%)",
      }}
    >
      {/* Soft floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-jungle/15 blur-2xl"
          style={{
            width: 80 + i * 22,
            height: 80 + i * 22,
            top: `${8 + i * 14}%`,
            left: `${(i * 23) % 80}%`,
          }}
          animate={{
            y: [0, -16, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Soft hill silhouettes at the bottom */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full h-[42%] pointer-events-none"
        viewBox="0 0 430 400"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="hill1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A8DC93" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7BC65F" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="hill2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7BC65F" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4FA53A" stopOpacity="1" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          d="M0 230 Q80 170 170 200 T340 180 T430 200 L430 400 L0 400 Z"
          fill="url(#hill1)"
        />
        <motion.path
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          d="M0 320 Q90 260 200 290 T380 280 L430 290 L430 400 L0 400 Z"
          fill="url(#hill2)"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 2, delay: 0.6, ease: "easeInOut" }}
          d="M40 380 Q140 320 200 300 T320 250 T410 220"
          stroke="#FFD86B"
          strokeWidth="3"
          strokeDasharray="4 8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      <div className="relative z-10 flex flex-col items-center justify-between min-h-[100dvh] py-12 px-6">
        {/* Top brand */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-jungle to-forest flex items-center justify-center shadow-glow-jungle">
            <Sparkles size={16} className="text-porcelain" strokeWidth={2.4} />
          </div>
          <span className="text-forest font-display font-bold tracking-[3px] text-[11px] uppercase">
            Concierge
          </span>
        </motion.div>

        {/* Hero */}
        <div className="flex flex-col items-center justify-center gap-7 z-10 -mt-8">
          {/* Cleo with halo */}
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-jungle/30 blur-3xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              initial={{ y: -100, opacity: 0, scale: 0.4 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 130, damping: 14, delay: 0.4 }}
              className="relative"
            >
              <Cleo pose="waving" mood="happy" size={170} />
            </motion.div>

            {/* Orbiting dots */}
            {[0, 120, 240].map((deg, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-gold"
                style={{ transformOrigin: "0 0" }}
                animate={{
                  rotate: [deg, deg + 360],
                }}
                transition={{ duration: 12 + i * 2, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="h-2 w-2 rounded-full bg-gold shadow-glow-jungle"
                  style={{ transform: `translate(95px, -4px)` }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.3, type: "spring", stiffness: 300 }}
              className="inline-flex items-center gap-1.5 bg-white border border-jungle/30 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[2px] text-forest mb-4 shadow-soft"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-jungle animate-pulse" />
              Now welcoming France 🇫🇷
            </motion.div>
            <h1 className="text-ink text-[44px] font-display font-bold tracking-[-1.5px] leading-[0.95]">
              Your guide<br />
              <span className="bg-gradient-to-r from-forest via-jungle to-[#7A5A12] bg-clip-text text-transparent animate-gradient">
                to a new life.
              </span>
            </h1>
            <p className="mt-4 text-ink/65 text-[14px] font-medium max-w-[300px] mx-auto leading-relaxed">
              Banking, taxes, benefits — turned into a journey you'll actually love.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="w-full flex flex-col gap-3 max-w-sm z-10"
        >
          <Link to="/onboarding">
            <CButton size="lg">
              Begin the journey
              <ArrowRight size={18} strokeWidth={2.6} />
            </CButton>
          </Link>
          <button className="text-ink/65 text-[13px] font-semibold py-2 hover:text-ink transition-colors">
            I already have an account
          </button>
        </motion.div>
      </div>
    </div>
  );
}
