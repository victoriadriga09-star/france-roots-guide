import { motion } from "framer-motion";

type CleoPose = "default" | "celebrating" | "thinking" | "guiding" | "waving" | "sleeping";
type CleoMood = "happy" | "wow" | "wink" | "focused";

interface CleoProps {
  pose?: CleoPose;
  mood?: CleoMood;
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * Cleo — the Concierge mascot.
 * A round, friendly periwinkle creature with a gold key crown.
 * Inspired by Duolingo-style characters: chunky, expressive, and lovable.
 */
export function Cleo({
  pose = "default",
  mood = "happy",
  size = 96,
  className = "",
  animated = true,
}: CleoProps) {
  // Body color: sky blue body with periwinkle belly
  const skin = "#A1CDF4";
  const skinDark = "#6FA8D6";
  const belly = "#E8F1FB";
  const ink = "#1F2236";
  const gold = "#FFD23F";
  const goldDark = "#D9A800";
  const cheek = "#FFB3A8";

  const headTilt = pose === "thinking" ? -8 : pose === "guiding" ? 4 : 0;

  // Eyes per mood
  const Eyes = () => {
    if (mood === "wink") {
      return (
        <>
          <ellipse cx="40" cy="50" rx="3.6" ry="4.4" fill={ink} />
          <circle cx="41" cy="48.5" r="1.2" fill="white" />
          <path d="M55 50 Q60 47 65 50" stroke={ink} strokeWidth="2.6" strokeLinecap="round" fill="none" />
        </>
      );
    }
    if (mood === "wow") {
      return (
        <>
          <circle cx="40" cy="50" r="5" fill={ink} />
          <circle cx="60" cy="50" r="5" fill={ink} />
          <circle cx="41.5" cy="48" r="1.6" fill="white" />
          <circle cx="61.5" cy="48" r="1.6" fill="white" />
        </>
      );
    }
    if (mood === "focused") {
      return (
        <>
          <path d="M35 50 L45 50" stroke={ink} strokeWidth="3" strokeLinecap="round" />
          <path d="M55 50 L65 50" stroke={ink} strokeWidth="3" strokeLinecap="round" />
        </>
      );
    }
    // happy default
    return (
      <>
        <ellipse cx="40" cy="50" rx="3.6" ry="4.4" fill={ink} />
        <ellipse cx="60" cy="50" rx="3.6" ry="4.4" fill={ink} />
        <circle cx="41" cy="48.5" r="1.3" fill="white" />
        <circle cx="61" cy="48.5" r="1.3" fill="white" />
      </>
    );
  };

  // Mouth per pose+mood
  const Mouth = () => {
    if (pose === "celebrating") {
      // open smile
      return <path d="M44 62 Q50 70 56 62 Q50 66 44 62 Z" fill={ink} />;
    }
    if (mood === "wow") {
      return <ellipse cx="50" cy="64" rx="3" ry="4" fill={ink} />;
    }
    if (pose === "thinking" || mood === "focused") {
      return <path d="M46 64 L54 64" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />;
    }
    // little smile
    return <path d="M44 62 Q50 67 56 62" stroke={ink} strokeWidth="2.4" strokeLinecap="round" fill="none" />;
  };

  const Arms = () => {
    if (pose === "celebrating") {
      return (
        <>
          {/* arms up */}
          <motion.path
            d="M22 60 Q14 38 18 28"
            stroke={skin}
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
            animate={animated ? { rotate: [-4, 4, -4] } : undefined}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{ transformOrigin: "22px 60px" }}
          />
          <motion.path
            d="M78 60 Q86 38 82 28"
            stroke={skin}
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
            animate={animated ? { rotate: [4, -4, 4] } : undefined}
            transition={{ duration: 0.6, repeat: Infinity }}
            style={{ transformOrigin: "78px 60px" }}
          />
        </>
      );
    }
    if (pose === "guiding") {
      return (
        <>
          <path d="M22 60 Q18 70 22 78" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* pointing arm */}
          <motion.g
            animate={animated ? { x: [0, 4, 0] } : undefined}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M78 60 Q92 52 96 44" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
            <circle cx="98" cy="42" r="5" fill={skin} />
            <circle cx="98" cy="42" r="2" fill={belly} />
          </motion.g>
        </>
      );
    }
    if (pose === "thinking") {
      return (
        <>
          {/* hand to chin */}
          <path d="M22 60 Q30 58 36 56" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
          <circle cx="38" cy="56" r="5" fill={skin} />
          <path d="M78 60 Q82 72 78 80" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
        </>
      );
    }
    if (pose === "waving") {
      return (
        <>
          <path d="M22 60 Q18 70 22 78" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
          <motion.g
            animate={animated ? { rotate: [-12, 18, -12] } : undefined}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "78px 60px" }}
          >
            <path d="M78 60 Q88 46 86 32" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
            <circle cx="86" cy="30" r="6" fill={skin} />
          </motion.g>
        </>
      );
    }
    if (pose === "sleeping") {
      return (
        <>
          <path d="M22 60 Q14 64 12 70" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M78 60 Q86 64 88 70" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
        </>
      );
    }
    return (
      <>
        <path d="M22 60 Q18 70 22 80" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M78 60 Q82 70 78 80" stroke={skin} strokeWidth="9" strokeLinecap="round" fill="none" />
      </>
    );
  };

  // outer wrapper animation
  const wrapAnim =
    animated && pose === "default"
      ? { y: [0, -4, 0] }
      : animated && pose === "waving"
        ? { rotate: [-2, 2, -2] }
        : undefined;
  const wrapTrans =
    pose === "default"
      ? { duration: 3, repeat: Infinity, ease: "easeInOut" as const }
      : { duration: 1.6, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div className={className} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 110" width={size} height={size} style={{ overflow: "visible" }}>
        <motion.g animate={wrapAnim} transition={wrapTrans}>
          <g transform={`rotate(${headTilt} 50 55)`}>
            {/* Drop shadow under feet */}
            <ellipse cx="50" cy="103" rx="22" ry="3" fill={ink} opacity="0.2" />

            {/* Body — round dumpling shape */}
            <ellipse cx="50" cy="60" rx="32" ry="34" fill={skin} stroke={ink} strokeWidth="3" />
            {/* Belly */}
            <ellipse cx="50" cy="68" rx="20" ry="22" fill={belly} />

            {/* Cheeks */}
            <circle cx="30" cy="60" r="4" fill={cheek} opacity="0.8" />
            <circle cx="70" cy="60" r="4" fill={cheek} opacity="0.8" />

            {/* Face */}
            <Eyes />
            <Mouth />

            {/* Key crown on head */}
            <motion.g
              animate={animated && pose === "celebrating" ? { rotate: 360 } : undefined}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50px 28px" }}
            >
              <KeyCrown gold={gold} goldDark={goldDark} ink={ink} />
            </motion.g>

            {/* Arms */}
            <Arms />

            {/* Feet */}
            <ellipse cx="38" cy="96" rx="8" ry="5" fill={skinDark} stroke={ink} strokeWidth="2.5" />
            <ellipse cx="62" cy="96" rx="8" ry="5" fill={skinDark} stroke={ink} strokeWidth="2.5" />

            {/* Sparkles when celebrating */}
            {pose === "celebrating" && animated && (
              <>
                <motion.g
                  animate={{ scale: [0, 1, 0], rotate: [0, 180] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0 }}
                  style={{ transformOrigin: "12px 30px" }}
                >
                  <Sparkle x={12} y={30} color={gold} />
                </motion.g>
                <motion.g
                  animate={{ scale: [0, 1, 0], rotate: [0, 180] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
                  style={{ transformOrigin: "88px 30px" }}
                >
                  <Sparkle x={88} y={30} color={gold} />
                </motion.g>
                <motion.g
                  animate={{ scale: [0, 1, 0], rotate: [0, 180] }}
                  transition={{ duration: 1.4, repeat: Infinity, delay: 0.8 }}
                  style={{ transformOrigin: "50px 8px" }}
                >
                  <Sparkle x={50} y={8} color="#FF7E6B" />
                </motion.g>
              </>
            )}

            {/* Z's when sleeping */}
            {pose === "sleeping" && (
              <g>
                <text x="78" y="32" fontSize="12" fill={ink} fontWeight="800">z</text>
                <text x="86" y="22" fontSize="9" fill={ink} fontWeight="800">z</text>
              </g>
            )}
          </g>
        </motion.g>
      </svg>
    </div>
  );
}

function KeyCrown({ gold, goldDark, ink }: { gold: string; goldDark: string; ink: string }) {
  return (
    <g>
      {/* Key bow (round) */}
      <circle cx="50" cy="20" r="8" fill={gold} stroke={ink} strokeWidth="2.5" />
      <circle cx="50" cy="20" r="3" fill={goldDark} />
      {/* Key shaft going down to body */}
      <rect x="48" y="26" width="4" height="6" fill={gold} stroke={ink} strokeWidth="2" />
      {/* Tooth */}
      <rect x="52" y="28" width="3" height="2" fill={gold} stroke={ink} strokeWidth="1.5" />
    </g>
  );
}

function Sparkle({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x - 4} ${y - 4})`}>
      <path
        d="M4 0 L5 3 L8 4 L5 5 L4 8 L3 5 L0 4 L3 3 Z"
        fill={color}
        stroke="#1F2236"
        strokeWidth="0.6"
      />
    </g>
  );
}

/**
 * CleoBubble — the mascot with a speech bubble guide moment.
 * Use throughout the app to inject Cleo's voice into explanatory pages.
 */
export function CleoBubble({
  text,
  pose = "guiding",
  mood = "happy",
  size = 80,
  side = "right",
  tone = "default",
  className = "",
}: {
  text: React.ReactNode;
  pose?: CleoPose;
  mood?: CleoMood;
  size?: number;
  side?: "left" | "right";
  tone?: "default" | "tip" | "win" | "warn";
  className?: string;
}) {
  const toneStyles = {
    default: "bg-white border-ink/15",
    tip: "bg-pop-yellow border-ink/20",
    win: "bg-pop-mint border-ink/20",
    warn: "bg-pop-coral text-white border-ink/30",
  } as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`flex items-end gap-2 ${side === "left" ? "flex-row" : "flex-row-reverse"} ${className}`}
    >
      <div className="shrink-0">
        <Cleo pose={pose} mood={mood} size={size} />
      </div>
      <div className="relative flex-1 max-w-[78%]">
        <div
          className={`relative rounded-[22px] px-4 py-3 border-2 ${toneStyles[tone]} shadow-[0_4px_0_rgba(31,34,54,0.18)]`}
        >
          <div className={`text-[14px] leading-snug font-semibold ${tone === "warn" ? "text-white" : "text-ink"}`}>
            {text}
          </div>
          {/* tail */}
          <div
            className={`absolute bottom-3 ${side === "left" ? "-left-2" : "-right-2"} w-4 h-4 rotate-45 border-2 ${toneStyles[tone]}`}
            style={{
              borderTop: "none",
              borderRight: side === "left" ? "none" : undefined,
              borderLeft: side === "right" ? "none" : undefined,
              borderBottom: "none",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
