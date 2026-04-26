import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Crown, Trophy, Flame, Zap, Settings } from "lucide-react";
import { CCard, ProgressBar, Pill } from "@/components/concierge/CCard";
import { Cleo } from "@/components/concierge/Cleo";
import { BottomNav } from "@/components/concierge/BottomNav";
import {
  CategoryShape,
  type CategoryKey,
  type StageStatus,
} from "@/components/concierge/CategoryShape";
import { useApp } from "@/lib/store";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: QuestMap,
});

interface Stage {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  category: CategoryKey;
  href: string;
  status: StageStatus;
}

function QuestMap() {
  const { onboarding, xp, streak, quest } = useApp();
  const navigate = useNavigate();
  const xpToNext = 500;

  const bankActive = !!quest.bankActive;
  const taxesFiled = !!quest.taxesFiled;
  const benefitsClaimed = !!quest.benefitsClaimed;

  const stages: Stage[] = [
    {
      id: "start",
      level: 0,
      title: "Welcome",
      subtitle: "You're here",
      category: "start",
      href: "/home",
      status: "done",
    },
    {
      id: "banking",
      level: 1,
      title: "Banking",
      subtitle: "Open a French account",
      category: "banking",
      href: "/level/banking",
      status: bankActive ? "done" : "current",
    },
    {
      id: "taxes",
      level: 2,
      title: "Taxes",
      subtitle: "Declare without crying",
      category: "taxes",
      href: "/level/taxes",
      status: taxesFiled ? "done" : bankActive ? "current" : "locked",
    },
    {
      id: "benefits",
      level: 3,
      title: "Benefits",
      subtitle: "Money you're owed",
      category: "benefits",
      href: "/level/benefits",
      status: benefitsClaimed ? "done" : taxesFiled ? "current" : "locked",
    },
    {
      id: "housing",
      level: 4,
      title: "Housing",
      subtitle: "Rent like a local",
      category: "housing",
      href: "/home",
      status: "comingSoon",
    },
    {
      id: "health",
      level: 5,
      title: "Healthcare",
      subtitle: "Sécu & Carte Vitale",
      category: "healthcare",
      href: "/home",
      status: "comingSoon",
    },
    {
      id: "lang",
      level: 6,
      title: "Language",
      subtitle: "Survival French",
      category: "language",
      href: "/home",
      status: "comingSoon",
    },
    {
      id: "transport",
      level: 7,
      title: "Transport",
      subtitle: "Métro, Vélib & beyond",
      category: "transport",
      href: "/home",
      status: "comingSoon",
    },
    {
      id: "retire",
      level: 8,
      title: "Retirement",
      subtitle: "Long-term game plan",
      category: "retirement",
      href: "/home",
      status: "comingSoon",
    },
  ];

  // Zig-zag horizontal offsets, Duolingo style
  const offsets = [0, 80, -70, 60, -80, 70, -60, 80, 0];

  return (
    <div className="mobile-shell pb-32 relative bg-black min-h-screen">
      {/* Ambient glow on top of root globe */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-jungle-glow opacity-90" />

      {/* Top bar */}
      <header
        className="px-5 pt-4 pb-3 flex items-center justify-between gap-3 relative z-10"
        style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
      >
        <Link to="/profile" className="flex items-center gap-3 active:scale-95 transition-transform">
          <div className="relative">
            <Cleo pose="waving" mood="happy" size={48} />
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-lemon rounded-full border-2 border-black" />
          </div>
          <div>
            <p className="text-white-40 text-[10px] font-bold uppercase tracking-[2px] font-ui">
              Bonjour
            </p>
            <h2 className="text-white text-[18px] font-display font-bold leading-tight">
              {onboarding.name}
            </h2>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <StatChip Icon={Flame} value={streak} accent="coral" />
          <StatChip Icon={Zap} value={xp} accent="lemon" />
          <Link
            to="/profile"
            className="h-9 w-9 rounded-full bg-navy border border-white/10 flex items-center justify-center text-white-60 active:scale-95"
          >
            <Settings size={16} />
          </Link>
        </div>
      </header>

      {/* Level summary */}
      <div className="px-5 mb-4 relative z-10">
        <CCard tone="hero" delay={0.1} className="!p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-lemon flex items-center justify-center shadow-lemon">
              <Crown size={20} className="text-black" strokeWidth={2.6} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-lemon text-[10px] font-bold uppercase tracking-[2px] font-ui">
                Level 1 · Newcomer
              </p>
              <p className="text-white text-[15px] font-display font-bold">
                {xp} <span className="text-white-40">/ {xpToNext} XP</span>
              </p>
            </div>
            <Pill variant="lemon">
              <Trophy size={11} />
              {Math.round((xp / xpToNext) * 100)}%
            </Pill>
          </div>
          <ProgressBar value={xp} max={xpToNext} tone="lemon" />
        </CCard>
      </div>

      {/* Map background */}
      <MapBackdrop />

      {/* Zig-zag stage path */}
      <div className="relative z-10 px-4 pt-4 pb-6">
        {/* Connector dashes */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {stages.map((_, i) => {
            if (i === stages.length - 1) return null;
            const stageH = 178;
            const y1 = 60 + i * stageH + 65;
            const y2 = 60 + (i + 1) * stageH + 5;
            const x1 = 50 + ((offsets[i] ?? 0) / 320) * 60;
            const x2 = 50 + ((offsets[i + 1] ?? 0) / 320) * 60;
            const cx = (x1 + x2) / 2;
            const cy = (y1 + y2) / 2 + 20;
            const lockedNext = stages[i + 1].status === "locked" || stages[i + 1].status === "comingSoon";
            return (
              <path
                key={i}
                d={`M ${x1}% ${y1} Q ${cx}% ${cy} ${x2}% ${y2}`}
                stroke={lockedNext ? "rgba(255,255,255,0.10)" : "rgba(248,255,161,0.5)"}
                strokeWidth="3.5"
                strokeDasharray="3 10"
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
        </svg>

        <div className="relative space-y-[64px] pt-4">
          {stages.map((s, i) => (
            <StageRow
              key={s.id}
              stage={s}
              offsetX={offsets[i] ?? 0}
              delay={i * 0.06}
              onTap={() => {
                if (s.status === "locked" || s.status === "comingSoon") return;
                navigate({ to: s.href });
              }}
            />
          ))}
        </div>
      </div>

      {/* Final reward */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="flex flex-col items-center mt-4 mb-12 relative z-10"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-lemon/40 blur-2xl animate-glow-pulse" />
          <div className="relative h-24 w-24 rounded-[28px] bg-gradient-lemon border border-black/20 flex items-center justify-center shadow-lemon-lg">
            <Trophy size={42} className="text-black" strokeWidth={2.4} />
          </div>
        </div>
        <p className="text-white text-[12px] font-display font-bold uppercase tracking-[2px] mt-3">
          Final Reward
        </p>
        <p className="text-white-60 text-[12px] font-medium">Become a France Pro</p>
      </motion.div>

      <BottomNav />
    </div>
  );
}

/* ---------- Stage row ---------- */

function StageRow({
  stage,
  offsetX,
  delay,
  onTap,
}: {
  stage: Stage;
  offsetX: number;
  delay: number;
  onTap: () => void;
}) {
  const isCurrent = stage.status === "current";
  const isLocked = stage.status === "locked" || stage.status === "comingSoon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, type: "spring", stiffness: 240, damping: 20 }}
      style={{ transform: `translateX(${offsetX}px)` }}
      className="flex flex-col items-center"
    >
      {isCurrent && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.2 }}
          className="mb-1.5 bg-lemon text-black text-[10px] font-display font-extrabold tracking-[1.5px] px-3 py-1 rounded-full border-2 border-black shadow-lemon"
        >
          START
        </motion.div>
      )}

      <CategoryShape
        category={stage.category}
        status={stage.status}
        onClick={onTap}
        size={130}
      />

      <p
        className={`mt-3 text-[12px] font-display font-bold text-center max-w-[140px] leading-tight ${
          isLocked ? "text-white-30" : stage.status === "done" ? "text-lemon" : "text-white"
        }`}
      >
        {stage.title}
      </p>
      <p
        className={`text-[10px] font-ui text-center max-w-[140px] mt-0.5 ${
          isLocked ? "text-white-20" : "text-white-40"
        }`}
      >
        {stage.subtitle}
      </p>
    </motion.div>
  );
}

/* ---------- Helpers ---------- */

function StatChip({
  Icon,
  value,
  accent,
}: {
  Icon: LucideIcon;
  value: number;
  accent: "coral" | "lemon";
}) {
  const tone =
    accent === "coral"
      ? "bg-coral-red/15 text-coral-red border-coral-red/40"
      : "bg-lemon/15 text-lemon border-lemon/40";
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={`${tone} border px-2.5 py-1 rounded-full flex items-center gap-1 text-[12px] font-bold font-ui`}
    >
      <Icon size={13} strokeWidth={2.6} />
      {value}
    </motion.div>
  );
}

function MapBackdrop() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.18]"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 430 1800"
    >
      <defs>
        <pattern id="dotgrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#F8FFA1" opacity="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>
  );
}
