import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "white";

interface CButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  fullWidth?: boolean;
}

const styles: Record<Variant, string> = {
  primary:
    "bg-coral text-white shadow-[0_8px_24px_-8px_rgba(239,131,84,0.6)] hover:brightness-105 disabled:opacity-40 disabled:shadow-none",
  secondary:
    "bg-transparent text-coral border-[1.5px] border-coral hover:bg-coral/10 disabled:opacity-40",
  ghost: "bg-transparent text-silver hover:text-white",
  white: "bg-white text-coral hover:bg-white/90",
};

export const CButton = React.forwardRef<HTMLButtonElement, CButtonProps>(
  ({ className, variant = "primary", fullWidth = true, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.15 }}
        className={cn(
          "h-[52px] rounded-[14px] inline-flex items-center justify-center gap-2 font-semibold text-[16px] tracking-[0.3px] transition-[filter,background,color] disabled:cursor-not-allowed",
          fullWidth && "w-full",
          styles[variant],
          className,
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  },
);
CButton.displayName = "CButton";
