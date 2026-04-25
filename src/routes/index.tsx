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
    <div className="mobile-shell flex flex-col items-center justify-between py-16 px-6">
      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 12,
            delay: 0.5,
          }}
        >
          <Cleo pose="default" size={120} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <span className="text-coral text-3xl">🗝️</span>
          <h1 className="text-white text-[34px] font-extrabold tracking-[-0.5px]">Concierge</h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="text-silver text-[14px]"
        >
          Your guide to life in France
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="w-full flex flex-col gap-3 max-w-sm"
      >
        <Link to="/onboarding">
          <CButton>Get started</CButton>
        </Link>
        <CButton variant="ghost">I already have an account</CButton>
      </motion.div>
    </div>
  );
}
