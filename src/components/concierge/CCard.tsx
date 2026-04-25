import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CCardProps extends React.HTMLAttributes<HTMLDivElement> {
  highlight?: boolean;
  delay?: number;
  animate?: boolean;
}

export function CCard({
  className,
  highlight,
  delay = 0,
  animate = true,
  children,
  ...rest
}: CCardProps) {
  const Comp: any = animate ? motion.div : "div";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, delay, ease: "easeOut" as const },
      }
    : {};
  return (
    <Comp
      {...motionProps}
      className={cn(
        "bg-slate-blue rounded-[20px] p-5",
        highlight && "ring-1 ring-coral/40 shadow-[0_10px_30px_-12px_rgba(239,131,84,0.4)]",
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
}: {
  value: number;
  max?: number;
  className?: string;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn("w-full h-1.5 rounded-full bg-slate-blue overflow-hidden", className)}>
      <motion.div
        className="h-full bg-coral rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

export function Pill({
  children,
  variant = "coral",
  className,
}: {
  children: React.ReactNode;
  variant?: "coral" | "silver" | "outline";
  className?: string;
}) {
  const styles = {
    coral: "bg-coral/15 text-coral",
    silver: "bg-white/10 text-silver",
    outline: "border border-coral/60 text-coral",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-[12px] font-semibold",
        styles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
