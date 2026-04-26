import { motion } from "framer-motion";
import type { CSSProperties } from "react";

/**
 * Editorial — mixed-color, large-scale magazine-style heading.
 * Pass an array of word segments, each with its own color.
 *
 * <Editorial size="hero" parts={[
 *   { t: "Build", c: "lemon" },
 *   { t: "your", c: "white" },
 *   { t: "financial", c: "lilac" },
 *   { t: "life.", c: "white" },
 * ]} />
 */

export type EditorialColor =
  | "white"
  | "lemon"
  | "lilac"
  | "pink"
  | "vivid-purple"
  | "vivid-orange"
  | "vivid-green"
  | "vivid-red"
  | "vivid-yellow";

export interface EditorialPart {
  t: string;
  c?: EditorialColor;
}

const COLOR_MAP: Record<EditorialColor, string> = {
  white: "#FFFFFF",
  lemon: "#F8FFA1",
  lilac: "#A8A3F8",
  pink: "#F6C6EE",
  "vivid-purple": "#7B61FF",
  "vivid-orange": "#FF6B35",
  "vivid-green": "#32D74B",
  "vivid-red": "#FF3B30",
  "vivid-yellow": "#FFD60A",
};

const SIZE_MAP: Record<
  "hero" | "h1" | "h2" | "h3",
  { fontSize: string; tracking: string; lineHeight: number }
> = {
  hero: { fontSize: "clamp(40px, 12vw, 64px)", tracking: "-3px", lineHeight: 0.9 },
  h1:   { fontSize: "clamp(32px, 9vw, 44px)",  tracking: "-1.5px", lineHeight: 0.95 },
  h2:   { fontSize: "clamp(26px, 7vw, 32px)",  tracking: "-1px", lineHeight: 1.05 },
  h3:   { fontSize: "20px",                    tracking: "-0.5px", lineHeight: 1.15 },
};

interface EditorialProps {
  parts: EditorialPart[];
  size?: "hero" | "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  /** When true, words break onto separate lines */
  stacked?: boolean;
  /** Stagger delay in seconds between words */
  delay?: number;
}

export function Editorial({
  parts,
  size = "h1",
  align = "left",
  className,
  stacked = false,
  delay = 0,
}: EditorialProps) {
  const s = SIZE_MAP[size];
  const style: CSSProperties = {
    fontFamily: "Unbounded, ui-sans-serif, system-ui",
    fontWeight: 900,
    fontSize: s.fontSize,
    letterSpacing: s.tracking,
    lineHeight: s.lineHeight,
    textAlign: align,
  };

  return (
    <h1 style={style} className={className}>
      {parts.map((p, i) => (
        <motion.span
          key={`${p.t}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: delay + i * 0.06,
            duration: 0.45,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          style={{
            color: COLOR_MAP[p.c ?? "white"],
            display: stacked ? "block" : "inline-block",
            marginRight: stacked ? 0 : "0.28em",
          }}
        >
          {p.t}
        </motion.span>
      ))}
    </h1>
  );
}
