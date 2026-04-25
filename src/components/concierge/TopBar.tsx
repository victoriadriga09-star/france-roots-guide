import { ChevronLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

interface TopBarProps {
  title?: string;
  right?: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  progress?: { value: number; max: number }; // for onboarding-style progress
}

export function TopBar({ title, right, onBack, showBack = true, progress }: TopBarProps) {
  const router = useRouter();
  const handleBack = () => (onBack ? onBack() : router.history.back());

  return (
    <div
      className="sticky top-0 z-30 bg-jet/95 backdrop-blur px-6 pb-3"
      style={{ paddingTop: "max(14px, env(safe-area-inset-top))" }}
    >
      <div className="flex items-center gap-3 h-11">
        {showBack ? (
          <button
            onClick={handleBack}
            aria-label="Back"
            className="h-9 w-9 -ml-2 rounded-full flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            <ChevronLeft size={24} />
          </button>
        ) : (
          <div className="w-2" />
        )}
        {progress ? (
          <div className="flex-1 h-1.5 rounded-full bg-slate-blue overflow-hidden">
            <div
              className="h-full bg-coral rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(progress.value / progress.max) * 100}%` }}
            />
          </div>
        ) : (
          <div className="flex-1 text-center text-[15px] font-semibold text-white truncate">
            {title}
          </div>
        )}
        <div className="min-w-[36px] flex justify-end">{right}</div>
      </div>
    </div>
  );
}
