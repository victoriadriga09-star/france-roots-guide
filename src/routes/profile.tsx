import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Bell,
  Globe2,
  Lock,
  MessageCircle,
  Pencil,
  LogOut,
  ChevronRight,
  Plus,
  Zap,
  X,
  Check,
} from "lucide-react";
import { CCard, Pill } from "@/components/concierge/CCard";
import { BottomNav } from "@/components/concierge/BottomNav";
import { CleoBubble } from "@/components/concierge/Cleo";
import { CButton } from "@/components/concierge/CButton";
import { useApp, type Language } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

type SheetKey = "language" | "privacy" | "support" | "edit" | "notifications" | null;

function Profile() {
  const { onboarding, settings, setSettings, setOnboarding, xp, streak, questsDone, reset } = useApp();
  const navigate = useNavigate();
  const [sheet, setSheet] = useState<SheetKey>(null);
  const initial = onboarding.name.charAt(0).toUpperCase();

  const langName: Record<Language, string> = {
    en: "English",
    fr: "Français",
    uk: "Українська",
    es: "Español",
    ar: "العربية",
    hi: "हिन्दी",
  };

  return (
    <div className="mobile-shell pb-32 bg-black min-h-screen relative">
      <div className="absolute inset-0 pointer-events-none bg-gradient-jungle-glow opacity-70" />

      <div
        className="px-5 pt-6 pb-2 flex flex-col items-center relative z-10"
        style={{ paddingTop: "max(28px, env(safe-area-inset-top))" }}
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 18 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-lemon/40 blur-2xl" />
          <div className="relative h-[88px] w-[88px] rounded-full bg-gradient-lemon border-4 border-black flex items-center justify-center shadow-lemon-lg">
            <span className="text-black text-[36px] font-display font-extrabold">{initial}</span>
          </div>
        </motion.div>
        <h1 className="text-white text-[24px] font-display font-bold mt-3">{onboarding.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <Pill variant="lemon">Level 1 · Newcomer</Pill>
          <Pill variant="ghost">
            <Zap size={11} /> {xp} XP
          </Pill>
        </div>
      </div>

      <div className="px-5 mt-5 relative z-10">
        <CCard delay={0.05}>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat n={questsDone} l="Quests done" />
            <Stat n={String(streak)} l="Day streak" />
            <Stat n="€200" l="€ unlocked" />
          </div>
        </CCard>
      </div>

      <div className="px-5 mt-5 relative z-10">
        <p className="text-white-60 text-[10px] uppercase tracking-[2px] font-ui font-bold mb-2">
          Your countries
        </p>
        <CCard delay={0.1}>
          <div className="flex items-center gap-3">
            <div className="text-[28px]">{onboarding.fromCountryFlag}</div>
            <div className="flex-1">
              <p className="text-white-60 text-[10px] uppercase tracking-[1.5px] font-ui font-bold">
                Home
              </p>
              <p className="text-white text-[14px] font-display font-bold">
                {onboarding.fromCountry}
              </p>
            </div>
            <div className="text-white-30 text-2xl">→</div>
            <div className="ring-2 ring-lemon rounded-full p-1.5 bg-navy">
              <div className="h-6 w-6 rounded-full bg-lemon flex items-center justify-center">
                <Check size={14} className="text-black" strokeWidth={3} />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-lemon text-[10px] uppercase tracking-[1.5px] font-ui font-bold">
                Current
              </p>
              <p className="text-white text-[14px] font-display font-bold">France</p>
            </div>
          </div>
          <button className="mt-3 text-white-60 text-[12px] flex items-center gap-1 font-ui font-semibold">
            <Plus size={13} /> Add another country
          </button>
        </CCard>
      </div>

      <div className="px-5 mt-5 relative z-10">
        <CCard delay={0.15} className="!p-0 overflow-hidden">
          <Row icon={<Bell size={18} />} label="Notifications" hint={settings.notifications ? "On" : "Off"} onClick={() => setSheet("notifications")} />
          <Divider />
          <Row icon={<Globe2 size={18} />} label="Language" hint={langName[settings.language]} onClick={() => setSheet("language")} />
          <Divider />
          <Row icon={<Lock size={18} />} label="Privacy & data" onClick={() => setSheet("privacy")} />
          <Divider />
          <Row icon={<MessageCircle size={18} />} label="Help & support" onClick={() => setSheet("support")} />
          <Divider />
          <Row icon={<Pencil size={18} />} label="Update my profile" onClick={() => setSheet("edit")} />
        </CCard>
      </div>

      <div className="px-5 mt-5 relative z-10">
        <CleoBubble
          side="left"
          pose="celebrating"
          tone="tip"
          size={56}
          text={
            <>
              Proud of you, {onboarding.name}. Three days in a row — keep that streak alive!
            </>
          }
        />
      </div>

      <div className="px-5 mt-5 relative z-10">
        <button
          onClick={() => {
            reset();
            navigate({ to: "/" });
          }}
          className="w-full flex items-center justify-center gap-2 py-3 text-coral-red font-display font-bold text-[14px] border border-coral-red/30 rounded-2xl bg-coral-red/5 active:scale-95 transition"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>

      <BottomNav />

      {/* Bottom sheets */}
      <AnimatePresence>
        {sheet && (
          <Sheet onClose={() => setSheet(null)}>
            {sheet === "language" && (
              <LanguageSheet
                value={settings.language}
                onPick={(l) => {
                  setSettings({ language: l });
                  setSheet(null);
                }}
              />
            )}
            {sheet === "privacy" && (
              <PrivacySheet
                personalised={settings.personalised}
                analytics={settings.analytics}
                marketing={settings.marketing}
                onToggle={(k, v) => setSettings({ [k]: v } as never)}
              />
            )}
            {sheet === "notifications" && (
              <NotificationsSheet
                value={settings.notifications}
                onToggle={(v) => setSettings({ notifications: v })}
              />
            )}
            {sheet === "support" && <SupportSheet onClose={() => setSheet(null)} />}
            {sheet === "edit" && (
              <EditSheet
                name={onboarding.name}
                email={onboarding.email}
                onSave={(name, email) => {
                  setOnboarding({ name, email });
                  setSheet(null);
                }}
              />
            )}
          </Sheet>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Bottom-sheet shell ---------- */

function Sheet({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 280 }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-navy rounded-t-[28px] border-t border-lemon/20 shadow-deep"
        style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
      >
        <div className="flex justify-center pt-2 pb-1">
          <span className="h-1 w-10 bg-white/20 rounded-full" />
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-4 h-9 w-9 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-95"
          aria-label="Close"
        >
          <X size={16} />
        </button>
        <div className="px-5 pt-2 pb-4 max-h-[78vh] overflow-y-auto">{children}</div>
      </motion.div>
    </>
  );
}

/* ---------- Sheet contents ---------- */

const LANGUAGES: { code: Language; name: string; native: string; flag: string }[] = [
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "uk", name: "Ukrainian", native: "Українська", flag: "🇺🇦" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "ar", name: "Arabic", native: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", native: "हिन्दी", flag: "🇮🇳" },
];

function LanguageSheet({ value, onPick }: { value: Language; onPick: (l: Language) => void }) {
  return (
    <>
      <SheetHeader title="Language" subtitle="Choose what feels like home." />
      <div className="space-y-2 mt-3">
        {LANGUAGES.map((l) => {
          const active = l.code === value;
          return (
            <button
              key={l.code}
              onClick={() => onPick(l.code)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition active:scale-[0.98] ${
                active ? "bg-lemon/15 border-lemon" : "bg-white/5 border-white/10"
              }`}
            >
              <span className="text-2xl">{l.flag}</span>
              <div className="flex-1 text-left">
                <p className="text-white text-[14px] font-display font-bold">{l.native}</p>
                <p className="text-white-40 text-[11px] font-ui">{l.name}</p>
              </div>
              {active && (
                <div className="h-6 w-6 rounded-full bg-lemon flex items-center justify-center">
                  <Check size={14} className="text-black" strokeWidth={3} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}

function PrivacySheet({
  personalised,
  analytics,
  marketing,
  onToggle,
}: {
  personalised: boolean;
  analytics: boolean;
  marketing: boolean;
  onToggle: (k: "personalised" | "analytics" | "marketing", v: boolean) => void;
}) {
  return (
    <>
      <SheetHeader title="Privacy & data" subtitle="You're in control. Always." />
      <div className="space-y-2.5 mt-3">
        <ToggleRow
          label="Personalised guidance"
          hint="Tailor advice using my profile."
          value={personalised}
          onChange={(v) => onToggle("personalised", v)}
        />
        <ToggleRow
          label="Anonymous analytics"
          hint="Help us improve with usage data."
          value={analytics}
          onChange={(v) => onToggle("analytics", v)}
        />
        <ToggleRow
          label="Marketing emails"
          hint="Tips and product news now and then."
          value={marketing}
          onChange={(v) => onToggle("marketing", v)}
        />
      </div>
      <p className="text-white-40 text-[11px] font-ui mt-4 leading-relaxed">
        Your documents stay encrypted on your device. We never sell personal data.
      </p>
    </>
  );
}

function NotificationsSheet({ value, onToggle }: { value: boolean; onToggle: (v: boolean) => void }) {
  return (
    <>
      <SheetHeader title="Notifications" subtitle="Pings, reminders, and gentle nudges." />
      <div className="mt-3">
        <ToggleRow
          label="Enable notifications"
          hint="Quest progress, deadlines and tips."
          value={value}
          onChange={onToggle}
        />
      </div>
    </>
  );
}

function SupportSheet({ onClose }: { onClose: () => void }) {
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  const valid = msg.trim().length >= 10 && msg.trim().length <= 1000;

  return (
    <>
      <SheetHeader title="Help & support" subtitle="Tell us what's up — we read everything." />
      {sent ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-center py-8"
        >
          <div className="mx-auto h-14 w-14 rounded-full bg-gradient-lemon flex items-center justify-center shadow-lemon">
            <Check size={26} className="text-black" strokeWidth={3} />
          </div>
          <p className="mt-3 text-white text-[16px] font-display font-bold">Message sent</p>
          <p className="text-white-60 text-[13px] font-ui mt-1">We'll reply within 24 hours.</p>
        </motion.div>
      ) : (
        <>
          <textarea
            value={msg}
            onChange={(e) => setMsg(e.target.value.slice(0, 1000))}
            placeholder="What can we help with?"
            rows={5}
            className="mt-3 w-full p-4 rounded-2xl bg-black border border-white/10 text-white text-[14px] font-body placeholder:text-white-30 outline-none focus:border-lemon transition"
          />
          <p className="text-white-40 text-[11px] font-ui mt-1 text-right">{msg.length}/1000</p>
          <CButton
            onClick={() => {
              setSent(true);
              setTimeout(onClose, 1400);
            }}
            disabled={!valid}
          >
            Send
          </CButton>
        </>
      )}
    </>
  );
}

function EditSheet({
  name,
  email,
  onSave,
}: {
  name: string;
  email: string;
  onSave: (name: string, email: string) => void;
}) {
  const [n, setN] = useState(name);
  const [e, setE] = useState(email);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const nameValid = n.trim().length >= 1 && n.trim().length <= 100;
  const valid = nameValid && emailValid;

  return (
    <>
      <SheetHeader title="Update profile" subtitle="Make it yours." />
      <div className="space-y-3 mt-4">
        <div>
          <label className="text-white-60 text-[10px] uppercase tracking-[1.5px] font-ui font-bold">Name</label>
          <input
            value={n}
            onChange={(ev) => setN(ev.target.value.slice(0, 100))}
            className="mt-1 w-full h-12 px-4 rounded-xl bg-black border border-white/10 text-white text-[15px] font-body outline-none focus:border-lemon"
          />
        </div>
        <div>
          <label className="text-white-60 text-[10px] uppercase tracking-[1.5px] font-ui font-bold">Email</label>
          <input
            value={e}
            onChange={(ev) => setE(ev.target.value.slice(0, 255))}
            type="email"
            className="mt-1 w-full h-12 px-4 rounded-xl bg-black border border-white/10 text-white text-[15px] font-body outline-none focus:border-lemon"
          />
          {!emailValid && e.length > 0 && (
            <p className="text-coral-red text-[11px] font-ui mt-1">Please enter a valid email.</p>
          )}
        </div>
      </div>
      <div className="mt-5">
        <CButton onClick={() => onSave(n.trim(), e.trim())} disabled={!valid}>
          Save changes
        </CButton>
      </div>
    </>
  );
}

/* ---------- Atoms ---------- */

function SheetHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="pt-1">
      <h2 className="text-white text-[20px] font-display font-bold">{title}</h2>
      {subtitle && <p className="text-white-60 text-[13px] font-ui mt-1">{subtitle}</p>}
    </div>
  );
}

function ToggleRow({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
      <div className="flex-1 min-w-0">
        <p className="text-white text-[14px] font-display font-bold">{label}</p>
        {hint && <p className="text-white-40 text-[11px] font-ui mt-0.5">{hint}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-7 rounded-full p-0.5 transition-colors ${value ? "bg-lemon" : "bg-white/15"}`}
        style={value ? { boxShadow: "0 0 10px rgba(248,255,161,0.5)" } : undefined}
        aria-pressed={value}
      >
        <motion.span
          layout
          className={`block h-6 w-6 rounded-full ${value ? "bg-black" : "bg-white/40"}`}
          style={{ marginLeft: value ? "auto" : 0 }}
        />
      </button>
    </div>
  );
}

function Stat({ n, l }: { n: React.ReactNode; l: string }) {
  return (
    <div>
      <p className="text-lemon text-[22px] font-display font-extrabold">{n}</p>
      <p className="text-white-60 text-[10px] mt-0.5 uppercase tracking-wider font-ui font-bold">
        {l}
      </p>
    </div>
  );
}

function Row({
  icon,
  label,
  hint,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="w-full px-5 py-4 flex items-center gap-3 text-left active:bg-white/5 transition">
      <span className="h-9 w-9 rounded-xl bg-lemon/15 border border-lemon/30 text-lemon flex items-center justify-center">
        {icon}
      </span>
      <span className="text-white text-[14px] flex-1 font-ui font-semibold">{label}</span>
      {hint && <span className="text-white-40 text-[12px] font-ui mr-1">{hint}</span>}
      <ChevronRight size={16} className="text-white-40" />
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-white/8 mx-5" />;
}
