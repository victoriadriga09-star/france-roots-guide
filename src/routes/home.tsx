import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Zap, Flame, Star, Crown, Trophy } from "lucide-react";
import { CCard, ProgressBar, Pill } from "@/components/concierge/CCard";
import { Cleo } from "@/components/concierge/Cleo";
import { BottomNav } from "@/components/concierge/BottomNav";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/home")({
  component: QuestMap,
});

/* ============================================================
   Duolingo-style Quest Path
   Zigzag of chunky circular nodes connected by dotted curves.
   ============================================================ */

interface QuestNode {
  id: string;
  type: "lesson" | "checkpoint" | "boss";
  title: string;
  emoji: string;
  href: string;
  status: "done" | "current" | "locked";
  level: number;
}

function QuestMap() {
  const { onboarding, xp, streak, quest } = useApp();
  const xpToNext = 500;

  // Determine status of banking sub-quests
  const bankSelected = !!quest.bankSelected;
  const bankApplied = !!quest.bankApplied;
  const bankActive = !!quest.bankActive;

  const nodes: QuestNode[] = [
    {
      id: "welcome",
      type: "checkpoint",
      title: "Welcome",
      emoji: "🇫🇷",
      href: "/home",
      status: "done",
      level: 1,
    },
    {
      id: "bank-pick",
      type: "lesson",
      title: "Pick a bank",
      emoji: "🏦",
      href: "/level/banking",
      status: bankSelected ? "done" : "current",
      level: 1,
    },
    {
      id: "bank-apply",
      type: "lesson",
      title: "Apply",
      emoji: "📝",
      href: "/level/banking",
      status: bankApplied ? "done" : bankSelected ? "current" : "locked",
      level: 1,
    },
    {
      id: "bank-card",
      type: "boss",
      title: "Get your card",
      emoji: "💳",
      href: "/level/banking",
      status: bankActive ? "done" : bankApplied ? "current" : "locked",
      level: 1,
    },
    {
      id: "tax-intro",
      type: "lesson",
      title: "Tax basics",
      emoji: "📋",
      href: "/level/taxes",
      status: bankActive ? "current" : "locked",
      level: 2,
    },
    {
      id: "tax-bracket",
      type: "lesson",
      title: "Find your bracket",
      emoji: "📊",
      href: "/level/taxes",
      status: "locked",
      level: 2,
    },
    {
      id: "tax-file",
      type: "boss",
      title: "Declare!",
      emoji: "✍️",
      href: "/level/taxes",
      status: "locked",
      level: 2,
    },
    {
      id: "benefits-radar",
      type: "lesson",
      title: "Find perks",
      emoji: "🎁",
      href: "/level/benefits",
      status: "locked",
      level: 3,
    },
    {
      id: "benefits-claim",
      type: "boss",
      title: "Claim €1,200/yr",
      emoji: "💰",
      href: "/level/benefits",
      status: "locked",
      level: 3,
    },
  ];

  // Duolingo zigzag offsets in px (within 280px usable width)
  const offsets = [0, 70, 90, 50, -50, -90, -60, 30, 60];

  return (
    <div className="mobile-shell pb-32 bg-clouds">
      {/* Top bar */}
      <header
        className="px-5 pt-4 pb-3 flex items-center justify-between gap-3"
        style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
      >
        <div className="flex items-center gap-3">
          <Cleo pose="waving" mood="happy" size={56} />
          <div>
            <p className="text-ink/70 text-[11px] font-bold uppercase tracking-wider">
              Bonjour 👋
            </p>
            <h2 className="text-ink text-[20px] font-extrabold leading-tight">
              {onboarding.name}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <StatChip icon="🔥" value={streak} color="coral" />
          <StatChip icon="⚡" value={xp} color="yellow" />
        </div>
      </header>

      {/* Mini progress strip */}
      <div className="px-5 mb-3">
        <CCard tone="ink" delay={0} className="!p-3 flex items-center gap-3">
          <Crown size={20} className="text-pop-yellow shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[12px] font-extrabold uppercase tracking-wider text-pop-yellow">
                Level 1 · Newcomer
              </span>
              <span className="text-white/80 text-[11px] font-bold">
                {xp}/{xpToNext} XP
              </span>
            </div>
            <ProgressBar value={xp} max={xpToNext} tone="yellow" />
          </div>
        </CCard>
      </div>

      {/* Section banner */}
      <SectionBanner level={1} title="Banking" emoji="🏦" />

      {/* Zigzag path */}
      <div className="relative px-4 pt-4">
        {/* SVG dotted connectors layer */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          {nodes.map((_, i) => {
            if (i === nodes.length - 1) return null;
            const y1 = 60 + i * 130 + 40;
            const y2 = 60 + (i + 1) * 130;
            const x1 = 50 + ((offsets[i] ?? 0) / 280) * 50;
            const x2 = 50 + ((offsets[i + 1] ?? 0) / 280) * 50;
            return (
              <path
                key={i}
                d={`M ${x1}% ${y1} Q ${(x1 + x2) / 2}% ${(y1 + y2) / 2 + 10} ${x2}% ${y2}`}
                stroke="rgba(31,34,54,0.35)"
                strokeWidth="3.5"
                strokeDasharray="2 8"
                strokeLinecap="round"
                fill="none"
              />
            );
          })}
        </svg>

        <div className="relative space-y-[60px] py-2">
          {nodes.map((node, i) => {
            // Insert a section banner before tax / benefits chunk
            const showLevelBanner =
              (i > 0 && node.level !== nodes[i - 1].level);

            return (
              <div key={node.id}>
                {showLevelBanner && (
                  <div className="-mx-4 my-6">
                    <SectionBanner
                      level={node.level}
                      title={node.level === 2 ? "Taxes" : "Benefits"}
                      emoji={node.level === 2 ? "📋" : "🎁"}
                    />
                  </div>
                )}
                <div className="flex justify-center">
                  <PathNode
                    node={node}
                    offsetX={offsets[i] ?? 0}
                    delay={i * 0.06}
                    isCurrent={node.status === "current"}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Final chest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="flex flex-col items-center mt-8"
        >
          <div className="h-20 w-20 rounded-3xl bg-pop-yellow border-2 border-ink flex items-center justify-center text-4xl shadow-[0_6px_0_rgba(31,34,54,0.85)]">
            🏆
          </div>
          <p className="text-ink text-[12px] font-extrabold uppercase tracking-wider mt-2">
            Final Reward
          </p>
          <p className="text-lavender text-[11px] font-semibold">
            Become a France Pro
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}

/* -------------------- Sub-components -------------------- */

function StatChip({
  icon,
  value,
  color,
}: {
  icon: string;
  value: number;
  color: "coral" | "yellow";
}) {
  const tone =
    color === "coral"
      ? "bg-pop-coral text-white border-ink"
      : "bg-pop-yellow text-ink border-ink";
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={`${tone} border-2 px-2.5 py-1 rounded-full flex items-center gap-1 text-[13px] font-extrabold shadow-[0_3px_0_rgba(31,34,54,0.85)]`}
    >
      <span className="text-[14px]">{icon}</span>
      {value}
    </motion.div>
  );
}

function SectionBanner({
  level,
  title,
  emoji,
}: {
  level: number;
  title: string;
  emoji: string;
}) {
  return (
    <div className="px-5 my-3">
      <div className="bg-ink text-white border-2 border-ink rounded-[20px] px-4 py-3 flex items-center justify-between shadow-[0_5px_0_rgba(31,34,54,0.4)]">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{emoji}</span>
          <div>
            <p className="text-pop-yellow text-[10px] font-extrabold uppercase tracking-widest">
              Section {level}
            </p>
            <p className="text-white text-[16px] font-extrabold leading-tight">
              {title}
            </p>
          </div>
        </div>
        <div className="text-pop-yellow">
          <Trophy size={18} />
        </div>
      </div>
    </div>
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

  // Color/style by status & type
  let bg = "bg-white";
  let border = "border-ink";
  let textColor = "text-ink";
  let shadowColor = "rgba(124,128,155,0.85)";

  if (locked) {
    bg = "bg-lavender/40";
    border = "border-lavender";
    textColor = "text-lavender";
    shadowColor = "rgba(124,128,155,0.6)";
  } else if (done) {
    bg = "bg-pop-mint";
    border = "border-ink";
    shadowColor = "rgba(31,34,54,0.85)";
  } else if (isCurrent) {
    bg = isBoss ? "bg-pop-coral" : "bg-pop-yellow";
    border = "border-ink";
    shadowColor = "rgba(31,34,54,0.85)";
  }

  const size = isBoss ? 96 : 80;

  const Inner = (
    <motion.div
      initial={{ opacity: 0, scale: 0.4, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 300, damping: 18 }}
      style={{ transform: `translateX(${offsetX}px)` }}
      className="relative flex flex-col items-center"
    >
      {/* Cleo guide hovering near current */}
      {isCurrent && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.4 }}
          className="absolute -top-16 -left-20 z-10 hidden xs:block"
          style={{ transform: offsetX > 30 ? `translateX(-40px)` : undefined }}
        >
          <div className="relative">
            <Cleo pose="guiding" mood="happy" size={56} />
            <div className="absolute -top-8 left-12 bg-white border-2 border-ink rounded-2xl px-2.5 py-1 text-[10px] font-extrabold text-ink shadow-[0_3px_0_rgba(31,34,54,0.85)] whitespace-nowrap">
              START!
              <div className="absolute -bottom-1.5 left-3 w-3 h-3 bg-white border-l-2 border-b-2 border-ink rotate-[-45deg]" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Pulse ring on current */}
      {isCurrent && (
        <span
          className="absolute rounded-full animate-pulse-ring"
          style={{ width: size, height: size, top: 0, left: "50%", transform: "translateX(-50%)" }}
        />
      )}

      {/* Big circular node */}
      <button
        disabled={locked}
        className={`relative ${bg} ${border} border-[3px] rounded-full flex items-center justify-center transition-transform active:translate-y-1 active:shadow-[0_2px_0_var(--tw-shadow-color)] disabled:cursor-not-allowed`}
        style={{
          width: size,
          height: size,
          boxShadow: `0 7px 0 ${shadowColor}`,
        }}
      >
        {/* Top highlight */}
        {!locked && (
          <span className="absolute top-1 left-1/2 -translate-x-1/2 w-[60%] h-[30%] rounded-full bg-white/40 blur-[1px]" />
        )}
        <span
          className={`text-[34px] ${locked ? "grayscale opacity-50" : ""}`}
          style={{ filter: locked ? "grayscale(100%)" : "none" }}
        >
          {locked ? "🔒" : node.emoji}
        </span>

        {/* Boss badge */}
        {isBoss && !locked && (
          <span className="absolute -top-2 -right-2 bg-ink text-pop-yellow rounded-full px-2 py-0.5 text-[9px] font-extrabold border-2 border-pop-yellow uppercase tracking-wider">
            Boss
          </span>
        )}
        {/* Done check */}
        {done && (
          <span className="absolute -bottom-1 -right-1 bg-ink rounded-full h-7 w-7 flex items-center justify-center border-2 border-white">
            <Star size={14} fill="#FFD23F" className="text-pop-yellow" />
          </span>
        )}
      </button>

      {/* Label */}
      <p
        className={`mt-2 text-[12px] font-extrabold text-center max-w-[120px] leading-tight ${textColor}`}
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
