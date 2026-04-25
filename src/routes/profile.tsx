import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bell, Globe2, Lock, MessageCircle, Pencil, LogOut, ChevronRight, Plus } from "lucide-react";
import { CCard, Pill } from "@/components/concierge/CCard";
import { BottomNav } from "@/components/concierge/BottomNav";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  const { onboarding, xp, streak, questsDone, reset } = useApp();
  const navigate = useNavigate();
  const initial = onboarding.name.charAt(0).toUpperCase();

  return (
    <div className="mobile-shell pb-28">
      <div
        className="px-6 pt-6 pb-2 flex flex-col items-center"
        style={{ paddingTop: "max(24px, env(safe-area-inset-top))" }}
      >
        <div className="h-[72px] w-[72px] rounded-full bg-coral text-white text-[32px] font-extrabold flex items-center justify-center">
          {initial}
        </div>
        <h1 className="text-white text-[22px] font-bold mt-3">{onboarding.name}</h1>
        <div className="mt-2"><Pill>Level 1 — Newcomer</Pill></div>
        <p className="text-silver text-[12px] mt-1">⚡ {xp} XP</p>
      </div>

      <div className="px-6 mt-5">
        <CCard delay={0.05}>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat n={questsDone} l="Quests done" />
            <Stat n={`${streak}🔥`} l="Day streak" />
            <Stat n="€200" l="€ unlocked" />
          </div>
        </CCard>
      </div>

      <div className="px-6 mt-5">
        <p className="text-silver text-[12px] uppercase tracking-wider font-semibold mb-2">
          Your countries
        </p>
        <CCard delay={0.1}>
          <div className="flex items-center gap-3">
            <div className="text-[28px]">{onboarding.fromCountryFlag}</div>
            <div className="flex-1">
              <p className="text-white text-[14px] font-semibold">Home — {onboarding.fromCountry}</p>
            </div>
            <div className="text-[28px] ring-2 ring-coral rounded-full p-1">🇫🇷</div>
            <div className="flex-1">
              <p className="text-white text-[14px] font-semibold">Current — France</p>
            </div>
          </div>
          <button className="mt-3 text-silver text-[13px] flex items-center gap-1">
            <Plus size={14} /> Add country
          </button>
        </CCard>
      </div>

      <div className="px-6 mt-5">
        <CCard delay={0.15} className="!p-0 overflow-hidden">
          <Row icon={<Bell size={18} />} label="Notifications" />
          <Divider />
          <Row icon={<Globe2 size={18} />} label="Language (English)" />
          <Divider />
          <Row icon={<Lock size={18} />} label="Privacy & data" />
          <Divider />
          <Row icon={<MessageCircle size={18} />} label="Help & support" />
          <Divider />
          <Row icon={<Pencil size={18} />} label="Update my profile" />
        </CCard>
      </div>

      <div className="px-6 mt-5">
        <button
          onClick={() => {
            reset();
            navigate({ to: "/" });
          }}
          className="w-full flex items-center justify-center gap-2 py-3 text-coral font-bold text-[15px]"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

function Stat({ n, l }: { n: React.ReactNode; l: string }) {
  return (
    <div>
      <p className="text-coral text-[20px] font-extrabold">{n}</p>
      <p className="text-silver text-[11px] mt-0.5">{l}</p>
    </div>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full px-5 py-4 flex items-center gap-3 text-left active:bg-jet/30 transition">
      <span className="text-coral">{icon}</span>
      <span className="text-white text-[14px] flex-1">{label}</span>
      <ChevronRight size={16} className="text-silver" />
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-jet/40 mx-5" />;
}
