import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "white" | "yellow" | "mint" | "dark" | "outline";

interface CButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

const variantClass: Record<Variant, string> = {
  primary: "btn-3d btn-3d-sky",
  secondary: "bg-white text-ink border border-ink/12 btn-3d shadow-soft",
  ghost: "bg-transparent text-ink hover:bg-ink-black/5",
  white: "bg-white text-ink border border-ink/12 btn-3d shadow-soft",
  yellow: "btn-3d btn-3d-yellow",
  mint: "btn-3d btn-3d-mint",
  dark: "btn-3d btn-3d-dark",
  outline: "bg-transparent text-ink border-2 border-ink/80 btn-3d",
};

const sizeClass = {
  sm: "h-[44px] text-[13px] px-4 rounded-[14px]",
  md: "h-[54px] text-[14px] px-5 rounded-[16px]",
  lg: "h-[60px] text-[15px] px-6 rounded-[18px]",
};

export const CButton = React.forwardRef<HTMLButtonElement, CButtonProps>(
  (
    { className, variant = "primary", fullWidth = true, size = "md", children, disabled, ...props },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.12 }}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-bold tracking-[0.4px] uppercase font-display",
          sizeClass[size],
          fullWidth && "w-full",
          variantClass[variant],
          disabled && "opacity-40 grayscale cursor-not-allowed pointer-events-none",
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
