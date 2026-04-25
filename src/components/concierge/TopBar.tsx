import { ChevronLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

interface TopBarProps {
  title?: string;
  right?: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  progress?: { value: number; max: number };
  variant?: "light" | "dark";
}

export function TopBar({ title, right, onBack, showBack = true, progress, variant = "light" }: TopBarProps) {
  const router = useRouter();
  const handleBack = () => (onBack ? onBack() : router.history.back());

  const isDark = variant === "dark";

  return (
    <div
      className={`sticky top-0 z-30 px-5 pb-3 ${isDark ? "glass-dark" : "glass-light"}`}
      style={{
        paddingTop: "max(14px, env(safe-area-inset-top))",
      }}
    >
      <div className="flex items-center gap-3 h-11">
        {showBack ? (
          <button
            onClick={handleBack}
            aria-label="Back"
            className={`h-10 w-10 -ml-1 rounded-full flex items-center justify-center transition-all active:scale-95 ${
              isDark
                ? "bg-jet-black border border-porcelain/15 text-porcelain"
                : "bg-white border border-ink-black/10 text-ink shadow-soft"
            }`}
          >
            <ChevronLeft size={20} strokeWidth={2.4} />
          </button>
        ) : (
          <div className="w-2" />
        )}
        {progress ? (
          <div className={`flex-1 h-2.5 rounded-full overflow-hidden ${isDark ? "bg-porcelain/15" : "bg-ink-black/10"}`}>
            <div
              className="h-full bg-gradient-to-r from-jungle to-forest rounded-full transition-all duration-700 ease-out relative"
              style={{ width: `${(progress.value / progress.max) * 100}%` }}
            >
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white/30 rounded-t-full" />
            </div>
          </div>
        ) : (
          <div className={`flex-1 text-center text-[15px] font-bold font-display truncate ${isDark ? "text-porcelain" : "text-ink"}`}>
            {title}
          </div>
        )}
        <div className="min-w-[40px] flex justify-end">{right}</div>
      </div>
    </div>
  );
}
