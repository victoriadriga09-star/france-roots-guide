import { motion } from "framer-motion";

type CleoPose = "default" | "celebrating" | "thinking" | "guiding";

interface CleoProps {
  pose?: CleoPose;
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * Cleo — the Concierge mascot.
 * A geometric rounded-square character with a key icon on the chest.
 * Pose is conveyed through body / arm position only (no mouth).
 */
export function Cleo({ pose = "default", size = 80, className = "", animated = true }: CleoProps) {
  const w = size;
  const h = size;

  // Arm + key positions per pose
  const renderPose = () => {
    switch (pose) {
      case "celebrating":
        return (
          <>
            {/* Arms up */}
            <line x1="22" y1="55" x2="14" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="78" y1="55" x2="86" y2="32" stroke="white" strokeWidth="3" strokeLinecap="round" />
            {/* Spinning key */}
            <motion.g
              animate={animated ? { rotate: 360 } : undefined}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50px 65px" }}
            >
              <KeyIcon />
            </motion.g>
          </>
        );
      case "thinking":
        return (
          <>
            {/* One arm to chin */}
            <line x1="22" y1="55" x2="35" y2="42" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="78" y1="55" x2="82" y2="70" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <KeyIcon x={32} y={36} small />
          </>
        );
      case "guiding":
        return (
          <>
            {/* Pointing arm */}
            <line x1="22" y1="55" x2="18" y2="68" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="78" y1="55" x2="92" y2="48" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <circle cx="94" cy="46" r="3" fill="#EF8354" />
            <KeyIcon />
          </>
        );
      default:
        return (
          <>
            <line x1="22" y1="55" x2="18" y2="72" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <line x1="78" y1="55" x2="82" y2="72" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <KeyIcon />
          </>
        );
    }
  };

  const headTilt = pose === "thinking" ? -8 : 0;

  return (
    <div className={className} style={{ width: w, height: h }}>
      <svg viewBox="0 0 100 100" width={w} height={h}>
        {/* Body */}
        <motion.g
          animate={animated && pose === "default" ? { y: [0, -3, 0] } : undefined}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <g transform={`rotate(${headTilt} 50 50)`}>
            <rect
              x="22"
              y="22"
              width="56"
              height="60"
              rx="18"
              fill="#2D3142"
              stroke="white"
              strokeWidth="3"
            />
            {/* Eyes */}
            <circle cx="40" cy="44" r="3.2" fill="white" />
            <circle cx="60" cy="44" r="3.2" fill="white" />
            {/* Cheek dots */}
            <circle cx="34" cy="54" r="1.5" fill="#EF8354" opacity="0.7" />
            <circle cx="66" cy="54" r="1.5" fill="#EF8354" opacity="0.7" />
          </g>
          {renderPose()}
          {/* Feet */}
          <rect x="34" y="82" width="10" height="6" rx="3" fill="white" />
          <rect x="56" y="82" width="10" height="6" rx="3" fill="white" />
        </motion.g>
      </svg>
    </div>
  );
}

function KeyIcon({ x = 42, y = 58, small = false }: { x?: number; y?: number; small?: boolean }) {
  const s = small ? 0.7 : 1;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="6" cy="6" r="5" fill="none" stroke="#EF8354" strokeWidth="2.2" />
      <line x1="11" y1="6" x2="20" y2="6" stroke="#EF8354" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="17" y1="6" x2="17" y2="10" stroke="#EF8354" strokeWidth="2.2" strokeLinecap="round" />
    </g>
  );
}
