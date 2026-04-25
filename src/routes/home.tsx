import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Zap, Flame, ArrowRight } from "lucide-react";
import { CCard, ProgressBar } from "@/components/concierge/CCard";
import { CButton } from "@/components/concierge/CButton";
import { BottomNav } from "@/components/concierge/BottomNav";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/home")({
  component: QuestMap,
});

function QuestMap() {
  const { onboarding, xp, streak, quest } = useApp();
  const xpToNext = 500;
  const level1Done = quest.bankActive ? 4 : quest.bankApplied ? 3 : quest.bankSelected ? 1 : 0;

  return (
    <div className="mobile-shell pb-28">
      {/* Top bar */}
      <div
        className="px-6 pt-4 pb-3 flex items-center justify-between"
        style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
      >
        <h2 className="text-white text-[20px] font-bold">
          Hi, {onboarding.name} 👋
        </h2>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-coral text-white px-3 py-1.5 rounded-full flex items-center gap-1 text-[13px] font-bold"
        >
          <Zap size={14} fill="white" /> {xp} XP
        </motion.div>
      </div>

      <div className="px-6 space-y-6">
        {/* Streak + Level */}
        <CCard delay={0.05} className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-white text-[16px] font-bold">
              <Flame size={18} className="text-coral" />
              {streak}-day streak
            </div>
            <p className="text-silver text-[12px] mt-1">Come back tomorrow!</p>
          </div>
          <div className="text-right min-w-[140px]">
            <p className="text-coral text-[11px] font-bold uppercase tracking-wider">
              Level 1 — Newcomer
            </p>
            <ProgressBar value={xp} max={xpToNext} className="mt-2" />
            <p className="text-silver text-[11px] mt-1">{xp} of {xpToNext} XP</p>
          </div>
        </CCard>

        {/* Path heading */}
        <div>
          <h3 className="text-white text-[17px] font-bold">Your France journey</h3>
          <p className="text-silver text-[12px] mt-0.5">
            3 levels · 12 quests · ~€2,400/year unlockable
          </p>
        </div>

        {/* Quest path */}
        <div className="relative space-y-5">
          {/* Decorative dotted connectors handled by node spacing */}
          <LevelNode
            unlocked
            number={1}
            tag="LEVEL 1"
            emoji="🏦"
            title="BANKING"
            subtitle="Set up your French financial life"
            progress={level1Done}
            total={4}
            cta="Start Level 1 →"
            href="/level/banking"
            delay={0.1}
            offset="left"
          />
          <Connector />
          <LevelNode
            number={2}
            tag="LEVEL 2"
            emoji="📋"
            title="TAXES"
            subtitle="Complete Level 1 to unlock"
            progress={0}
            total={4}
            cta="Continue Level 1"
            href="/level/taxes"
            unlocked={level1Done >= 4}
            delay={0.2}
            offset="right"
          />
          <Connector />
          <LevelNode
            number={3}
            tag="LEVEL 3"
            emoji="🎁"
            title="BENEFITS"
            subtitle={level1Done >= 4 ? "Complete Level 2 to unlock" : "Complete Level 2 to unlock"}
            progress={0}
            total={4}
            href="/level/benefits"
            unlocked={false}
            delay={0.3}
            offset="left"
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Connector() {
  return (
    <div className="flex justify-center">
      <svg width="40" height="50" viewBox="0 0 40 50" className="text-coral/40">
        <path
          d="M20 0 Q 30 25 20 50"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="3 5"
          fill="none"
        />
      </svg>
    </div>
  );
}

function LevelNode({
  number,
  tag,
  emoji,
  title,
  subtitle,
  progress,
  total,
  cta,
  href,
  unlocked,
  delay,
  offset,
}: {
  number: number;
  tag: string;
  emoji: string;
  title: string;
  subtitle: string;
  progress: number;
  total: number;
  cta?: string;
  href: string;
  unlocked: boolean;
  delay: number;
  offset: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={offset === "left" ? "pr-2" : "pl-2"}
    >
      <div
        className={`relative rounded-[20px] p-5 ${
          unlocked
            ? "border-l-4 border-coral shadow-[0_10px_40px_-12px_rgba(239,131,84,0.4)]"
            : "border-l-4 border-silver/40 opacity-60"
        }`}
        style={{
          background: unlocked
            ? "linear-gradient(135deg, #4F5D75 0%, #2D3142 100%)"
            : "#4F5D75",
        }}
      >
        {!unlocked && (
          <div className="absolute top-4 right-4 text-silver">
            <Lock size={18} />
          </div>
        )}
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[11px] font-bold uppercase tracking-wider ${unlocked ? "text-coral" : "text-silver"}`}>
            {tag}
          </span>
        </div>
        <h3 className="text-white text-[18px] font-bold flex items-center gap-2">
          <span>{emoji}</span> {title}
        </h3>
        <p className="text-silver text-[13px] mt-1">{subtitle}</p>
        <p className="text-white/80 text-[12px] mt-3 mb-2">
          {progress} of {total} quests complete
        </p>
        <ProgressBar value={progress} max={total} />
        {unlocked && cta && (
          <Link to={href} className="block mt-4">
            <CButton>
              {cta} <ArrowRight size={18} />
            </CButton>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
