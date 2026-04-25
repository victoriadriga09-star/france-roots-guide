import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Search, ChevronLeft, Check, Lock } from "lucide-react";
import { CButton } from "@/components/concierge/CButton";
import { Cleo, CleoBubble } from "@/components/concierge/Cleo";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/onboarding")({
  component: Onboarding,
});

const TOTAL = 8;

function Onboarding() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const navigate = useNavigate();
  const { onboarding, setOnboarding, toggleDocument, completeOnboarding } = useApp();

  const next = () => {
    if (step < TOTAL) {
      setDirection(1);
      setStep(step + 1);
    } else {
      completeOnboarding();
      navigate({ to: "/loading" });
    }
  };
  const back = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    } else {
      navigate({ to: "/" });
    }
  };

  const canContinue = (() => {
    switch (step) {
      case 1:
        return onboarding.name.trim().length > 0;
      case 2:
        return onboarding.fromCountry.length > 0;
      case 3:
        return true;
      case 4:
        return onboarding.goals.length > 0;
      case 5:
        return onboarding.status.length > 0;
      case 6:
        return onboarding.timeInFrance.length > 0;
      case 7:
        return onboarding.hasHomeTies !== null;
      case 8:
        return true;
      default:
        return false;
    }
  })();

  return (
    <div className="mobile-shell bg-clouds flex flex-col">
      {/* Top */}
      <div
        className="px-5 pb-3 flex items-center gap-3 z-10"
        style={{ paddingTop: "max(14px, env(safe-area-inset-top))" }}
      >
        <button
          onClick={back}
          aria-label="Back"
          className="h-10 w-10 -ml-1 rounded-full flex items-center justify-center bg-white border-2 border-ink shadow-[0_3px_0_rgba(31,34,54,0.85)] active:translate-y-0.5 transition-all text-ink"
        >
          <ChevronLeft size={22} strokeWidth={2.6} />
        </button>
        <div className="flex-1 h-3 rounded-full bg-white/50 border-2 border-ink overflow-hidden">
          <motion.div
            className="h-full bg-pop-mint rounded-full relative"
            initial={false}
            animate={{ width: `${(step / TOTAL) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="absolute inset-x-0 top-0 h-1/2 bg-white/40 rounded-t-full" />
          </motion.div>
        </div>
        <div className="bg-pop-yellow border-2 border-ink rounded-full px-2.5 py-1 text-[11px] font-extrabold text-ink shadow-[0_3px_0_rgba(31,34,54,0.85)]">
          {step}/{TOTAL}
        </div>
      </div>


      {/* Step content */}
      <div className="flex-1 px-6 pt-3 pb-32 overflow-y-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {step === 1 && (
              <Step1
                value={onboarding.name}
                onChange={(v) => setOnboarding({ name: v })}
              />
            )}
            {step === 2 && (
              <Step2
                value={onboarding.fromCountry}
                onChange={(name, flag) =>
                  setOnboarding({ fromCountry: name, fromCountryFlag: flag })
                }
              />
            )}
            {step === 3 && <Step3 />}
            {step === 4 && (
              <Step4
                value={onboarding.goals}
                onChange={(goals) => setOnboarding({ goals })}
              />
            )}
            {step === 5 && (
              <Step5
                value={onboarding.status}
                onChange={(status) => setOnboarding({ status })}
              />
            )}
            {step === 6 && (
              <Step6
                value={onboarding.timeInFrance}
                onChange={(v) => setOnboarding({ timeInFrance: v })}
              />
            )}
            {step === 7 && (
              <Step7
                value={onboarding.hasHomeTies}
                onChange={(v) => setOnboarding({ hasHomeTies: v })}
              />
            )}
            {step === 8 && (
              <Step8
                docs={onboarding.documents}
                onToggle={toggleDocument}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5 pt-4 pb-6 z-20"
        style={{
          paddingBottom: "max(20px, env(safe-area-inset-bottom))",
          background:
            "linear-gradient(180deg, rgba(199,210,238,0) 0%, rgba(199,210,238,0.95) 40%)",
        }}
      >
        <CButton onClick={next} disabled={!canContinue} size="lg">
          {step === TOTAL ? "Build my path! 🚀" : "Continue"}
        </CButton>
      </div>
    </div>
  );
}

/* -------------------- Steps -------------------- */

function StepHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-ink text-[26px] font-extrabold leading-tight tracking-tight">{title}</h2>
      {subtitle && <p className="mt-2 text-ink/70 text-[14px] leading-snug font-medium">{subtitle}</p>}
    </div>
  );
}

function Step1({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <CleoBubble
        side="left"
        pose="waving"
        mood="happy"
        text={
          <>
            Hey! I'm <b>Cleo</b> 🗝️ Let's start with the easy stuff — what should I call you?
          </>
        }
        className="mb-6"
      />
      <label className="text-ink text-[14px] font-extrabold mb-2 block uppercase tracking-wider">
        Your first name
      </label>
      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Viktoria"
        className="w-full h-[58px] px-4 bg-white border-2 border-ink rounded-[16px] text-ink placeholder:text-ink/30 outline-none font-bold text-[16px] focus:ring-4 focus:ring-sky/40 transition-all shadow-[0_4px_0_rgba(31,34,54,0.85)]"
      />
    </div>
  );
}

const COUNTRIES: { name: string; flag: string }[] = [
  { name: "Ukraine", flag: "🇺🇦" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "India", flag: "🇮🇳" },
  { name: "Spain", flag: "🇪🇸" },
  { name: "USA", flag: "🇺🇸" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Brazil", flag: "🇧🇷" },
  { name: "Germany", flag: "🇩🇪" },
];

function Step2({
  value,
  onChange,
}: {
  value: string;
  onChange: (name: string, flag: string) => void;
}) {
  const [q, setQ] = useState("");
  const filtered = COUNTRIES.filter((c) => c.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <StepHeader
        title="Where's home? 🌍"
        subtitle="So I know exactly which paperwork dragons we're slaying."
      />
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search your country..."
          className="w-full h-[52px] pl-11 pr-4 bg-white border-2 border-ink rounded-[16px] text-ink placeholder:text-ink/40 outline-none font-semibold text-[15px] focus:ring-4 focus:ring-sky/40 shadow-[0_4px_0_rgba(31,34,54,0.85)]"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((c) => {
          const selected = value === c.name;
          return (
            <motion.button
              key={c.name}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(c.name, c.flag)}
              className={`bg-white rounded-[20px] p-4 flex flex-col items-center gap-2 border-2 transition-all shadow-[0_4px_0_rgba(31,34,54,0.85)] ${
                selected ? "border-ink ring-4 ring-sky/50 bg-sky/30" : "border-ink"
              }`}
            >
              <span className="text-[32px] leading-none">{c.flag}</span>
              <span className="text-ink text-[14px] font-extrabold">{c.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function Step3() {
  return (
    <div>
      <StepHeader
        title="Destination: France 🇫🇷"
        subtitle="That's where I'll guide you. Other countries are in training... 🌍"
      />
      <div className="bg-white border-2 border-ink rounded-[24px] p-5 relative overflow-hidden shadow-[0_5px_0_rgba(31,34,54,0.85)]">
        <svg
          viewBox="0 0 200 180"
          className="absolute right-2 bottom-2 opacity-30"
          width="160"
          height="140"
        >
          <path
            d="M100 20 L130 35 L150 30 L165 55 L160 90 L175 105 L160 130 L140 145 L120 155 L95 160 L70 150 L50 130 L40 100 L30 75 L45 55 L65 40 L85 25 Z"
            fill="#A1CDF4"
            stroke="#1F2236"
            strokeWidth="2.5"
          />
        </svg>
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl">🇫🇷</span>
            <span className="text-ink text-[22px] font-extrabold">France</span>
          </div>
          <p className="text-ink/70 text-[13px] font-semibold">
            Paris · Lyon · Marseille · Bordeaux · everywhere
          </p>
        </div>
      </div>

      <p className="mt-6 text-ink/70 text-[12px] font-bold uppercase tracking-wider">
        Coming soon
      </p>
      <div className="mt-2 grid grid-cols-3 gap-3">
        {[
          { f: "🇩🇪", n: "Germany" },
          { f: "🇳🇱", n: "Netherlands" },
          { f: "🇧🇪", n: "Belgium" },
        ].map((c) => (
          <div
            key={c.n}
            className="bg-white/40 border-2 border-ink/20 rounded-[16px] p-3 flex flex-col items-center gap-1"
          >
            <span className="text-[24px] grayscale opacity-60">{c.f}</span>
            <span className="text-ink/60 text-[11px] font-bold flex items-center gap-1">
              {c.n} <Lock size={10} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const GOALS = [
  { id: "banking", emoji: "🏦", t: "Banking", d: "Open a French account" },
  { id: "admin", emoji: "📋", t: "Admin Setup", d: "Residence, CAF, sécu" },
  { id: "taxes", emoji: "💰", t: "Taxes", d: "Declare without crying" },
  { id: "perks", emoji: "🎁", t: "Perks", d: "Money the state owes you" },
];

function Step4({
  value,
  onChange,
}: {
  value: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (id: string) =>
    value.includes(id) ? onChange(value.filter((x) => x !== id)) : onChange([...value, id]);
  return (
    <div>
      <CleoBubble
        side="left"
        pose="thinking"
        text={
          <>
            What's giving you the biggest headache? Tap all that apply — I'll handle the rest. 💪
          </>
        }
        className="mb-5"
      />
      <div className="grid grid-cols-2 gap-3">
        {GOALS.map((g) => {
          const sel = value.includes(g.id);
          return (
            <motion.button
              key={g.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggle(g.id)}
              className={`relative bg-white rounded-[20px] p-4 flex flex-col items-start gap-2 text-left border-2 transition-all shadow-[0_4px_0_rgba(31,34,54,0.85)] ${
                sel ? "border-ink ring-4 ring-pop-mint/60 bg-pop-mint/30" : "border-ink"
              }`}
            >
              <span className="text-[32px]">{g.emoji}</span>
              <span className="text-ink text-[15px] font-extrabold leading-tight">{g.t}</span>
              <span className="text-ink/70 text-[12px] leading-snug font-semibold">{g.d}</span>
              {sel && (
                <span className="absolute top-2 right-2 h-6 w-6 rounded-full bg-ink flex items-center justify-center border-2 border-white">
                  <Check size={12} strokeWidth={3} className="text-pop-mint" />
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

const STATUSES = [
  { id: "student", emoji: "🎓", label: "Student" },
  { id: "salaried", emoji: "💼", label: "Salaried" },
  { id: "freelance", emoji: "🧾", label: "Freelance" },
  { id: "jobseek", emoji: "🔍", label: "Job-seeking" },
];

function Step5({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <StepHeader
        title="Your situation in France?"
        subtitle="This unlocks the right benefits and rules."
      />
      <div className="grid grid-cols-2 gap-3">
        {STATUSES.map((s) => {
          const sel = value === s.id;
          return (
            <motion.button
              key={s.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(s.id)}
              className={`bg-white rounded-[20px] p-4 flex flex-col items-start gap-2 text-left border-2 transition-all shadow-[0_4px_0_rgba(31,34,54,0.85)] ${
                sel ? "border-ink ring-4 ring-sky/60 bg-sky/30" : "border-ink"
              }`}
            >
              <span className="text-[32px]">{s.emoji}</span>
              <span className="text-ink text-[15px] font-extrabold">{s.label}</span>
            </motion.button>
          );
        })}
      </div>
      <p className="mt-4 text-ink/60 text-[12px] text-center font-semibold">
        Not sure? Pick the closest — you can change it anytime.
      </p>
    </div>
  );
}

const TIMES = [
  { id: "new", label: "Just landed (under 3 months)", emoji: "🛬" },
  { id: "3-12", label: "Settling in (3–12 months)", emoji: "🏡" },
  { id: "year+", label: "Old timer (over a year)", emoji: "🥖" },
];

function Step6({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <StepHeader title="How long in France? ⏱️" />
      <div className="flex flex-col gap-3">
        {TIMES.map((t) => {
          const sel = value === t.id;
          return (
            <motion.button
              key={t.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(t.id)}
              className={`h-[64px] rounded-[18px] px-4 text-[15px] font-extrabold transition-all flex items-center gap-3 border-2 border-ink shadow-[0_4px_0_rgba(31,34,54,0.85)] ${
                sel ? "bg-sky text-ink ring-4 ring-sky/40" : "bg-white text-ink"
              }`}
            >
              <span className="text-[26px]">{t.emoji}</span>
              <span className="flex-1 text-left">{t.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function Step7({
  value,
  onChange,
}: {
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <StepHeader
        title="Still tied to home? 🏠"
        subtitle="A bank account, savings, property, or money sent back home."
      />
      <div className="grid grid-cols-2 gap-3">
        {[
          { v: true, label: "Yes, I do", icon: "🏦" },
          { v: false, label: "Not really", icon: "✂️" },
        ].map((o) => {
          const sel = value === o.v;
          return (
            <motion.button
              key={String(o.v)}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(o.v)}
              className={`bg-white rounded-[20px] p-5 flex flex-col items-center gap-3 border-2 transition-all shadow-[0_4px_0_rgba(31,34,54,0.85)] ${
                sel ? "border-ink ring-4 ring-sky/60 bg-sky/30" : "border-ink"
              }`}
            >
              <span className="text-[40px]">{o.icon}</span>
              <span className="text-ink text-[15px] font-extrabold">{o.label}</span>
            </motion.button>
          );
        })}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="mt-5 text-ink text-[13px] font-extrabold underline decoration-2 underline-offset-4 decoration-sky"
      >
        {open ? "Got it ✓" : "What counts as a tie? 🤔"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="mt-3 bg-pop-yellow border-2 border-ink rounded-2xl px-4 py-3 text-ink text-[13px] font-semibold">
              💡 A bank account, savings, property, pension, or regular family transfers home.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const DOCS: { key: string; label: string; emoji: string }[] = [
  { key: "bank", label: "French bank account", emoji: "🏦" },
  { key: "sim", label: "French SIM / phone number", emoji: "📱" },
  { key: "address", label: "Proof of address (quittance)", emoji: "📄" },
  { key: "secu", label: "Social Security number", emoji: "🔢" },
  { key: "vitale", label: "Carte Vitale (health card)", emoji: "💊" },
  { key: "visa", label: "Residence permit / visa", emoji: "🛂" },
  { key: "fiscal", label: "French tax number", emoji: "💰" },
  { key: "caf", label: "CAF number", emoji: "🎁" },
];

function Step8({
  docs,
  onToggle,
}: {
  docs: Record<string, boolean>;
  onToggle: (k: string) => void;
}) {
  const count = Object.values(docs).filter(Boolean).length;
  return (
    <div>
      <CleoBubble
        side="left"
        pose="celebrating"
        mood="wow"
        tone="tip"
        text={
          <>
            Almost there! Tick what you already have — <b>{count}/8 unlocked</b> ✨
          </>
        }
        className="mb-5"
      />
      <div className="flex flex-col gap-2">
        {DOCS.map((d) => {
          const on = docs[d.key];
          return (
            <motion.button
              key={d.key}
              whileTap={{ scale: 0.98 }}
              onClick={() => onToggle(d.key)}
              className={`rounded-[16px] p-3.5 flex items-center justify-between text-left border-2 border-ink shadow-[0_3px_0_rgba(31,34,54,0.85)] transition-colors ${
                on ? "bg-pop-mint" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-[22px]">{d.emoji}</span>
                <span className="text-ink text-[14px] font-extrabold flex-1">{d.label}</span>
              </div>
              <motion.span
                animate={{
                  backgroundColor: on ? "#1F2236" : "#FFFFFF",
                  borderColor: "#1F2236",
                }}
                className="relative w-12 h-7 rounded-full flex-shrink-0 border-2"
              >
                <motion.span
                  animate={{ x: on ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-0.5 h-5 w-5 rounded-full bg-pop-yellow border-2 border-ink"
                />
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
