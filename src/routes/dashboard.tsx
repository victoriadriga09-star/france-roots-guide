import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CCard, Pill, ProgressBar } from "@/components/concierge/CCard";
import { BottomNav } from "@/components/concierge/BottomNav";
import { Cleo } from "@/components/concierge/Cleo";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { quest, questsDone } = useApp();
  const hasBank = quest.bankActive;
  return (
    <div className="mobile-shell pb-28">
      <div
        className="px-6 pt-4 pb-3"
        style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
      >
        <h1 className="text-white text-[24px] font-bold">Your financial picture 📊</h1>
        <p className="text-silver text-[12px]">Last updated: today</p>
      </div>

      <div className="px-6 space-y-4">
        <CCard
          delay={0.05}
          className="relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #4F5D75 0%, #2D3142 100%)" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between">
            <p className="text-silver text-[11px] uppercase tracking-wider font-semibold">
              Total across all accounts
            </p>
            <span className="text-[11px] bg-jet/40 text-white px-2 py-1 rounded-full font-semibold">
              EUR / UAH
            </span>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-[36px] font-extrabold mt-1"
          >
            €{hasBank ? "4,280" : "1,800"}
          </motion.p>
          <div className="mt-3 flex flex-wrap gap-2">
            {hasBank && (
              <span className="bg-jet/40 text-white text-[12px] rounded-full px-3 py-1.5">
                🇫🇷 Société Générale €2,480
              </span>
            )}
            <span className="bg-jet/40 text-white text-[12px] rounded-full px-3 py-1.5">
              🇺🇦 Monobank €1,800 equiv.
            </span>
          </div>
          <p className="text-silver text-[11px] mt-3">Last synced: just now</p>
        </CCard>

        <CCard delay={0.1}>
          <p className="text-silver text-[11px] uppercase tracking-wider font-semibold mb-3">
            This month
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-silver text-[12px]">💰 Income</p>
              <p className="text-[color:var(--success)] text-[20px] font-bold">€2,200</p>
            </div>
            <div>
              <p className="text-silver text-[12px]">💸 Expenses</p>
              <p className="text-coral text-[20px] font-bold">€1,620</p>
            </div>
          </div>
          <div className="mt-3 h-2 rounded-full overflow-hidden flex">
            <div className="h-full bg-[color:var(--success)]" style={{ width: "58%" }} />
            <div className="h-full bg-coral" style={{ width: "42%" }} />
          </div>
        </CCard>

        <CCard delay={0.15}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white text-[16px] font-bold">Unclaimed benefits 💡</h3>
            <Pill>€1,200/year</Pill>
          </div>
          <div className="space-y-2 mt-2">
            {[
              { n: "CAF — Housing", v: "€200/mo" },
              { n: "Prime d'Activité", v: "€150/mo" },
            ].map((b) => (
              <div key={b.n} className="flex items-center justify-between bg-jet/30 rounded-xl px-3 py-2.5">
                <div>
                  <p className="text-white text-[13px] font-semibold">{b.n}</p>
                  <p className="text-silver text-[11px]">{b.v}</p>
                </div>
                <Link to="/level/benefits" className="text-coral text-[12px] font-bold">
                  Claim →
                </Link>
              </div>
            ))}
          </div>
        </CCard>

        <CCard delay={0.2}>
          <h3 className="text-white text-[16px] font-bold mb-3">Deadlines 🗓</h3>
          <div className="space-y-2">
            {[
              { c: "bg-coral", n: "Tax declaration", d: "May 31 · 36 days" },
              { c: "bg-[color:var(--warning)]", n: "CAF renewal", d: "Jun 15 · 51 days" },
              { c: "bg-[color:var(--success)]", n: "Carte de séjour", d: "Aug 12 · 109 days" },
            ].map((d) => (
              <div key={d.n} className="flex items-center gap-3">
                <span className={`h-2 w-2 rounded-full ${d.c}`} />
                <p className="text-white text-[13px] flex-1">{d.n}</p>
                <p className="text-silver text-[11px]">{d.d}</p>
              </div>
            ))}
          </div>
        </CCard>

        <CCard delay={0.25} className="border-l-4 border-coral">
          <div className="flex items-start gap-3">
            <Cleo pose="guiding" size={40} animated={false} />
            <div className="flex-1">
              <p className="text-silver text-[10px] uppercase tracking-wider font-semibold">
                ✨ Cleo suggests
              </p>
              <p className="text-white text-[14px] mt-1 leading-snug">
                You could be receiving <b>€350/month</b> in benefits already. Apply to CAF first —
                it unlocks 2 other aids automatically.
              </p>
              <Link to="/level/benefits" className="text-coral text-[13px] font-bold mt-2 inline-block">
                → Show me how
              </Link>
            </div>
          </div>
        </CCard>

        <CCard delay={0.3}>
          <p className="text-white text-[14px] font-semibold">
            Your journey: {questsDone} of 12 quests done
          </p>
          <ProgressBar value={questsDone} max={12} className="mt-2" />
          <Link to="/home" className="mt-3 inline-flex items-center gap-1 text-coral font-bold text-[13px]">
            Continue <ArrowRight size={14} />
          </Link>
        </CCard>
      </div>

      <BottomNav />
    </div>
  );
}
