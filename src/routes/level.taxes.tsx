import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Calendar,
  Coins,
  FileSignature,
  Home,
  ArrowRight,
  Download,
  MapPin,
  Check,
  Sparkles,
} from "lucide-react";
import { TopBar } from "@/components/concierge/TopBar";
import { CCard, Pill } from "@/components/concierge/CCard";
import { CButton } from "@/components/concierge/CButton";
import { Cleo, CleoBubble } from "@/components/concierge/Cleo";
import { useApp } from "@/lib/store";
import { celebrate } from "@/lib/celebrate";

export const Route = createFileRoute("/level/taxes")({
  component: TaxesLevel,
});

type Step = "intro" | "plan" | "pack";
const TOTAL = 3;
const STEP_INDEX: Record<Step, number> = { intro: 1, plan: 2, pack: 3 };

function TaxesLevel() {
  const [step, setStep] = useState<Step>("intro");
  const { addXp, setQuest } = useApp();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  return (
    <div className="mobile-shell pb-32 bg-black min-h-screen">
      <TopBar
        title={<span className="font-display font-bold text-white">Taxes · Level 2</span>}
        step={{ current: STEP_INDEX[step], total: TOTAL }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35 }}
        >
          {step === "intro" && <IntroStep onNext={() => setStep("plan")} />}
          {step === "plan" && <PlanStep onNext={() => setStep("pack")} />}
          {step === "pack" && (
            <PackStep
              done={done}
              onComplete={() => {
                setDone(true);
                setQuest({ taxesFiled: true });
                addXp(200);
                celebrate();
                setTimeout(() => navigate({ to: "/level/benefits" }), 1800);
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ============ INTRO ============ */
function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="px-5 pt-2 pb-4 space-y-4">
      {/* Hero */}
      <div className="h-[200px] rounded-[28px] relative overflow-hidden p-5 border border-lemon/30 shadow-deep card-hero">
        <div className="absolute inset-0 bg-gradient-jungle-glow opacity-80 pointer-events-none" />
        <svg viewBox="0 0 200 140" className="absolute inset-0 w-full h-full opacity-30">
          <rect x="40" y="20" width="120" height="110" rx="6" fill="none" stroke="#F8FFA1" strokeWidth="2.5" />
          <line x1="55" y1="42" x2="145" y2="42" stroke="#F8FFA1" strokeWidth="2" />
          <line x1="55" y1="58" x2="125" y2="58" stroke="#F8FFA1" strokeWidth="2" />
          <line x1="55" y1="74" x2="135" y2="74" stroke="#F8FFA1" strokeWidth="2" />
          <line x1="55" y1="90" x2="115" y2="90" stroke="#F8FFA1" strokeWidth="2" />
          <rect x="55" y="105" width="90" height="20" rx="4" fill="#F8FFA1" />
          <text x="100" y="118" textAnchor="middle" fill="#000" fontSize="9" fontWeight="800">
            FORM 2042
          </text>
        </svg>
        <div className="absolute top-4 left-4">
          <Pill variant="lemon">+200 XP</Pill>
        </div>
        <div className="relative z-10 flex-1 mt-10">
          <p className="text-lemon text-[10px] font-bold uppercase tracking-[2px] font-ui mb-1">
            Chapter 2
          </p>
          <h2 className="text-white text-[24px] font-display font-bold leading-tight">
            Taxes, decoded.
          </h2>
        </div>
        <div className="absolute -bottom-2 right-2">
          <Cleo pose="thinking" mood="focused" size={92} />
        </div>
      </div>

      <h2 className="text-white text-[22px] font-display font-bold tracking-tight">
        Don't panic — we've got you 😮‍💨
      </h2>

      <CleoBubble
        side="left"
        pose="guiding"
        tone="dark"
        text={
          <>
            French taxes look scary. They're actually <b>predictable</b>. Here's the playbook 👇
          </>
        }
      />

      <CCard delay={0.05}>
        <CardHeader icon={<Calendar size={20} />} title="The French tax year" />
        <p className="text-white text-[14px] leading-relaxed font-ui font-medium">
          Tax year = January to December. You declare in <b className="text-lemon">spring</b> for last year's
          income. Miss it, you get fined. So we'll remind you. A lot. ⏰
        </p>
      </CCard>

      <CCard delay={0.1}>
        <CardHeader icon={<Coins size={20} />} title="How much do you pay?" />
        <p className="text-white text-[14px] leading-relaxed font-ui font-medium mb-3">
          Progressive brackets — the more you earn, the more they take.
        </p>
        <div className="space-y-2.5">
          {[
            { range: "Up to €11,294", rate: 0 },
            { range: "€11,294 – €28,797", rate: 11 },
            { range: "€28,797 – €82,341", rate: 30 },
            { range: "Above €82,341", rate: 45 },
          ].map((b, i) => (
            <div key={b.range} className="flex items-center gap-3">
              <span className="text-white-60 text-[12px] flex-1 font-ui font-semibold">{b.range}</span>
              <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(b.rate / 45) * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.1 * i }}
                  className="h-full bg-lemon"
                />
              </div>
              <span className="text-lemon text-[12px] font-display font-extrabold w-9 text-right">
                {b.rate}%
              </span>
            </div>
          ))}
        </div>
      </CCard>

      <CCard delay={0.15} tone="lemon">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-10 w-10 rounded-full bg-black text-lemon flex items-center justify-center">
            <FileSignature size={20} />
          </span>
          <h3 className="text-black text-[17px] font-display font-extrabold">First year = paper</h3>
        </div>
        <p className="text-black text-[14px] leading-relaxed font-ui font-semibold">
          Yes, paper. Year 2 onwards: everything online at <b>impots.gouv.fr</b>. It's a French
          tradition. ✉️
        </p>
      </CCard>

      <CCard delay={0.2}>
        <CardHeader icon={<Home size={20} />} title="Other taxes you'll meet" />
        <p className="text-white text-[14px] leading-relaxed font-ui font-medium">
          <b className="text-lemon">CSG/CRDS:</b> ~9.7% auto from payslip
          <br />
          <b className="text-lemon">Taxe d'habitation:</b> mostly gone for primary homes
          <br />
          <b className="text-lemon">TVA:</b> 20% on most stuff — already in the price
        </p>
      </CCard>

      <CButton onClick={onNext}>
        Got it — what do I need to do? <ArrowRight size={18} />
      </CButton>
    </div>
  );
}

function CardHeader({ icon, title }: { icon: React.ReactNode; title: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="h-10 w-10 rounded-full bg-lemon/15 border border-lemon/30 text-lemon flex items-center justify-center">
        {icon}
      </span>
      <h3 className="text-white text-[17px] font-display font-extrabold">{title}</h3>
    </div>
  );
}

/* ============ PLAN ============ */
function PlanStep({ onNext }: { onNext: () => void }) {
  const { onboarding } = useApp();
  return (
    <div className="px-5 pt-2 space-y-5 pb-4">
      <div>
        <p className="text-lemon text-[10px] font-bold uppercase tracking-[2px] font-ui">
          Your situation
        </p>
        <h2 className="text-white text-[24px] font-display font-bold mt-1 leading-tight">
          Here's what applies to <span className="text-lemon">you</span> ✨
        </h2>
      </div>

      <CCard tone="lemon" delay={0.05}>
        <div className="text-3xl mb-2">{onboarding.fromCountryFlag}</div>
        <p className="text-black text-[15px] font-display font-bold leading-snug">
          {onboarding.fromCountry} national, salaried in France, arrived 4 months ago, income
          €2,200/month net.
        </p>
      </CCard>

      <CCard delay={0.1}>
        <h3 className="text-white text-[16px] font-display font-bold mb-2">Your status</h3>
        <p className="text-white text-[14px] font-ui font-medium leading-relaxed">
          Over 3 months in France = <b className="text-lemon">tax resident</b>. You declare your{" "}
          worldwide income. Don't worry — we'll show you exactly what to fill in.
        </p>
        <div className="mt-3">
          <Pill variant="lemon">Applies to you</Pill>
        </div>
      </CCard>

      <CCard delay={0.15} className="border-l-4 !border-l-lemon">
        <h3 className="text-white text-[16px] font-display font-bold mb-2">This year's process</h3>
        <p className="text-white text-[14px] font-ui font-medium leading-relaxed">
          First year here, so:
          <br />→ <b>Paper declaration</b>
          <br />→ Download form <b className="text-lemon">2042</b> from impots.gouv.fr
          <br />→ Mail to your local tax office
          <br />→ Deadline: <span className="text-coral-red font-display font-extrabold">May 31</span>
        </p>
        <p className="mt-3 text-white-60 text-[12px] font-ui italic">
          Next year? Online. Easy. Promise. 🎉
        </p>
      </CCard>

      <CCard delay={0.2}>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-lemon" />
          <h3 className="text-white text-[14px] font-display font-bold uppercase tracking-wider">
            Your estimated tax
          </h3>
        </div>
        <p className="text-white text-[14px] font-ui font-medium">
          Income ~<b>€26,400/year</b> → likely 0–11% bracket.
        </p>
        <p className="text-lemon text-[28px] font-display font-extrabold mt-2">€500 – €1,400 / yr</p>
        <p className="text-white-40 text-[11px] mt-2 leading-snug font-ui italic">
          Estimate only — not financial advice. Real number depends on deductions, family, other
          income.
        </p>
      </CCard>

      <CButton onClick={onNext}>
        Show my action pack <ArrowRight size={18} />
      </CButton>
    </div>
  );
}

/* ============ PACK ============ */
function PackStep({ done, onComplete }: { done: boolean; onComplete: () => void }) {
  const months = ["Mar", "Apr", "May", "Jun"];
  const docs = [
    "Your payslips (all from this year)",
    "Your French tax number (numéro fiscal)",
    "Your home country income",
    "Your bank IBAN (French)",
    "Form 2042 (link below)",
  ];
  return (
    <div className="px-5 pt-2 pb-4 space-y-5">
      <div>
        <p className="text-lemon text-[10px] font-bold uppercase tracking-[2px] font-ui">
          Action pack
        </p>
        <h2 className="text-white text-[24px] font-display font-bold mt-1 leading-tight">
          Your tax to-do, in order 📦
        </h2>
      </div>

      <CCard delay={0.05}>
        <h3 className="text-lemon text-[12px] font-display font-extrabold mb-4 uppercase tracking-[1.5px]">
          Timeline
        </h3>
        <div className="flex items-center justify-between relative">
          <div className="absolute left-2 right-2 top-2 h-0.5 bg-white/10" />
          {months.map((m, i) => (
            <div key={m} className="flex flex-col items-center flex-1 relative z-10">
              <div
                className={`h-4 w-4 rounded-full ${
                  i === 2 ? "bg-lemon shadow-lemon" : i < 2 ? "bg-lemon/50" : "bg-white/20"
                }`}
                style={i === 2 ? { animation: "pulse-ring 2s infinite" } : undefined}
              />
              <p
                className={`mt-2 text-[12px] font-display font-bold ${
                  i === 2 ? "text-lemon" : "text-white-60"
                }`}
              >
                {m}
              </p>
              {i === 2 && (
                <p className="text-[10px] text-coral-red font-ui font-bold uppercase">Deadline</p>
              )}
            </div>
          ))}
        </div>
      </CCard>

      <CCard delay={0.1}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📄</span>
          <h3 className="text-white text-[16px] font-display font-bold">Documents to gather</h3>
        </div>
        <ul className="space-y-2">
          {docs.map((d) => (
            <li
              key={d}
              className="flex items-center gap-3 bg-white/5 rounded-xl px-3 py-2.5 border border-white/10"
            >
              <span className="h-5 w-5 rounded-full border border-lemon/40 flex items-center justify-center" />
              <span className="text-white text-[13px] font-ui font-semibold">{d}</span>
            </li>
          ))}
        </ul>
      </CCard>

      <div className="grid grid-cols-2 gap-3">
        <CButton variant="secondary" size="md">
          <Download size={16} /> Form 2042
        </CButton>
        <CButton variant="secondary" size="md">
          <MapPin size={16} /> Tax office
        </CButton>
      </div>

      <CCard delay={0.15}>
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 rounded-full bg-lemon/15 border border-lemon/30 flex items-center justify-center text-lemon flex-shrink-0">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-white text-[14px] font-display font-bold">
              Centre des Finances Publiques
            </p>
            <p className="text-white-60 text-[12px] font-ui">
              Paris 15e — Mon–Fri 8:30–17:00
            </p>
          </div>
        </div>
        <div className="mt-3 h-24 rounded-xl relative overflow-hidden bg-black/40 border border-white/10">
          <svg viewBox="0 0 200 80" className="w-full h-full">
            <path d="M0 40 L60 38 L120 50 L200 42" stroke="#243168" strokeWidth="20" fill="none" />
            <path d="M30 0 L40 80" stroke="#243168" strokeWidth="14" />
            <path d="M150 0 L140 80" stroke="#243168" strokeWidth="14" />
            <circle cx="100" cy="40" r="6" fill="#F8FFA1" />
            <circle cx="100" cy="40" r="14" fill="#F8FFA1" opacity="0.3" />
          </svg>
        </div>
      </CCard>

      <CleoBubble
        side="left"
        pose="celebrating"
        tone="tip"
        text={
          done ? (
            <>You did it!! That's +200 XP coming your way 🎉</>
          ) : (
            <>
              When you've sent the form, tap below. I'll add <b>200 XP</b> to your level ⚡
            </>
          )
        }
      />

      <CButton onClick={onComplete} disabled={done}>
        {done ? (
          <>
            <Check size={18} /> Quest complete!
          </>
        ) : (
          <>
            I've filed my taxes <Check size={18} />
          </>
        )}
      </CButton>
    </div>
  );
}
