import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CCardProps extends React.HTMLAttributes<HTMLDivElement> {
  highlight?: boolean;
  delay?: number;
  animate?: boolean;
  tone?: "default" | "yellow" | "mint" | "coral" | "ink";
}

/**
 * Playful glass-y card with a chunky bottom shadow.
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
        initial: { opacity: 0, y: 16, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: { duration: 0.35, delay, ease: [0.34, 1.56, 0.64, 1] as any },
      }
    : {};

  const toneClass = {
    default: "bg-white/85 border-ink/15",
    yellow: "bg-pop-yellow border-ink/20",
    mint: "bg-pop-mint border-ink/20",
    coral: "bg-pop-coral text-white border-ink/30",
    ink: "bg-ink text-white border-ink",
  }[tone];

  return (
    <Comp
      {...motionProps}
      className={cn(
        "rounded-[24px] p-5 border-2 backdrop-blur",
        "shadow-[0_5px_0_rgba(31,34,54,0.15),0_18px_36px_-18px_rgba(31,34,54,0.4)]",
        toneClass,
        highlight && "ring-4 ring-sky/50",
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
  tone?: "sky" | "yellow" | "mint";
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fillColor = {
    sky: "bg-sky",
    yellow: "bg-pop-yellow",
    mint: "bg-pop-mint",
  }[tone];
  return (
    <div
      className={cn(
        "w-full h-3 rounded-full bg-ink/15 overflow-hidden border border-ink/10",
        className,
      )}
    >
      <motion.div
        className={cn("h-full rounded-full relative overflow-hidden", fillColor)}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="absolute inset-x-0 top-0 h-1/2 bg-white/40 rounded-t-full" />
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
  variant?: "coral" | "silver" | "outline" | "yellow" | "mint" | "ink";
  className?: string;
}) {
  const styles = {
    coral: "bg-sky/40 text-ink border-ink/15",
    silver: "bg-white/60 text-ink border-ink/10",
    outline: "bg-transparent text-ink border-ink/40",
    yellow: "bg-pop-yellow text-ink border-ink/25",
    mint: "bg-pop-mint text-ink border-ink/25",
    ink: "bg-ink text-white border-ink",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-extrabold border-2",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
