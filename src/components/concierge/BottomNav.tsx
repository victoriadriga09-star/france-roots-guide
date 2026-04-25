import { Link, useLocation } from "@tanstack/react-router";
import { Map, BarChart3, Bell, User } from "lucide-react";

const items = [
  { to: "/home", label: "Path", Icon: Map },
  { to: "/dashboard", label: "Wallet", Icon: BarChart3 },
  { to: "/deadlines", label: "Quests", Icon: Bell },
  { to: "/profile", label: "Me", Icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40"
      style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
    >
      <div className="mx-3 mb-2 bg-white border-2 border-ink rounded-[22px] shadow-[0_5px_0_rgba(31,34,54,0.85)]">
        <div className="flex items-stretch justify-around px-2 py-2">
          {items.map(({ to, label, Icon }) => {
            const active =
              pathname === to || (to === "/home" && pathname.startsWith("/level"));
            return (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-0.5 px-2 py-1.5 flex-1 transition-transform active:scale-95"
              >
                <div
                  className={`h-9 w-9 rounded-full flex items-center justify-center transition-all ${
                    active
                      ? "bg-sky border-2 border-ink scale-110"
                      : "bg-transparent"
                  }`}
                >
                  <Icon
                    size={20}
                    className="text-ink"
                    strokeWidth={active ? 2.6 : 2.2}
                  />
                </div>
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wide ${
                    active ? "text-ink" : "text-lavender"
                  }`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
