import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ExternalLink, Check, Sparkles } from "lucide-react";
import { TopBar } from "@/components/concierge/TopBar";
import { CCard, Pill } from "@/components/concierge/CCard";
import { CButton } from "@/components/concierge/CButton";
import { Cleo, CleoBubble } from "@/components/concierge/Cleo";

export const Route = createFileRoute("/level/benefits")({
  component: BenefitsLevel,
});

interface Benefit {
  id: string;
  emoji: string;
  name: string;
  value: string;
  monthly: string;
  eligible: boolean;
  desc: string;
  why: string;
  steps: { t: string; d: string }[];
  applyOn: string;
}

const BENEFITS: Benefit[] = [
  {
    id: "caf",
    emoji: "🏠",
    name: "CAF — Housing Allowance",
    value: "~€200/month",
    monthly: "€200",
    eligible: true,
    desc: "Monthly housing aid from the state. 4 months in = up to €800 may already be unclaimed.",
    why: "Salaried resident with a long-term lease, income under the Paris CAF threshold.",
    steps: [
      { t: "Create a CAF account", d: "Sign up on caf.fr with your numéro de sécu." },
      { t: "Submit your lease", d: "Upload your signed bail (rental contract)." },
      { t: "Add your IBAN", d: "Where CAF will deposit the monthly aid." },
      { t: "Wait for review", d: "2–4 weeks. Then payments start monthly." },
    ],
    applyOn: "caf.fr",
  },
  {
    id: "navigo",
    emoji: "🚇",
    name: "Navigo Solidarity",
    value: "Up to 50% off",
    monthly: "€42 saved",
    eligible: false,
    desc: "Half-price Paris transport pass for lower incomes.",
    why: "Available based on your CAF income calculation.",
    steps: [
      { t: "Get your CAF attestation", d: "Income proof from CAF." },
      { t: "Apply at navigo.fr", d: "Upload attestation + ID." },
      { t: "Get your discount card", d: "Arrives by mail in 7–10 days." },
    ],
    applyOn: "navigo.fr",
  },
  {
    id: "prime",
    emoji: "🛒",
    name: "Prime d'Activité",
    value: "~€150/month",
    monthly: "€150",
    eligible: true,
    desc: "Monthly bonus from CAF if you work and earn under €1,800 net.",
    why: "Your €2,200/mo is just over the line — partial eligibility may apply.",
    steps: [
      { t: "Log into CAF", d: "Use the same CAF account you created." },
      { t: "Open the simulator", d: "Confirm exact eligibility." },
      { t: "Submit declaration", d: "Done quarterly — paid monthly." },
    ],
    applyOn: "caf.fr",
  },
  {
    id: "css",
    emoji: "💊",
    name: "Complémentaire Santé Solidaire",
    value: "Free top-up",
    monthly: "€60 saved",
    eligible: false,
    desc: "Free health insurance top-up for lower incomes.",
    why: "Eligibility based on annual income — let's check together.",
    steps: [
      { t: "Get your numéro de sécu", d: "From your employer or CPAM." },
      { t: "Apply on ameli.fr", d: "Upload income proof." },
    ],
    applyOn: "ameli.fr",
  },
];

