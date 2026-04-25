import { Link, useLocation } from "@tanstack/react-router";
import { Mountain, Wallet, Bell, User } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { to: "/home", label: "Journey", Icon: Mountain },
  { to: "/dashboard", label: "Wallet", Icon: Wallet },
  { to: "/deadlines", label: "Quests", Icon: Bell },
  { to: "/profile", label: "Me", Icon: User },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-40"
      style={{ paddingBottom: "max(10px, env(safe-area-inset-bottom))" }}
    >
      <div
        className="mx-3 mb-2 rounded-[26px] relative overflow-hidden bg-white/95 backdrop-blur-xl border border-ink-black/8"
        style={{
          boxShadow:
            "0 1px 0 rgba(255,255,255,0.9) inset, 0 -1px 0 rgba(4,15,15,0.04) inset, 0 14px 30px -10px rgba(36,130,50,0.18), 0 4px 14px -4px rgba(4,15,15,0.10)",
        }}
      >
        <div className="flex items-stretch justify-around px-2 py-2 relative">
          {items.map(({ to, label, Icon }) => {
            const active =
              pathname === to || (to === "/home" && pathname.startsWith("/level"));
            return (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-0.5 px-2 py-1.5 flex-1 transition-transform active:scale-95 relative"
              >
                {active && (
                  <motion.div
                    layoutId="navActive"
                    className="absolute inset-0 bg-gradient-to-b from-[#DDF1D6] to-[#C7E8B8] rounded-2xl border border-jungle/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className="relative h-7 w-7 flex items-center justify-center">
                  <Icon
                    size={20}
                    className={active ? "text-forest" : "text-ink/50"}
                    strokeWidth={active ? 2.6 : 2.2}
                  />
                </div>
                <span
                  className={`text-[10px] font-bold tracking-wide relative ${
                    active ? "text-forest" : "text-ink/55"
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
