import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "white" | "yellow" | "mint" | "dark" | "outline" | "lilac" | "pink";

interface CButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

const variantClass: Record<Variant, string> = {
  primary: "bg-gradient-lemon text-black border border-black/20 shadow-lemon",
  secondary: "bg-transparent text-lemon border-[1.5px] border-lemon",
  ghost: "bg-transparent text-white hover:bg-white/5",
  white: "bg-white text-black border border-black/12",
  yellow: "bg-gradient-lemon text-black shadow-lemon",
  mint: "bg-gradient-lemon text-black shadow-lemon",
  dark: "bg-navy text-white border border-white/10",
  outline: "bg-transparent text-lemon border-[1.5px] border-lemon",
  lilac: "bg-gradient-lilac text-black shadow-lilac",
  pink: "bg-gradient-pink text-black shadow-pink",
};

const sizeClass = {
  sm: "h-[44px] text-[13px] px-4 rounded-[12px]",
  md: "h-[52px] text-[14px] px-5 rounded-[14px]",
  lg: "h-[56px] text-[15px] px-6 rounded-[14px]",
};

export const CButton = React.forwardRef<HTMLButtonElement, CButtonProps>(
  (
    { className, variant = "primary", fullWidth = true, size = "lg", children, disabled, ...props },
    ref,
  ) => {
    return (
      <motion.button
        ref={ref}
        whileTap={disabled ? undefined : { scale: 0.96 }}
        transition={{ duration: 0.12 }}
        disabled={disabled}
        onClick={(e) => {
          if (typeof navigator !== "undefined" && "vibrate" in navigator) {
            try { navigator.vibrate?.(10); } catch {}
          }
          props.onClick?.(e as any);
        }}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-bold tracking-[0.4px] font-display",
          sizeClass[size],
          fullWidth && "w-full",
          variantClass[variant],
          disabled && "opacity-30 cursor-not-allowed pointer-events-none",
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
