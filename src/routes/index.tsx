import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
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
    <div className="mobile-shell bg-clouds flex flex-col items-center justify-between py-12 px-6">
      {/* Floating decorative shapes */}
      <motion.div
        className="absolute top-20 left-6 text-3xl"
        animate={{ y: [0, -10, 0], rotate: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        ✨
      </motion.div>
      <motion.div
        className="absolute top-32 right-8 text-2xl"
        animate={{ y: [0, 8, 0], rotate: [10, -10, 10] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
      >
        🥐
      </motion.div>
      <motion.div
        className="absolute bottom-44 left-8 text-2xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      >
        🗼
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 z-10">
        <motion.div
          initial={{ y: -200, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 140, damping: 12, delay: 0.3 }}
        >
          <Cleo pose="waving" mood="happy" size={150} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-block bg-pop-yellow border-2 border-ink rounded-full px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-ink mb-3 shadow-[0_3px_0_rgba(31,34,54,0.85)]">
            🇫🇷 New in France?
          </div>
          <h1 className="text-ink text-[42px] font-extrabold tracking-[-1px] leading-none">
            Concierge
          </h1>
          <p className="mt-3 text-ink/80 text-[15px] font-bold max-w-[280px] mx-auto leading-snug">
            Hi! I'm Cleo. I'll turn French paperwork into a game you'll actually enjoy. 🗝️
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="w-full flex flex-col gap-3 max-w-sm z-10"
      >
        <Link to="/onboarding">
          <CButton size="lg">Let's go! 🚀</CButton>
        </Link>
        <CButton variant="ghost">I already have an account</CButton>
      </motion.div>
    </div>
  );
}
