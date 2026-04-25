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
        title="Where are you coming from?"
        subtitle="We'll tailor everything to your home country's situation."
      />
      <div className="relative mb-4">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-silver" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search your country..."
          className="w-full h-[48px] pl-11 pr-4 bg-slate-blue rounded-[12px] text-white placeholder:text-silver/60 outline-none border-b-2 border-transparent focus:border-coral"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((c) => {
          const selected = value === c.name;
          return (
            <motion.button
              key={c.name}
              whileTap={{ scale: 0.96 }}
              onClick={() => onChange(c.name, c.flag)}
              className={`bg-slate-blue rounded-[16px] p-4 flex flex-col items-center gap-2 border-2 transition-all ${
                selected ? "border-coral shadow-coral-glow" : "border-transparent"
              }`}
            >
              <span className="text-[28px] leading-none">{c.flag}</span>
              <span className="text-white text-[13px] font-semibold">{c.name}</span>
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
        title="And you're heading to..."
        subtitle="Currently we guide you through France. More countries coming soon 🌍"
      />
      <div className="bg-slate-blue rounded-[20px] p-5 border-2 border-coral shadow-coral-glow relative overflow-hidden">
        <svg
          viewBox="0 0 200 180"
          className="absolute right-2 bottom-2 opacity-25"
          width="160"
          height="140"
        >
          <path
            d="M100 20 L130 35 L150 30 L165 55 L160 90 L175 105 L160 130 L140 145 L120 155 L95 160 L70 150 L50 130 L40 100 L30 75 L45 55 L65 40 L85 25 Z"
            fill="none"
            stroke="#EF8354"
            strokeWidth="2.5"
          />
        </svg>
        <div className="relative">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">🇫🇷</span>
            <span className="text-white text-[20px] font-bold">France</span>
          </div>
          <p className="text-silver text-[13px]">Paris · Lyon · Marseille · and everywhere else</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          { f: "🇩🇪", n: "Germany" },
          { f: "🇳🇱", n: "Netherlands" },
          { f: "🇧🇪", n: "Belgium" },
        ].map((c) => (
          <div
            key={c.n}
            className="bg-slate-blue/50 rounded-[16px] p-3 flex flex-col items-center gap-1 opacity-50"
          >
            <span className="text-[22px]">{c.f}</span>
            <span className="text-silver text-[11px] font-medium flex items-center gap-1">
              {c.n} <Lock size={10} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const GOALS = [
  { id: "banking", emoji: "🏦", t: "Banking & Finance", d: "Open accounts, manage money" },
  { id: "admin", emoji: "📋", t: "Administrative Setup", d: "Residence, CAF, social security" },
  { id: "taxes", emoji: "💰", t: "Taxes & Declarations", d: "Understand & file your taxes" },
  { id: "perks", emoji: "🎁", t: "Perks & Benefits", d: "Subventions you're entitled to" },
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
      <StepHeader
        title="What do you mainly need help with?"
        subtitle="Pick everything that applies — your path will be built around this."
      />
      <div className="grid grid-cols-2 gap-3">
        {GOALS.map((g) => {
          const sel = value.includes(g.id);
          return (
            <motion.button
              key={g.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => toggle(g.id)}
              className={`relative bg-slate-blue rounded-[16px] p-4 flex flex-col items-start gap-2 text-left border-2 transition-all ${
                sel ? "border-coral shadow-coral-glow" : "border-transparent"
              }`}
            >
              <span className="text-[28px]">{g.emoji}</span>
              <span className="text-white text-[14px] font-bold leading-tight">{g.t}</span>
              <span className="text-silver text-[12px] leading-snug">{g.d}</span>
              {sel && (
                <span className="absolute top-2 right-2 h-5 w-5 rounded-full bg-coral flex items-center justify-center">
                  <Check size={12} strokeWidth={3} className="text-white" />
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
  { id: "salaried", emoji: "💼", label: "Salaried employee" },
  { id: "freelance", emoji: "🧾", label: "Freelance" },
  { id: "jobseek", emoji: "🔍", label: "Job-seeking" },
];

function Step5({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <StepHeader
        title="What's your situation in France?"
        subtitle="This changes what you're eligible for."
      />
      <div className="grid grid-cols-2 gap-3">
        {STATUSES.map((s) => {
          const sel = value === s.id;
          return (
            <motion.button
              key={s.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => onChange(s.id)}
              className={`bg-slate-blue rounded-[16px] p-4 flex flex-col items-start gap-2 text-left border-2 transition-all ${
                sel ? "border-coral shadow-coral-glow" : "border-transparent"
              }`}
            >
              <span className="text-[28px]">{s.emoji}</span>
              <span className="text-white text-[14px] font-bold">{s.label}</span>
            </motion.button>
          );
        })}
      </div>
      <p className="mt-4 text-silver text-[12px] text-center">
        Not sure? Pick the closest one — you can update later.
      </p>
    </div>
  );
}

const TIMES = [
  { id: "new", label: "I just arrived (under 3 months)" },
  { id: "3-12", label: "A few months (3–12 months)" },
  { id: "year+", label: "Over a year" },
];

function Step6({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <StepHeader title="How long have you been in France?" />
      <div className="flex flex-col gap-3">
        {TIMES.map((t) => {
          const sel = value === t.id;
          return (
            <motion.button
              key={t.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(t.id)}
              className={`h-[56px] rounded-[14px] px-4 text-[15px] font-semibold transition-all ${
                sel ? "bg-coral text-white" : "bg-slate-blue text-white"
              }`}
            >
              {t.label}
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
        title="Do you still have financial ties to your home country?"
        subtitle="Bank account, savings, property, or money sent back home."
      />
      <div className="grid grid-cols-2 gap-3">
        {[
          { v: true, label: "Yes, I do", icon: "🏦 🏠" },
          { v: false, label: "Not really", icon: "🇫🇷" },
        ].map((o) => {
          const sel = value === o.v;
          return (
            <motion.button
              key={String(o.v)}
              whileTap={{ scale: 0.96 }}
              onClick={() => onChange(o.v)}
              className={`bg-slate-blue rounded-[16px] p-5 flex flex-col items-center gap-3 border-2 transition-all ${
                sel ? "border-coral shadow-coral-glow" : "border-transparent"
              }`}
            >
              <span className="text-[32px]">{o.icon}</span>
              <span className="text-white text-[14px] font-bold">{o.label}</span>
            </motion.button>
          );
        })}
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="mt-5 text-coral text-[13px] font-semibold"
      >
        {open ? "Hide" : "What counts as a tie?"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-2 text-silver text-[13px] overflow-hidden"
          >
            A bank account, savings account, property, pension, or regular family transfers.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const DOCS: { key: string; label: string }[] = [
  { key: "bank", label: "French bank account" },
  { key: "sim", label: "French SIM card / phone number" },
  { key: "address", label: "Proof of address (quittance de loyer)" },
  { key: "secu", label: "Social Security number (numéro de sécu)" },
  { key: "vitale", label: "Carte Vitale (health card)" },
  { key: "visa", label: "Residence permit / visa" },
  { key: "fiscal", label: "French tax number (numéro fiscal)" },
  { key: "caf", label: "CAF number" },
];

function Step8({
  docs,
  onToggle,
}: {
  docs: Record<string, boolean>;
  onToggle: (k: string) => void;
}) {
  return (
    <div>
      <StepHeader
        title="What documents do you already have in France?"
        subtitle="Tick everything you've sorted — we'll skip the steps you don't need."
      />
      <div className="flex flex-col gap-2">
        {DOCS.map((d) => {
          const on = docs[d.key];
          return (
            <button
              key={d.key}
              onClick={() => onToggle(d.key)}
              className="bg-slate-blue rounded-[12px] p-4 flex items-center justify-between text-left active:scale-[0.99] transition-transform"
            >
              <span className="text-white text-[15px] flex-1 pr-3">{d.label}</span>
              <motion.span
                animate={{ backgroundColor: on ? "#EF8354" : "#BFC0C0" }}
                className="relative w-11 h-6 rounded-full flex-shrink-0"
              >
                <motion.span
                  animate={{ x: on ? 22 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 h-4 w-4 rounded-full bg-white shadow"
                />
              </motion.span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
