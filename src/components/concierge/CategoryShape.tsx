import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * CategoryShape — Duolingo-style stage button shaped to match its category.
 * Each shape is hand-drawn SVG so the silhouette is unmistakable.
 *
 * status:
 *   "done"    → filled lemon, black icon, big shadow
 *   "current" → filled lemon, animated pulse ring, START tag handled by parent
 *   "locked"  → muted navy fill, lock overlay
 */

export type CategoryKey =
  | "start"
  | "banking"
  | "taxes"
  | "benefits"
  | "housing"
  | "healthcare"
  | "transport"
  | "language"
  | "retirement";

export type StageStatus = "done" | "current" | "locked" | "comingSoon";

interface Props {
  category: CategoryKey;
  status: StageStatus;
  onClick?: () => void;
  size?: number;
}

export function CategoryShape({ category, status, onClick, size = 130 }: Props) {
  const active = status === "done" || status === "current";
  const fill = active ? "url(#stageActive)" : "rgba(36,49,104,0.7)";
  const stroke = active ? "#000000" : "rgba(255,255,255,0.12)";
  const strokeWidth = active ? 3 : 2;
  const iconColor = active ? "#000000" : "rgba(255,255,255,0.45)";

  const Inner = (
    <motion.button
      whileTap={status !== "locked" && status !== "comingSoon" ? { scale: 0.94, y: 4 } : undefined}
      onClick={onClick}
      disabled={status === "locked" || status === "comingSoon"}
      className="relative flex items-center justify-center"
      style={{
        width: size,
        height: size,
        filter: active ? "drop-shadow(0 8px 20px rgba(248,255,161,0.45))" : "drop-shadow(0 6px 12px rgba(0,0,0,0.5))",
      }}
    >
      {/* Pulse ring on current */}
      {status === "current" && (
        <span
          className="absolute inset-0 rounded-full"
          style={{
            border: "3px solid rgba(248,255,161,0.55)",
            animation: "pulse-ring 2s cubic-bezier(0.4,0,0.6,1) infinite",
          }}
        />
      )}

      <svg width={size} height={size} viewBox="0 0 130 130">
        <defs>
          <linearGradient id="stageActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8FFA1" />
            <stop offset="100%" stopColor="#E8EF7A" />
          </linearGradient>
          <filter id="innerShadow">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        <ShapePath category={category} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />

        {/* Inset highlight on active */}
        {active && (
          <ShapePath
            category={category}
            fill="none"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1.5}
            insetScale={0.92}
          />
        )}

        {/* Icon */}
        <g transform="translate(65 65)">
          {(status === "locked" || status === "comingSoon") ? (
            <LockGlyph color={iconColor} />
          ) : (
            <CategoryIcon category={category} color={iconColor} />
          )}
        </g>
      </svg>

      {/* Coming soon ribbon */}
      {status === "comingSoon" && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-lilac/90 text-black px-2.5 py-0.5 rounded-full text-[9px] font-display font-extrabold uppercase tracking-[1.5px] border border-black/20 shadow">
          Soon
        </span>
      )}
    </motion.button>
  );

  return Inner;
}

/* ---------- Shape silhouettes (130x130 viewBox) ---------- */

