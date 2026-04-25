import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Lock,
  Star,
  Crown,
  Trophy,
  Flame,
  Zap,
  Building2,
  FileText,
  Gift,
  Home,
  HeartPulse,
  Languages,
  Train,
  PiggyBank,
  Settings,
  Check,
} from "lucide-react";
import { CCard, ProgressBar, Pill } from "@/components/concierge/CCard";
import { Cleo } from "@/components/concierge/Cleo";
import { BottomNav } from "@/components/concierge/BottomNav";
import { useApp } from "@/lib/store";
import type { LucideIcon } from "lucide-react";

export const Route = createFileRoute("/home")({
  component: QuestMap,
});

/* ============================================================
   Premium scrollable Journey Map.
   Multiple unlocked + locked sections, Duolingo-style.
   ============================================================ */

interface QuestNode {
  id: string;
  type: "lesson" | "checkpoint" | "boss";
  title: string;
  Icon: LucideIcon;
  href: string;
  status: "done" | "current" | "locked";
}

interface Section {
  id: string;
  level: number;
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  status: "active" | "locked" | "done";
  comingSoon?: boolean;
  nodes: QuestNode[];
}

function QuestMap() {
  const { onboarding, xp, streak, quest } = useApp();
  const xpToNext = 500;

  const bankSelected = !!quest.bankSelected;
  const bankApplied = !!quest.bankApplied;
  const bankActive = !!quest.bankActive;

  const sections: Section[] = [
    {
      id: "banking",
      level: 1,
      title: "Banking",
      subtitle: "Open a French account",
      Icon: Building2,
      status: "active",
      nodes: [
        { id: "n1", type: "checkpoint", title: "Welcome to France", Icon: Star, href: "/level/banking", status: "done" },
        { id: "n2", type: "lesson", title: "Pick your bank", Icon: Building2, href: "/level/banking", status: bankSelected ? "done" : "current" },
        { id: "n3", type: "lesson", title: "Apply online", Icon: FileText, href: "/level/banking", status: bankApplied ? "done" : bankSelected ? "current" : "locked" },
        { id: "n4", type: "boss", title: "Get your card", Icon: Crown, href: "/level/banking", status: bankActive ? "done" : bankApplied ? "current" : "locked" },
      ],
    },
    {
      id: "taxes",
      level: 2,
      title: "Taxes",
      subtitle: "Declare without crying",
      Icon: FileText,
      status: bankActive ? "active" : "locked",
      nodes: [
        { id: "t1", type: "lesson", title: "Tax basics", Icon: FileText, href: "/level/taxes", status: bankActive ? "current" : "locked" },
        { id: "t2", type: "lesson", title: "Find your bracket", Icon: Zap, href: "/level/taxes", status: "locked" },
        { id: "t3", type: "boss", title: "File your return", Icon: Crown, href: "/level/taxes", status: "locked" },
      ],
    },
    {
      id: "benefits",
      level: 3,
      title: "Benefits",
      subtitle: "Money the state owes you",
      Icon: Gift,
      status: "locked",
      nodes: [
        { id: "b1", type: "lesson", title: "Find your perks", Icon: Gift, href: "/level/benefits", status: "locked" },
        { id: "b2", type: "boss", title: "Claim €1,200/yr", Icon: Crown, href: "/level/benefits", status: "locked" },
      ],
    },
    {
      id: "housing",
      level: 4,
      title: "Housing",
      subtitle: "Rent like a local",
      Icon: Home,
      status: "locked",
      comingSoon: true,
      nodes: [
        { id: "h1", type: "lesson", title: "Lease decoded", Icon: FileText, href: "/home", status: "locked" },
        { id: "h2", type: "lesson", title: "Insurance basics", Icon: Home, href: "/home", status: "locked" },
        { id: "h3", type: "boss", title: "Get your keys", Icon: Crown, href: "/home", status: "locked" },
      ],
    },
    {
      id: "health",
      level: 5,
      title: "Healthcare",
      subtitle: "Sécu & Carte Vitale",
      Icon: HeartPulse,
      status: "locked",
      comingSoon: true,
      nodes: [
        { id: "hc1", type: "lesson", title: "How sécu works", Icon: HeartPulse, href: "/home", status: "locked" },
        { id: "hc2", type: "boss", title: "Carte Vitale unlocked", Icon: Crown, href: "/home", status: "locked" },
      ],
    },
    {
      id: "lang",
      level: 6,
      title: "Language",
      subtitle: "Survival French",
      Icon: Languages,
      status: "locked",
      comingSoon: true,
      nodes: [
        { id: "l1", type: "lesson", title: "Café phrases", Icon: Languages, href: "/home", status: "locked" },
        { id: "l2", type: "lesson", title: "Admin vocab", Icon: FileText, href: "/home", status: "locked" },
      ],
    },
    {
      id: "transport",
      level: 7,
      title: "Transport",
      subtitle: "Métro, Vélib & beyond",
      Icon: Train,
      status: "locked",
      comingSoon: true,
      nodes: [
        { id: "tr1", type: "lesson", title: "Navigo card", Icon: Train, href: "/home", status: "locked" },
        { id: "tr2", type: "boss", title: "Drive in France", Icon: Crown, href: "/home", status: "locked" },
      ],
    },
    {
      id: "retire",
      level: 8,
      title: "Retirement",
      subtitle: "Long-term game plan",
      Icon: PiggyBank,
      status: "locked",
      comingSoon: true,
      nodes: [
        { id: "r1", type: "lesson", title: "PER basics", Icon: PiggyBank, href: "/home", status: "locked" },
      ],
    },
  ];

  return (
    <div className="mobile-shell pb-32 relative">
      {/* Soft ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-60 bg-gradient-jungle-glow" />

      {/* Top bar */}
      <header
        className="px-5 pt-4 pb-3 flex items-center justify-between gap-3 relative z-10"
        style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
      >
        <Link to="/profile" className="flex items-center gap-3 active:scale-95 transition-transform">
          <div className="relative">
            <Cleo pose="waving" mood="happy" size={52} />
            <span className="absolute -bottom-1 -right-1 h-4 w-4 bg-jungle rounded-full border-2 border-white" />
          </div>
          <div>
            <p className="text-ink/55 text-[10px] font-bold uppercase tracking-[2px]">
              Bonjour
            </p>
            <h2 className="text-ink text-[18px] font-display font-bold leading-tight">
              {onboarding.name}
            </h2>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <StatChip Icon={Flame} value={streak} accent="coral" />
          <StatChip Icon={Zap} value={xp} accent="gold" />
          <Link
            to="/profile"
            className="h-9 w-9 rounded-full bg-white border border-ink-black/10 flex items-center justify-center text-ink/70 active:scale-95 shadow-soft"
          >
            <Settings size={16} />
          </Link>
        </div>
      </header>

      {/* Level summary card */}
      <div className="px-5 mb-4 relative z-10">
        <CCard tone="default" delay={0.1} className="!p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-jungle to-forest flex items-center justify-center shadow-glow-jungle">
              <Crown size={18} className="text-porcelain" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-forest text-[10px] font-bold uppercase tracking-[2px]">
                Level 1 · Newcomer
              </p>
              <p className="text-ink text-[15px] font-display font-bold">
                {xp} <span className="text-ink/40">/ {xpToNext} XP</span>
              </p>
            </div>
            <Pill variant="ghost">
              <Trophy size={11} className="text-gold-deep" />
              {Math.round((xp / xpToNext) * 100)}%
            </Pill>
          </div>
          <ProgressBar value={xp} max={xpToNext} tone="mint" />
        </CCard>
      </div>

      {/* Map background — abstract dot grid */}
      <MapBackdrop />

      {/* Sections */}
      <div className="relative z-10">
        {sections.map((section, sIdx) => (
          <SectionBlock key={section.id} section={section} index={sIdx} />
        ))}
      </div>

      {/* Final reward */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
        className="flex flex-col items-center mt-8 mb-12 relative z-10"
      >
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gold/40 blur-2xl animate-glow-pulse" />
          <div className="relative h-24 w-24 rounded-[28px] bg-gradient-gold border border-gold/50 flex items-center justify-center shadow-deep">
            <Trophy size={42} className="text-ink-black" strokeWidth={2.4} />
          </div>
        </div>
        <p className="text-ink text-[12px] font-bold uppercase tracking-[2px] mt-3">
          Final Reward
        </p>
        <p className="text-ink/55 text-[12px] font-medium">
          Become a France Pro
        </p>
      </motion.div>

      <BottomNav />
    </div>
  );
}

/* -------------------- Section -------------------- */

function SectionBlock({ section, index }: { section: Section; index: number }) {
  const isLocked = section.status === "locked";
  // Zigzag pattern for nodes
  const offsets = [0, 64, 88, 32, -48, -84, -56, 24, 60];

  return (
    <div className="relative">
      <SectionBanner section={section} index={index} />

      <div className="relative px-4 pt-2 pb-6">
        {/* SVG dotted path connectors between nodes */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {section.nodes.map((_, i) => {
            if (i === section.nodes.length - 1) return null;
            const nodeHeight = 116;
            const y1 = 30 + i * nodeHeight + 70;
            const y2 = 30 + (i + 1) * nodeHeight + 5;
            const x1 = 50 + ((offsets[i] ?? 0) / 320) * 50;
            const x2 = 50 + ((offsets[i + 1] ?? 0) / 320) * 50;
            return (
              <path
                key={i}
                d={`M ${x1}% ${y1} Q ${(x1 + x2) / 2}% ${(y1 + y2) / 2 + 14} ${x2}% ${y2}`}
                stroke={isLocked ? "rgba(4,15,15,0.12)" : "rgba(36,130,50,0.45)"}
                strokeWidth="3"
                strokeDasharray="2 9"
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
        </svg>

        <div className="relative space-y-[40px] pt-3">
          {section.nodes.map((node, i) => (
            <div key={node.id} className="flex justify-center">
              <PathNode
                node={node}
                offsetX={offsets[i] ?? 0}
                delay={i * 0.05}
                isCurrent={node.status === "current"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionBanner({ section, index }: { section: Section; index: number }) {
  const isLocked = section.status === "locked";
  const isComingSoon = !!section.comingSoon;
  const Icon = section.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="px-5 my-4"
    >
      <div
        className={`relative rounded-[22px] p-4 border overflow-hidden ${
          isLocked
            ? "bg-white/70 border-ink-black/8"
            : "bg-white border-jungle/25"
        } shadow-soft`}
      >
        {!isLocked && (
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-jungle/15 blur-2xl pointer-events-none" />
        )}
        <div className="flex items-center gap-3 relative">
          <div
            className={`h-12 w-12 rounded-2xl flex items-center justify-center border ${
              isLocked
                ? "bg-mint-tint border-ink-black/10 text-ink/40"
                : "bg-gradient-to-br from-jungle to-forest border-jungle/40 text-porcelain shadow-glow-jungle"
            }`}
          >
            {isLocked ? <Lock size={20} /> : <Icon size={22} strokeWidth={2.2} />}
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-[10px] font-bold uppercase tracking-[2px] ${
                isLocked ? "text-ink/40" : "text-forest"
              }`}
            >
              Section {section.level}
            </p>
            <p
              className={`text-[16px] font-display font-bold leading-tight truncate ${
                isLocked ? "text-ink/55" : "text-ink"
              }`}
            >
              {section.title}
            </p>
            <p className={`text-[11px] font-medium truncate ${isLocked ? "text-ink/40" : "text-ink/60"}`}>
              {section.subtitle}
            </p>
          </div>
          {isComingSoon ? (
            <Pill variant="ghost">Coming soon</Pill>
          ) : isLocked ? (
            <Pill variant="ghost">
              <Lock size={10} />
              Locked
            </Pill>
          ) : (
            <Pill variant="forest">
              <span className="h-1.5 w-1.5 rounded-full bg-porcelain animate-pulse" />
              Active
            </Pill>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------- Helpers -------------------- */

function StatChip({
  Icon,
  value,
  accent,
}: {
  Icon: LucideIcon;
  value: number;
  accent: "coral" | "gold";
}) {
  const tone =
    accent === "coral"
      ? "bg-coral/15 text-coral border-coral/30"
      : "bg-gold/15 text-gold border-gold/30";
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={`${tone} border px-2.5 py-1 rounded-full flex items-center gap-1 text-[12px] font-bold`}
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
          <circle cx="2" cy="2" r="1" fill="#2BA84A" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotgrid)" />
    </svg>
  );
}

function PathNode({
  node,
  offsetX,
  delay,
  isCurrent,
}: {
  node: QuestNode;
  offsetX: number;
  delay: number;
  isCurrent: boolean;
}) {
  const locked = node.status === "locked";
  const done = node.status === "done";
  const isBoss = node.type === "boss";
  const Icon = node.Icon;

  let bgClass = "bg-white";
  let borderClass = "border-ink-black/10";
  let iconColor = "text-ink/30";
  let shadowStyle = "0 4px 0 rgba(4,15,15,0.10)";

  if (locked) {
    bgClass = "bg-white/70";
    borderClass = "border-ink-black/8";
    iconColor = "text-ink/30";
    shadowStyle = "0 4px 0 rgba(4,15,15,0.08)";
  } else if (done) {
    bgClass = "bg-gradient-to-br from-jungle to-forest";
    borderClass = "border-forest";
    iconColor = "text-porcelain";
    shadowStyle = "0 5px 0 #1a5f24, 0 12px 24px -8px rgba(43,168,74,0.5)";
  } else if (isCurrent) {
    bgClass = isBoss ? "bg-gradient-gold" : "bg-gradient-to-br from-[#5DE48A] to-jungle";
    borderClass = isBoss ? "border-gold/60" : "border-jungle/60";
    iconColor = "text-ink-black";
    shadowStyle = isBoss
      ? "0 6px 0 #B7861F, 0 14px 28px -8px rgba(229,168,46,0.55)"
      : "0 6px 0 #1a5f24, 0 14px 28px -8px rgba(43,168,74,0.55)";
  }

  const size = isBoss ? 88 : 76;

  const Inner = (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 18 }}
      style={{ transform: `translateX(${offsetX}px)` }}
      className="relative flex flex-col items-center"
    >
      {/* Pulse ring on current */}
      {isCurrent && (
        <span
          className="absolute rounded-full animate-pulse-ring"
          style={{ width: size, height: size, top: 0, left: "50%", transform: "translateX(-50%)" }}
        />
      )}

      {/* Cleo START tag */}
      {isCurrent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: delay + 0.3, type: "spring" }}
          className="absolute -top-12 z-10 pointer-events-none"
        >
          <div className="bg-ink-black text-porcelain rounded-full px-3 py-1 text-[10px] font-bold tracking-wide shadow-soft border border-ink-black/10 relative">
            START
            <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-ink-black rotate-45" />
          </div>
        </motion.div>
      )}

      <button
        disabled={locked}
        className={`relative ${bgClass} ${borderClass} border-2 rounded-full flex items-center justify-center transition-transform active:translate-y-1 disabled:cursor-not-allowed`}
        style={{
          width: size,
          height: size,
          boxShadow: shadowStyle,
        }}
      >
        {/* top sheen */}
        {!locked && (
          <span
            className="absolute top-1.5 left-1/2 -translate-x-1/2 w-[55%] h-[28%] rounded-full bg-white/40 blur-[1px] pointer-events-none"
          />
        )}
        {locked ? (
          <Lock size={isBoss ? 26 : 22} className={iconColor} strokeWidth={2.2} />
        ) : (
          <Icon size={isBoss ? 32 : 28} className={iconColor} strokeWidth={2.4} />
        )}

        {isBoss && !locked && (
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 bg-ink-black text-gold rounded-full px-2 py-0.5 text-[8px] font-bold border border-gold/40 uppercase tracking-[1.5px]">
            Boss
          </span>
        )}
        {done && (
          <span className="absolute -bottom-1 -right-1 bg-white rounded-full h-7 w-7 flex items-center justify-center border-2 border-jungle shadow-soft">
            <Check size={14} strokeWidth={3} className="text-jungle" />
          </span>
        )}
      </button>

      <p
        className={`mt-2 text-[12px] font-bold text-center max-w-[120px] leading-tight ${
          locked ? "text-ink/35" : "text-ink"
        }`}
      >
        {node.title}
      </p>
    </motion.div>
  );

  if (locked) return Inner;
  return (
    <Link to={node.href} className="block">
      {Inner}
    </Link>
  );
}
