import { Link, useLocation } from "@tanstack/react-router";
import { Map, BarChart3, Bell, User } from "lucide-react";

const items = [
  { to: "/home", label: "My Path", Icon: Map },
  { to: "/dashboard", label: "Dashboard", Icon: BarChart3 },
  { to: "/deadlines", label: "Deadlines", Icon: Bell },
  { to: "/profile", label: "Profile", Icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-jet border-t border-slate-blue/60 z-40"
      style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-stretch justify-around pt-2">
        {items.map(({ to, label, Icon }) => {
          const active = pathname === to || (to === "/home" && pathname.startsWith("/level"));
          return (
            <Link
              key={to}
              to={to}
              className="flex flex-col items-center gap-1 px-3 py-2 flex-1 transition-transform active:scale-95"
            >
              <Icon
                size={22}
                className={active ? "text-coral" : "text-silver"}
                strokeWidth={active ? 2.4 : 2}
              />
              <span
                className={`text-[10px] font-semibold tracking-wide ${
                  active ? "text-coral" : "text-silver"
                }`}
              >
                {label}
              </span>
              <span
                className={`h-1 w-1 rounded-full ${active ? "bg-coral" : "bg-transparent"}`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