function BenefitsLevel() {
  const [open, setOpen] = useState<Benefit | null>(null);
  return (
    <div className="mobile-shell pb-32 bg-black min-h-screen">
      <TopBar
        title={<span className="font-display font-bold text-white">Benefits · Level 3</span>}
      />
      <div className="px-5 pt-2 pb-4 space-y-5">
        {/* Hero with money rain */}
        <div className="h-[200px] rounded-[28px] relative overflow-hidden p-5 border border-lemon/30 shadow-deep card-hero">
          <div className="absolute inset-0 bg-gradient-jungle-glow opacity-80 pointer-events-none" />
          <svg viewBox="0 0 200 130" className="absolute inset-0 w-full h-full opacity-50">
            {[
              { x: 30, y: 20, d: 0 },
              { x: 80, y: 8, d: 0.3 },
              { x: 140, y: 25, d: 0.6 },
              { x: 50, y: 70, d: 0.9 },
              { x: 110, y: 75, d: 1.2 },
              { x: 160, y: 65, d: 1.5 },
            ].map((g, i) => (
              <motion.g
                key={i}
                animate={{ y: [0, 8, 0], rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, delay: g.d }}
                style={{ transformOrigin: `${g.x + 12}px ${g.y + 12}px` }}
              >
                <circle cx={g.x + 12} cy={g.y + 12} r="11" fill="#F8FFA1" stroke="#000" strokeWidth="1.5" />
                <text
                  x={g.x + 12}
                  y={g.y + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="900"
                  fill="#000"
                >
                  €
                </text>
              </motion.g>
            ))}
          </svg>
          <div className="absolute top-4 left-4">
            <Pill variant="lemon">+200 XP</Pill>
          </div>
          <div className="relative z-10 flex-1 mt-10">
            <p className="text-lemon text-[10px] font-bold uppercase tracking-[2px] font-ui mb-1">
              Chapter 3
            </p>
            <h2 className="text-white text-[24px] font-display font-bold leading-tight">
              Free money 💸
            </h2>
          </div>
          <div className="absolute -bottom-2 right-2">
            <Cleo pose="celebrating" mood="wow" size={92} />
          </div>
        </div>

        <h2 className="text-white text-[22px] font-display font-bold tracking-tight">
          France loves to give. Let's make sure you receive. 🇫🇷
        </h2>

        <CleoBubble
          side="left"
          pose="guiding"
          tone="dark"
          text={
            <>
              Most newcomers miss <b>at least one</b> of these. Not on my watch 😎
            </>
          }
        />

        {/* Big number callout */}
        <CCard tone="lemon" delay={0.05} className="text-center !p-6">
          <p className="text-black/70 text-[10px] uppercase tracking-[2px] font-ui font-bold flex items-center justify-center gap-1">
            <Sparkles size={11} /> You may be entitled to
          </p>
          <p className="text-black text-[40px] font-display font-extrabold mt-1 tracking-tight">
            ~€2,100<span className="text-[20px]">/yr</span>
          </p>
          <p className="text-black/70 text-[12px] font-ui font-semibold">
            Across 3 benefits matched to your profile
          </p>
        </CCard>

        <div className="space-y-3">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.id} b={b} delay={i * 0.06} onOpen={() => setOpen(b)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && <BenefitDetail b={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

function BenefitCard({
  b,
  delay,
  onOpen,
}: {
  b: Benefit;
  delay: number;
  onOpen: () => void;
}) {
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileTap={{ scale: 0.98 }}
      className={`w-full text-left card-navy p-5 border-l-4 ${
        b.eligible ? "!border-l-lemon" : "!border-l-white/15"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{b.emoji}</span>
        <div className="flex-1">
          <p className="text-white text-[15px] font-display font-bold">{b.name}</p>
          <p className="text-lemon text-[20px] font-display font-extrabold mt-1">{b.value}</p>
          <p className="text-white-60 text-[12px] mt-1 leading-snug font-ui">{b.desc}</p>
        </div>
        <Pill variant={b.eligible ? "lemon" : "ghost"}>
          {b.eligible ? "✓ Eligible" : "Check"}
        </Pill>
      </div>
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
        <span className="text-white-60 text-[11px] font-ui font-semibold">○ Not applied yet</span>
        <span className="text-lemon text-[12px] font-display font-bold flex items-center gap-1">
          Start quest <ArrowRight size={13} />
        </span>
      </div>
    </motion.button>
  );
}

function BenefitDetail({ b, onClose }: { b: Benefit; onClose: () => void }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 280 }}
      className="fixed inset-0 z-50 bg-black mobile-shell overflow-y-auto pb-28"
    >
      <TopBar
        title={<span className="font-display font-bold text-white truncate">{b.name}</span>}
        onBack={onClose}
      />
      <div className="px-5 pt-2 pb-4 space-y-5">
        <CCard tone="lemon" className="!p-5">
          <p className="text-black/70 text-[10px] uppercase tracking-[2px] font-ui font-bold">
            Estimated value
          </p>
          <p className="text-black text-[36px] font-display font-extrabold tracking-tight">
            {b.value}
          </p>
          <p className="text-black/80 text-[13px] font-ui font-semibold">
            Eligible based on your profile
          </p>
        </CCard>

        <CCard>
          <h3 className="text-white text-[16px] font-display font-bold mb-2">What is it?</h3>
          <p className="text-white text-[14px] font-ui font-medium leading-relaxed">{b.desc}</p>
        </CCard>

        <CCard className="border-l-4 !border-l-lemon">
          <h3 className="text-white text-[16px] font-display font-bold mb-2">
            Why this applies to you
          </h3>
          <p className="text-white text-[14px] font-ui font-medium leading-relaxed">{b.why}</p>
        </CCard>

        <div>
          <h3 className="text-white text-[16px] font-display font-bold mb-3">How to apply</h3>
          <div className="relative pl-3">
            <div className="absolute left-[18px] top-3 bottom-3 w-px bg-lemon/30" />
            {b.steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 mb-3 relative"
              >
                <div className="h-7 w-7 rounded-full bg-lemon text-black text-[12px] font-display font-extrabold flex items-center justify-center z-10 border-2 border-black">
                  {i + 1}
                </div>
                <div className="flex-1 card-navy p-4 !rounded-2xl">
                  <p className="text-white text-[14px] font-display font-bold">{s.t}</p>
                  <p className="text-white-60 text-[12px] mt-1 font-ui">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <CCard>
          <h3 className="text-white text-[15px] font-display font-bold mb-2">What you'll need</h3>
          <ul className="space-y-2">
            {["Proof of address", "Bank IBAN", "ID / passport"].map((d) => (
              <li
                key={d}
                className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2.5 border border-white/10"
              >
                <span className="text-white text-[13px] font-ui font-semibold">{d}</span>
                <span className="h-5 w-5 rounded-full bg-lemon flex items-center justify-center">
                  <Check size={12} className="text-black" strokeWidth={3.4} />
                </span>
              </li>
            ))}
          </ul>
        </CCard>

        <CButton>
          Apply on {b.applyOn} <ExternalLink size={16} />
        </CButton>

        <CCard>
          <h3 className="text-white text-[15px] font-display font-bold mb-3">Tracking</h3>
          <div className="flex items-center justify-between relative">
            <div className="absolute left-2 right-2 top-3 h-0.5 bg-white/10" />
            {["Applied", "Processing", "Approved", "Paid"].map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center relative z-10">
                <div
                  className={`h-6 w-6 rounded-full border-2 ${
                    i === 0 ? "bg-lemon border-black shadow-lemon" : "border-white/20 bg-navy"
                  }`}
                />
                <p
                  className={`mt-2 text-[10px] text-center font-ui font-bold ${
                    i === 0 ? "text-lemon" : "text-white-40"
                  }`}
                >
                  {s}
                </p>
              </div>
            ))}
          </div>
          <p className="text-white-60 text-[12px] mt-3 font-ui italic">
            CAF usually takes 2–4 weeks. I'll ping you the moment it moves ⚡
          </p>
        </CCard>
      </div>
    </motion.div>
  );
}
