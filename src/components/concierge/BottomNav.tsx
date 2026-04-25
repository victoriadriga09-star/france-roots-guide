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
      <div className="mx-3 mb-2 glass-dark rounded-[24px] shadow-deep relative overflow-hidden">
        {/* subtle inner top sheen */}
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-jungle/40 to-transparent" />
        <div className="flex items-stretch justify-around px-2 py-2.5 relative">
          {items.map(({ to, label, Icon }) => {
            const active =
              pathname === to || (to === "/home" && pathname.startsWith("/level"));
            return (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center gap-1 px-2 py-1 flex-1 transition-transform active:scale-95 relative"
              >
                {active && (
                  <motion.div
                    layoutId="navActive"
                    className="absolute inset-0 bg-jungle/15 rounded-2xl border border-jungle/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className="relative h-7 w-7 flex items-center justify-center">
                  <Icon
                    size={20}
                    className={active ? "text-jungle" : "text-porcelain/65"}
                    strokeWidth={active ? 2.4 : 2}
                  />
                </div>
                <span
                  className={`text-[10px] font-bold tracking-wide relative ${
                    active ? "text-porcelain" : "text-porcelain/55"
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
