import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CCardProps extends React.HTMLAttributes<HTMLDivElement> {
  highlight?: boolean;
  delay?: number;
  animate?: boolean;
  tone?: "default" | "yellow" | "mint" | "coral" | "ink" | "dark" | "forest";
}

/**
 * Premium layered card — soft gradient, hairline border, deep shadow.
 */
export function CCard({
  className,
  highlight,
  delay = 0,
  animate = true,
  tone = "default",
  children,
  ...rest
}: CCardProps) {
  const Comp: any = animate ? motion.div : "div";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 16, scale: 0.985 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as any },
      }
    : {};

  const toneClass = {
    default: "bg-white border-ink-black/8 text-ink shadow-soft",
    yellow: "bg-gradient-gold border-ink-black/15 text-ink shadow-soft",
    mint: "bg-[#E6F4DD] border-jungle/25 text-ink shadow-soft",
    coral: "bg-[#FFE6DC] text-ink border-ink-black/8 shadow-soft",
    ink: "bg-white text-ink border-ink-black/8 shadow-soft",
    dark: "bg-white text-ink border-ink-black/8 shadow-soft",
    forest: "bg-gradient-forest text-porcelain border-ink-black/15 shadow-coral-glow",
  }[tone];

  return (
    <Comp
      {...motionProps}
      className={cn(
        "rounded-[24px] p-5 border backdrop-blur-sm relative overflow-hidden",
        toneClass,
        highlight && "ring-2 ring-jungle/60",
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
}

export function ProgressBar({
  value,
  max = 100,
  className,
  tone = "sky",
}: {
  value: number;
  max?: number;
  className?: string;
  tone?: "sky" | "yellow" | "mint" | "dark";
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fillColor = {
    sky: "bg-gradient-to-r from-jungle to-forest",
    yellow: "bg-gradient-to-r from-[#FFD86B] to-[#E5A82E]",
    mint: "bg-jungle",
    dark: "bg-ink-black",
  }[tone];
  return (
    <div
      className={cn(
        "w-full h-2.5 rounded-full bg-ink-black/10 overflow-hidden",
        className,
      )}
    >
      <motion.div
        className={cn("h-full rounded-full relative overflow-hidden", fillColor)}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="absolute inset-x-0 top-0 h-1/2 bg-white/30 rounded-t-full" />
      </motion.div>
    </div>
  );
}

export function Pill({
  children,
  variant = "coral",
  className,
}: {
  children: React.ReactNode;
  variant?: "coral" | "silver" | "outline" | "yellow" | "mint" | "ink" | "forest" | "ghost";
  className?: string;
}) {
  const styles = {
    coral: "bg-jungle/15 text-forest border-jungle/30",
    silver: "bg-moss-soft text-ink border-ink/10",
    outline: "bg-transparent text-ink border-ink/30",
    yellow: "bg-gold/20 text-ink border-gold/40",
    mint: "bg-pop-mint text-ink border-ink/15",
    ink: "bg-ink-black text-porcelain border-ink-black",
    forest: "bg-forest text-porcelain border-forest",
    ghost: "bg-porcelain/10 text-porcelain border-porcelain/20",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide border",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
