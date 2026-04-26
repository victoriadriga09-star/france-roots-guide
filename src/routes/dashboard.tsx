import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Shell } from "@/components/Shell";
import { Cleo } from "@/components/Cleo";
import { Icon } from "@/components/Icon";
import { BottomNav } from "@/components/BottomNav";
import { CountUp } from "@/components/CountUp";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [{ title: "Dashboard — Concierge" }, { name: "description", content: "Your financial picture in France." }],
  }),
});

function Dashboard() {
  const { user, xp } = useApp();
  return (
    <div className="relative min-h-screen bg-[#0A0A0A]">
      <Shell withNav>
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <div className="flex gap-3" style={{ color: "rgba(255,255,255,0.6)" }}>
            <button>
              <Icon.Search size={22} />
            </button>
            <button>
              <Icon.Help size={22} />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative" style={{ color: "rgba(255,255,255,0.6)" }}>
              <Icon.Bell size={22} />
              <span className="absolute right-0 top-0 h-2 w-2 rounded-full" style={{ background: "#FF3B30" }} />
            </button>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full font-display font-black text-black"
              style={{ background: "linear-gradient(135deg, #B5F23D, #9AD62E)" }}
            >
              {user.name[0]}
            </div>
          </div>
        </div>

        <h1 className="font-display font-black tracking-[-1.5px]" style={{ fontSize: 36, lineHeight: 1 }}>
          <span>Your </span>
          <span style={{ color: "#B5F23D" }}>picture</span>
        </h1>

        {/* Account selector */}
        <div className="mt-4 flex items-center gap-2">
          <button
            className="flex h-10 items-center gap-2 rounded-full px-4 font-body text-sm text-white"
            style={{ background: "#1A1A1A" }}
          >
            Main Account <Icon.ChevronDown size={14} />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-white"
            style={{ background: "#1A1A1A" }}
          >
            <Icon.Plus size={16} />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full text-white"
            style={{ background: "#1A1A1A" }}
          >
            <Icon.External size={16} />
          </button>
        </div>

        {/* Card grid */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* Net worth */}
          <Card bg="#7B61FF" h={170}>
            <div className="flex justify-between">
              <div className="font-ui text-[12px]" style={{ color: "rgba(255,255,255,0.6)" }}>
                Cash
              </div>
              <Icon.External size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
            </div>
            <div className="mt-1 font-ui text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
              ▼ 24%
            </div>
            <div className="mt-2 font-display font-black leading-none text-white">
              <span className="text-[18px]">$</span>
              <CountUp to={4280} className="text-[40px]" />
              <span className="text-[20px]">k</span>
            </div>
            <div className="mt-2 font-ui text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>
              N26 · Monobank
            </div>
          </Card>

          {/* Savings rate donut */}
          <Card bg="#FFD60A" h={170} text="#000">
            <div className="font-ui text-[12px]" style={{ color: "rgba(0,0,0,0.7)" }}>
              Savings rate
            </div>
            <div className="relative mt-1 flex items-center justify-center">
              <svg viewBox="0 0 90 90" width={110} height={110}>
                <circle cx="45" cy="45" r="36" fill="none" stroke="#000" strokeWidth="8" opacity="0.15" />
                <circle
                  cx="45"
                  cy="45"
                  r="36"
                  fill="none"
                  stroke="#000"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 36}
                  strokeDashoffset={(1 - 0.65) * 2 * Math.PI * 36}
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
                />
                <circle
                  cx="45"
                  cy="45"
                  r="36"
                  fill="none"
                  stroke="#FF3B30"
                  strokeWidth="8"
                  strokeDasharray={`${0.18 * 2 * Math.PI * 36} ${2 * Math.PI * 36}`}
                  strokeLinecap="round"
                  transform="rotate(-90 45 45)"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-[20px] font-black text-black">
                  <CountUp to={28} suffix="k" />
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Monthly flow */}
        <Card bg="#FF6B35" h={180} className="mt-3">
          <div className="flex justify-between">
            <div className="font-ui text-[12px]" style={{ color: "rgba(255,255,255,0.6)" }}>
              Monthly Flow
            </div>
            <Icon.External size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
          </div>
          <div className="mt-1 font-display text-[22px] font-black text-white">$1.2k</div>
          <div className="mt-3 flex h-[80px] items-end gap-[3px]">
            {Array.from({ length: 18 }).map((_, i) => {
              const heights = [40, 55, 30, 70, 45, 90, 60, 75, 40, 65, 80, 55, 95, 70, 85, 60, 50, 75];
              return (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${heights[i]}%` }}
                  transition={{ delay: i * 0.03, type: "spring", stiffness: 220, damping: 24 }}
                  className="flex-1 rounded-t"
                  style={{ background: "rgba(255,255,255,0.85)" }}
                />
              );
            })}
          </div>
        </Card>

        <div className="mt-3 grid grid-cols-2 gap-3">
          {/* XP hexagon */}
          <div
            className="hex-clip flex h-[180px] flex-col items-center justify-center"
            style={{ background: "#4CD964" }}
          >
            <div className="font-ui text-[11px] font-bold uppercase tracking-[2px] text-white">Level</div>
            <div className="font-display text-[40px] font-black text-white">
              <CountUp to={xp} />
            </div>
            <div className="font-display text-[14px] text-white">XP</div>
            <div className="mt-1 font-ui text-[11px]" style={{ color: "rgba(255,255,255,0.8)" }}>
              ▲ 3%
            </div>
          </div>
          {/* Unclaimed */}
          <Card bg="#FF3B30" h={180}>
            <div className="font-ui text-[12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
              Unclaimed
            </div>
            <div className="font-display text-[20px] font-bold text-white">Benefits</div>
            <div className="mt-3 space-y-2">
              <div>
                <div className="h-2 w-1/3 rounded-full" style={{ background: "rgba(255,255,255,0.5)" }} />
                <div className="mt-1 font-ui text-[10px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                  €200 claimed
                </div>
              </div>
              <div>
                <div className="h-2 w-full rounded-full bg-white" />
                <div className="mt-1 font-ui text-[10px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                  €1,200 available
                </div>
              </div>
            </div>
            <div className="mt-2 font-ui text-[12px] text-white">Claim →</div>
          </Card>
        </div>

        {/* Deadlines */}
        <div className="mt-3 rounded-3xl p-5" style={{ background: "#1A1A1A", borderLeft: "4px solid #B5F23D" }}>
          <div className="font-display text-[15px] font-bold text-white">Coming up</div>
          <div className="mt-3 space-y-3">
            {[
              { c: "#FF3B30", t: "Tax declaration", d: "May 31" },
              { c: "#FF6B35", t: "CAF application", d: "June 15" },
              { c: "#B5F23D", t: "N26 card arrives", d: "this week" },
            ].map((d) => (
              <div key={d.t} className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full" style={{ background: d.c }} />
                <div className="flex-1 font-body text-sm text-white">{d.t}</div>
                <div className="font-ui text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {d.d}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cleo suggestion */}
        <div
          className="mt-3 flex items-start gap-3 rounded-3xl p-4"
          style={{ background: "#1A1A1A", borderLeft: "4px solid #B5F23D" }}
        >
          <Cleo state="guiding" size={48} />
          <div>
            <div className="font-display text-[14px] font-bold text-white">Cleo's tip</div>
            <div className="mt-1 font-body text-[13px]" style={{ color: "rgba(255,255,255,0.7)" }}>
              You're €1,000+ in unclaimed benefits. Tap to start a CAF claim.
            </div>
          </div>
        </div>
      </Shell>
      <BottomNav />
    </div>
  );
}

function Card({
  bg,
  children,
  h,
  text = "#FFF",
  className,
}: {
  bg: string;
  children: React.ReactNode;
  h: number;
  text?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl p-4 shadow-vivid ${className ?? ""}`}
      style={{ background: bg, color: text, height: h }}
    >
      {children}
    </div>
  );
}
