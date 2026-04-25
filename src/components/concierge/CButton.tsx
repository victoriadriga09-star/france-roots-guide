import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "white" | "yellow" | "mint";

interface CButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

/**
 * Chunky 3D button — Duolingo-style with bottom shadow that depresses on tap.
 */
const variantClass: Record<Variant, string> = {
  primary: "btn-3d btn-3d-sky border-2 border-ink",
  secondary: "bg-white text-ink border-2 border-ink btn-3d",
  ghost: "bg-transparent text-ink hover:bg-white/40",
  white: "bg-white text-ink border-2 border-ink btn-3d",
  yellow: "btn-3d btn-3d-yellow border-2 border-ink",
  mint: "btn-3d btn-3d-mint border-2 border-ink",
};

const sizeClass = {
  sm: "h-[42px] text-[13px] px-4 rounded-[12px]",
  md: "h-[54px] text-[15px] px-5 rounded-[16px]",
  lg: "h-[60px] text-[17px] px-6 rounded-[18px]",
};

export const CButton = React.forwardRef<HTMLButtonElement, CButtonProps>(
  (
    { className, variant = "primary", fullWidth = true, size = "md", children, disabled, ...props },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={disabled ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.1 }}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-extrabold tracking-[0.3px] uppercase",
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