function ShapePath({
  category,
  fill,
  stroke,
  strokeWidth,
  insetScale = 1,
}: {
  category: CategoryKey;
  fill: string;
  stroke: string;
  strokeWidth: number;
  insetScale?: number;
}): ReactNode {
  const sw = strokeWidth;
  const t = insetScale === 1 ? "" : `translate(${65 * (1 - insetScale)} ${65 * (1 - insetScale)}) scale(${insetScale})`;

  const common = { fill, stroke, strokeWidth: sw, strokeLinejoin: "round" as const };

  switch (category) {
    case "start":
      // Diamond plinth
      return (
        <g transform={t}>
          <polygon points="65,15 115,65 65,115 15,65" {...common} />
        </g>
      );
    case "banking":
      // Bank facade: pediment + columns + base
      return (
        <g transform={t}>
          <path
            d="M 20 105 L 110 105 L 110 95 L 100 90 L 100 50 L 110 45 L 65 18 L 20 45 L 30 50 L 30 90 L 20 95 Z"
            {...common}
          />
        </g>
      );
    case "taxes":
      // Government building: dome + body + steps
      return (
        <g transform={t}>
          <path
            d="M 18 110 L 112 110 L 112 100 L 105 96 L 105 60 L 95 60 L 95 50 C 95 32 80 22 65 22 C 50 22 35 32 35 50 L 35 60 L 25 60 L 25 96 L 18 100 Z"
            {...common}
          />
        </g>
      );
    case "benefits":
      // Gift box with bow
      return (
        <g transform={t}>
          <rect x="22" y="50" width="86" height="62" rx="8" {...common} />
          <rect x="58" y="50" width="14" height="62" {...common} />
          <rect x="22" y="62" width="86" height="10" {...common} />
          <path
            d="M 65 50 C 60 38 42 30 38 42 C 35 50 50 52 65 50 Z M 65 50 C 70 38 88 30 92 42 C 95 50 80 52 65 50 Z"
            {...common}
          />
        </g>
      );
    case "housing":
      // House with chimney
      return (
        <g transform={t}>
          <path
            d="M 22 110 L 22 65 L 90 65 L 90 50 L 100 50 L 100 73 L 108 73 L 108 110 Z M 22 65 L 65 25 L 108 65"
            {...common}
          />
        </g>
      );
    case "healthcare":
      // Pill capsule diagonal
      return (
        <g transform={t}>
          <rect
            x="20"
            y="55"
            width="90"
            height="30"
            rx="15"
            transform="rotate(-25 65 70)"
            {...common}
          />
          <line
            x1="65"
            y1="70"
            x2="65"
            y2="70"
            stroke={stroke}
            strokeWidth={sw}
          />
        </g>
      );
    case "transport":
      // Train front: cabin with windows + base wheels
      return (
        <g transform={t}>
          <path
            d="M 25 105 L 25 45 C 25 32 38 22 65 22 C 92 22 105 32 105 45 L 105 105 Z"
            {...common}
          />
        </g>
      );
    case "language":
      // Speech bubble
      return (
        <g transform={t}>
          <path
            d="M 20 30 L 110 30 C 116 30 120 34 120 40 L 120 88 C 120 94 116 98 110 98 L 80 98 L 60 115 L 65 98 L 20 98 C 14 98 10 94 10 88 L 10 40 C 10 34 14 30 20 30 Z"
            {...common}
          />
        </g>
      );
    case "retirement":
      // Piggy bank silhouette
      return (
        <g transform={t}>
          <path
            d="M 20 75 C 20 55 40 40 65 40 C 78 40 90 44 98 51 L 110 48 L 108 60 C 112 65 114 70 114 75 C 114 92 95 105 65 105 C 55 105 46 103 38 100 L 30 108 L 26 95 C 22 90 20 83 20 75 Z"
            {...common}
          />
        </g>
      );
  }
}

function CategoryIcon({ category, color }: { category: CategoryKey; color: string }) {
  const stroke = color;
  const sw = 2.4;
  const props = {
    fill: "none",
    stroke,
    strokeWidth: sw,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (category) {
    case "start":
      return (
        <g transform="translate(-12 -12)">
          <path d="M 4 8 L 14 8 L 22 16 L 14 24 L 4 24 Z" {...props} />
        </g>
      );
    case "banking":
      return (
        <g transform="translate(-12 -10)">
          <path d="M 2 8 L 12 2 L 22 8" {...props} />
          <path d="M 4 8 V 16 M 9 8 V 16 M 15 8 V 16 M 20 8 V 16 M 2 18 H 22" {...props} />
        </g>
      );
    case "taxes":
      return (
        <g transform="translate(-10 -10)">
          <rect x="2" y="6" width="16" height="14" rx="1" {...props} />
          <path d="M 5 10 H 15 M 5 14 H 12" {...props} />
        </g>
      );
    case "benefits":
      return (
        <g transform="translate(-12 -12)">
          <rect x="2" y="8" width="20" height="14" rx="2" {...props} />
          <path d="M 2 12 H 22 M 12 8 V 22" {...props} />
        </g>
      );
    case "housing":
      return (
        <g transform="translate(-12 -12)">
          <path d="M 3 12 L 12 4 L 21 12 V 21 H 3 Z M 9 21 V 14 H 15 V 21" {...props} />
        </g>
      );
    case "healthcare":
      return (
        <g transform="translate(-12 -12)">
          <path d="M 10 4 H 14 V 10 H 20 V 14 H 14 V 20 H 10 V 14 H 4 V 10 H 10 Z" {...props} />
        </g>
      );
    case "transport":
      return (
        <g transform="translate(-12 -12)">
          <rect x="5" y="3" width="14" height="14" rx="2" {...props} />
          <path d="M 5 11 H 19" {...props} />
          <circle cx="9" cy="14" r="0.8" fill={stroke} stroke="none" />
          <circle cx="15" cy="14" r="0.8" fill={stroke} stroke="none" />
        </g>
      );
    case "language":
      return (
        <g transform="translate(-12 -10)">
          <path d="M 3 4 H 21 V 14 H 13 L 9 18 V 14 H 3 Z" {...props} />
        </g>
      );
    case "retirement":
      return (
        <g transform="translate(-12 -12)">
          <path d="M 3 12 C 3 7 8 4 12 4 C 17 4 21 7 21 12 C 21 17 17 20 12 20 C 8 20 3 17 3 12 Z" {...props} />
          <path d="M 12 8 V 16 M 8 12 H 16" {...props} />
        </g>
      );
  }
}

function LockGlyph({ color }: { color: string }) {
  return (
    <g transform="translate(-12 -12)">
      <rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke={color} strokeWidth={2.4} />
      <path d="M 8 11 V 7 a 4 4 0 0 1 8 0 V 11" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  );
}
