import { ChevronLeft } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

interface TopBarProps {
  title?: string;
  right?: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  progress?: { value: number; max: number };
}

export function TopBar({ title, right, onBack, showBack = true, progress }: TopBarProps) {
  const router = useRouter();
  const handleBack = () => (onBack ? onBack() : router.history.back());

  return (
    <div
      className="sticky top-0 z-30 px-5 pb-3"
      style={{
        paddingTop: "max(14px, env(safe-area-inset-top))",
        background:
          "linear-gradient(180deg, rgba(199,210,238,0.95) 0%, rgba(169,175,209,0.85) 100%)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex items-center gap-3 h-11">
        {showBack ? (
          <button
            onClick={handleBack}
            aria-label="Back"
            className="h-10 w-10 -ml-1 rounded-full flex items-center justify-center bg-white border-2 border-ink shadow-[0_3px_0_rgba(31,34,54,0.85)] active:translate-y-0.5 active:shadow-[0_1px_0_rgba(31,34,54,0.85)] transition-all text-ink"
          >
            <ChevronLeft size={22} strokeWidth={2.6} />
          </button>
        ) : (
          <div className="w-2" />
        )}
        {progress ? (
          <div className="flex-1 h-3 rounded-full bg-white/50 border-2 border-ink overflow-hidden">
            <div
              className="h-full bg-pop-mint rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${(progress.value / progress.max) * 100}%` }}
            >
              <span className="absolute inset-x-0 top-0 h-1/2 bg-white/40 rounded-t-full" />
            </div>
          </div>
        ) : (
          <div className="flex-1 text-center text-[16px] font-extrabold text-ink truncate">
            {title}
          </div>
        )}
        <div className="min-w-[40px] flex justify-end">{right}</div>
      </div>
    </div>
  );
}
