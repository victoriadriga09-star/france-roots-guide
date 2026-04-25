import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Calendar,
  Coins,
  FileSignature,
  Home,
  ArrowRight,
  Download,
  MapPin,
  Check,
} from "lucide-react";
import { TopBar } from "@/components/concierge/TopBar";
import { CCard, Pill } from "@/components/concierge/CCard";
import { CButton } from "@/components/concierge/CButton";
import { useApp } from "@/lib/store";
import { celebrate } from "@/lib/celebrate";

export const Route = createFileRoute("/level/taxes")({
  component: TaxesLevel,
});

type Step = "intro" | "plan" | "pack";

function TaxesLevel() {
  const [step, setStep] = useState<Step>("intro");
  const { addXp, setQuest } = useApp();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  return (
    <div className="mobile-shell pb-32">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
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

function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <>
      <TopBar title="Level 2 — Taxes 📋" />
      <div className="px-6 space-y-5">
        <div
          className="h-[180px] rounded-[20px] relative overflow-hidden p-5"
          style={{ background: "linear-gradient(135deg, #4F5D75 0%, #2D3142 100%)" }}
        >
          <svg viewBox="0 0 200 140" className="absolute inset-0 w-full h-full">
            {/* Tax form */}
            <rect x="40" y="20" width="120" height="110" rx="6" fill="none" stroke="white" strokeWidth="2.5" />
            <line x1="55" y1="40" x2="145" y2="40" stroke="white" strokeWidth="2" />
            <line x1="55" y1="55" x2="125" y2="55" stroke="white" strokeWidth="2" />
            <line x1="55" y1="70" x2="135" y2="70" stroke="white" strokeWidth="2" />
            <line x1="55" y1="85" x2="115" y2="85" stroke="white" strokeWidth="2" />
            <rect x="55" y="100" width="90" height="20" fill="none" stroke="#EF8354" strokeWidth="2" />
            <text x="100" y="114" textAnchor="middle" fill="#EF8354" fontSize="10" fontWeight="700">
              FORM 2042
            </text>
            <ellipse cx="100" cy="14" rx="14" ry="5" fill="#EF8354" opacity="0.95" />
            {/* Eiffel watermark */}
            <path d="M170 110 L175 90 L180 110 L172 110 L171 105 L179 105" stroke="white" strokeWidth="1.5" fill="none" opacity="0.4" />
          </svg>
        </div>

        <h2 className="text-white text-[22px] font-bold">
          Taxes in France — don't panic, we've got you 😮‍💨
        </h2>

        <CCard delay={0.05}>
          <CardHeader icon={<Calendar size={20} />} title="The French tax year" />
          <p className="text-white/90 text-[14px] leading-relaxed">
            In France, the tax year runs January to December. You declare in spring — usually April
            to June — for the previous year's income. Miss it? You get fined. So we'll remind you. A
            lot.
          </p>
        </CCard>

        <CCard delay={0.1}>
          <CardHeader icon={<Coins size={20} />} title="How much do you pay?" />
          <p className="text-white/90 text-[14px] leading-relaxed mb-3">
            France uses progressive tax brackets:
          </p>
          <div className="space-y-2">
            {[
              { range: "Up to €11,294", rate: 0 },
              { range: "€11,294 – €28,797", rate: 11 },
              { range: "€28,797 – €82,341", rate: 30 },
              { range: "Above €82,341", rate: 45 },
            ].map((b) => (
              <div key={b.range} className="flex items-center gap-3">
                <span className="text-white text-[12px] flex-1">{b.range}</span>
                <div className="w-24 h-2 bg-jet/40 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(b.rate / 45) * 100}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-coral"
                  />
                </div>
                <span className="text-coral text-[12px] font-bold w-9 text-right">{b.rate}%</span>
              </div>
            ))}
          </div>
        </CCard>

        <CCard delay={0.15}>
          <CardHeader icon={<FileSignature size={20} />} title="First year in France: paper time" />
          <Pill className="mb-2">Important for you</Pill>
          <p className="text-white/90 text-[14px] leading-relaxed">
            Your first year in France, you declare on paper. Yes, paper. It's a French tradition at
            this point. From year 2 onwards you can file online at impots.gouv.fr.
          </p>
        </CCard>

        <CCard delay={0.2}>
          <CardHeader icon={<Home size={20} />} title="Other taxes to know" />
          <p className="text-white/90 text-[14px] leading-relaxed">
            <b>CSG/CRDS:</b> ~9.7% on most income (auto from payslip)<br />
            <b>Taxe d'habitation:</b> mostly abolished for primary residences<br />
            <b>TVA (VAT):</b> 20% on most goods — paid automatically when you shop
          </p>
        </CCard>

        <CButton onClick={onNext}>
          Got it — what do I need to do? <ArrowRight size={18} />
        </CButton>
      </div>
    </>
  );
}

function CardHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="h-9 w-9 rounded-full bg-coral/20 text-coral flex items-center justify-center">
        {icon}
      </span>
      <h3 className="text-white text-[16px] font-bold">{title}</h3>
    </div>
  );
}

function PlanStep({ onNext }: { onNext: () => void }) {
  const { onboarding } = useApp();
  return (
    <>
      <TopBar title="Level 2 — Taxes" />
      <div className="px-6 space-y-5">
        <div>
          <h2 className="text-white text-[22px] font-bold">Your tax situation, specifically</h2>
          <p className="text-silver text-[13px] mt-1">
            Based on your profile — here's exactly what applies to you.
          </p>
        </div>

        <div
          className="rounded-[20px] p-5"
          style={{ background: "linear-gradient(135deg, #EF8354 0%, #4F5D75 100%)" }}
        >
          <div className="text-2xl mb-2">👤</div>
          <p className="text-white text-[15px] font-bold leading-snug">
            You: {onboarding.fromCountry} national, salaried in France, arrived 4 months ago, income
            €2,200/month net.
          </p>
        </div>

        <CCard delay={0.05}>
          <h3 className="text-white text-[16px] font-bold mb-2">Your status</h3>
          <p className="text-white/90 text-[14px]">
            As a French tax resident (over 3 months), you must declare your worldwide income.
          </p>
          <div className="mt-3"><Pill>Applies to you</Pill></div>
        </CCard>

        <div className="border-l-4 border-coral pl-4">
          <CCard delay={0.1} className="border border-coral/40">
            <h3 className="text-white text-[16px] font-bold mb-2">This year's process</h3>
            <p className="text-white/90 text-[14px] leading-relaxed">
              Since this is your first year in France:<br />
              → File a <b>paper declaration</b><br />
              → Download form 2042 from impots.gouv.fr<br />
              → Mail it to your local tax office (Centre des Finances Publiques)<br />
              → Deadline: <span className="text-coral font-bold">late May</span>
            </p>
            <p className="mt-3 text-silver text-[12px]">Next year: you can do everything online 🎉</p>
          </CCard>
        </div>

        <CCard delay={0.15}>
          <h3 className="text-white text-[16px] font-bold mb-2">Your estimated tax</h3>
          <p className="text-white/90 text-[14px]">
            Based on your income of <b>~€26,400/year</b>, you likely fall in the 0–11% bracket.
          </p>
          <p className="text-coral text-[20px] font-extrabold mt-2">€500 – €1,400 / year</p>
          <p className="text-silver text-[11px] mt-2 leading-snug">
            Estimate only — not financial advice. Actual amount depends on deductions, family
            situation, and other income.
          </p>
        </CCard>

        <CButton onClick={onNext}>
          Show my action pack <ArrowRight size={18} />
        </CButton>
      </div>
    </>
  );
}

function PackStep({ done, onComplete }: { done: boolean; onComplete: () => void }) {
  const months = ["Mar", "Apr", "May", "Jun"];
  const docs = [
    { label: "Your payslips (all from this year)", have: false },
    { label: "Your French tax number (numéro fiscal)", have: false },
    { label: "Your home country income", have: false },
    { label: "Your bank account details (French IBAN)", have: false },
    { label: "Form 2042 (linked below)", have: false },
  ];
  return (
    <>
      <TopBar title="Level 2 — Taxes" />
      <div className="px-6 space-y-5">
        <h2 className="text-white text-[22px] font-bold">Your tax to-do pack 📦</h2>
        <p className="text-silver text-[13px]">Everything you need, in the right order.</p>

        <CCard delay={0.05}>
          <h3 className="text-white text-[14px] font-bold mb-3 uppercase tracking-wide text-coral">
            Timeline
          </h3>
          <div className="flex items-center justify-between">
            {months.map((m, i) => (
              <div key={m} className="flex flex-col items-center flex-1 relative">
                {i > 0 && (
                  <div className="absolute right-1/2 top-2 h-0.5 w-full bg-silver/30" />
                )}
                <div
                  className={`relative z-10 h-4 w-4 rounded-full ${
                    i === 2 ? "bg-coral animate-pulse-ring" : "bg-silver/40"
                  }`}
                />
                <p className={`mt-2 text-[12px] font-bold ${i === 2 ? "text-coral" : "text-silver"}`}>
                  {m}
                </p>
                {i === 2 && <p className="text-[10px] text-white">Deadline</p>}
              </div>
            ))}
          </div>
        </CCard>

        <CCard delay={0.1}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📄</span>
            <h3 className="text-white text-[16px] font-bold">Documents to gather</h3>
          </div>
          <ul className="space-y-2">
            {docs.map((d) => (
              <li key={d.label} className="flex items-center gap-3 bg-jet/30 rounded-xl px-3 py-2.5">
                <span
                  className={`h-5 w-5 rounded-full flex items-center justify-center ${
                    d.have ? "bg-coral" : "border border-silver"
                  }`}
                >
                  {d.have && <Check size={12} className="text-white" strokeWidth={3} />}
                </span>
                <span className="text-white text-[13px]">{d.label}</span>
              </li>
            ))}
          </ul>
        </CCard>

        <div className="grid grid-cols-2 gap-3">
          <CButton variant="secondary">
            <Download size={16} /> Form 2042
          </CButton>
          <CButton variant="secondary">
            <MapPin size={16} /> Tax office
          </CButton>
        </div>

        <CCard delay={0.15}>
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 rounded-full bg-coral/20 flex items-center justify-center text-coral flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <p className="text-white text-[14px] font-bold">Centre des Finances Publiques</p>
              <p className="text-silver text-[12px]">Paris 15e — Open Mon–Fri 8:30–17:00</p>
            </div>
          </div>
          <div className="mt-3 h-24 rounded-xl relative overflow-hidden bg-jet/40">
            <svg viewBox="0 0 200 80" className="w-full h-full">
              <rect width="200" height="80" fill="#2D3142" />
              <path d="M0 40 L60 38 L120 50 L200 42" stroke="#4F5D75" strokeWidth="1" fill="none" />
              <path d="M30 0 L40 80" stroke="#4F5D75" strokeWidth="1" />
              <path d="M150 0 L140 80" stroke="#4F5D75" strokeWidth="1" />
              <circle cx="100" cy="40" r="6" fill="#EF8354" />
              <circle cx="100" cy="40" r="12" fill="#EF8354" opacity="0.3" />
            </svg>
          </div>
        </CCard>

        <CButton onClick={onComplete} disabled={done}>
          {done ? "✓ Quest complete!" : "I've filed my taxes ✓"}
        </CButton>
      </div>
    </>
  );
}
