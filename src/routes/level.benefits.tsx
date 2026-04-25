import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ExternalLink, Check } from "lucide-react";
import { TopBar } from "@/components/concierge/TopBar";
import { CCard, Pill } from "@/components/concierge/CCard";
import { CButton } from "@/components/concierge/CButton";

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
    desc: "Monthly housing aid from the government. You've been here 4 months — you may already have €800 unclaimed.",
    why: "You're a salaried resident with a long-term lease and an income under the CAF threshold for Paris.",
    steps: [
      { t: "Create a CAF account", d: "Sign up on caf.fr with your numéro de sécu." },
      { t: "Submit your lease", d: "Upload your signed rental contract (bail)." },
      { t: "Add your bank IBAN", d: "Where CAF will deposit the monthly aid." },
      { t: "Wait for review", d: "Usually 2–4 weeks. Then payments start monthly." },
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
      { t: "Receive your discount card", d: "Arrives by mail in 7–10 days." },
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
    why: "Your declared income of €2,200/mo is just over the threshold but partial eligibility may apply.",
    steps: [
      { t: "Log into your CAF account", d: "Use the same CAF account you created." },
      { t: "Open Prime d'Activité simulator", d: "Confirm exact eligibility." },
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
    <div className="mobile-shell pb-32">
      <TopBar title="Level 3 — Benefits 🎁" />
      <div className="px-6 space-y-5">
        <div
          className="h-[180px] rounded-[20px] relative overflow-hidden p-5"
          style={{ background: "linear-gradient(135deg, #EF8354 0%, #4F5D75 100%)" }}
        >
          <svg viewBox="0 0 200 130" className="absolute inset-0 w-full h-full">
            {[
              { x: 30, y: 20, d: 0 },
              { x: 80, y: 10, d: 0.3 },
              { x: 140, y: 25, d: 0.6 },
              { x: 50, y: 70, d: 0.9 },
              { x: 110, y: 75, d: 1.2 },
              { x: 160, y: 65, d: 1.5 },
            ].map((g, i) => (
              <g key={i}>
                <rect
                  x={g.x}
                  y={g.y}
                  width="32"
                  height="32"
                  rx="4"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                />
                <line x1={g.x + 16} y1={g.y} x2={g.x + 16} y2={g.y + 32} stroke="white" strokeWidth="2" />
                <line x1={g.x} y1={g.y + 12} x2={g.x + 32} y2={g.y + 12} stroke="white" strokeWidth="2" />
                <path
                  d={`M${g.x + 12} ${g.y - 4} q4 -8 8 0 q4 -8 8 0`}
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </g>
            ))}
          </svg>
        </div>

        <h2 className="text-ink text-[22px] font-bold">
          France loves to give. Let's make sure you receive. 🇫🇷
        </h2>
        <p className="text-ink/60 text-[13px] -mt-3">
          Here's what you're likely entitled to — most people miss at least one of these.
        </p>

        <div
          className="rounded-[20px] p-5 text-center"
          style={{ background: "linear-gradient(135deg, #EF8354 0%, #d96d3f 100%)" }}
        >
          <p className="text-ink/90 text-[12px] uppercase tracking-wider font-semibold">
            💰 You may be entitled to
          </p>
          <p className="text-ink text-[36px] font-extrabold mt-1">~€2,100/year</p>
          <p className="text-ink/80 text-[12px]">Across 3 benefits based on your profile</p>
        </div>

        <div className="space-y-3">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.id} b={b} delay={i * 0.06} onOpen={() => setOpen(b)} />
          ))}
        </div>
      </div>

      <AnimatePresence>{open && <BenefitDetail b={open} onClose={() => setOpen(null)} />}</AnimatePresence>
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
      className={`w-full text-left bg-white rounded-[20px] p-5 border-l-4 ${
        b.eligible ? "border-coral" : "border-silver/40"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{b.emoji}</span>
        <div className="flex-1">
          <p className="text-ink text-[15px] font-bold">{b.name}</p>
          <p className="text-coral text-[20px] font-extrabold mt-1">{b.value}</p>
          <p className="text-ink/60 text-[12px] mt-1 leading-snug">{b.desc}</p>
        </div>
        <Pill variant={b.eligible ? "coral" : "silver"}>
          {b.eligible ? "✓ Eligible" : "Check"}
        </Pill>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-ink/60 text-[12px]">○ Not applied yet</span>
        <span className="text-coral text-[12px] font-semibold flex items-center gap-1">
          Start quest <ArrowRight size={14} />
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
      className="fixed inset-0 z-50 bg-white mobile-shell overflow-y-auto pb-28"
    >
      <TopBar title={b.name} onBack={onClose} />
      <div className="px-6 space-y-5">
        <div
          className="rounded-[20px] p-5"
          style={{ background: "linear-gradient(135deg, #EF8354 0%, #4F5D75 100%)" }}
        >
          <p className="text-ink/90 text-[12px] uppercase tracking-wider">Estimated value</p>
          <p className="text-ink text-[36px] font-extrabold">{b.value}</p>
          <p className="text-ink/90 text-[13px]">Eligible based on your profile</p>
        </div>

        <CCard>
          <h3 className="text-ink text-[16px] font-bold mb-2">What is it?</h3>
          <p className="text-ink/90 text-[14px]">{b.desc}</p>
        </CCard>

        <CCard className="border-l-4 border-coral">
          <h3 className="text-ink text-[16px] font-bold mb-2">Why this applies to you</h3>
          <p className="text-ink/90 text-[14px]">{b.why}</p>
        </CCard>

        <div>
          <h3 className="text-ink text-[16px] font-bold mb-3">How to apply</h3>
          <div className="relative pl-3">
            <div className="absolute left-[18px] top-3 bottom-3 w-px bg-white" />
            {b.steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 mb-3 relative"
              >
                <div className="h-7 w-7 rounded-full bg-coral text-ink text-[12px] font-bold flex items-center justify-center z-10">
                  {i + 1}
                </div>
                <div className="flex-1 bg-white rounded-2xl p-4">
                  <p className="text-ink text-[14px] font-bold">{s.t}</p>
                  <p className="text-ink/60 text-[12px] mt-1">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <CCard>
          <h3 className="text-ink text-[15px] font-bold mb-2">What you'll need</h3>
          <ul className="space-y-2">
            {["Proof of address", "Bank IBAN", "ID / passport"].map((d) => (
              <li
                key={d}
                className="flex items-center justify-between bg-white/30 rounded-xl px-3 py-2.5"
              >
                <span className="text-ink text-[13px]">{d}</span>
                <span className="h-5 w-5 rounded-full bg-coral flex items-center justify-center">
                  <Check size={12} className="text-ink" strokeWidth={3} />
                </span>
              </li>
            ))}
          </ul>
        </CCard>

        <CButton>
          Apply on {b.applyOn} <ExternalLink size={16} />
        </CButton>

        {/* Tracking preview */}
        <CCard>
          <h3 className="text-ink text-[15px] font-bold mb-3">Tracking</h3>
          <div className="flex items-center justify-between">
            {["Applied", "Processing", "Approved", "Paid"].map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center relative">
                {i > 0 && <div className="absolute right-1/2 top-3 h-0.5 w-full bg-silver/30" />}
                <div className="h-6 w-6 rounded-full border border-silver/50 z-10" />
                <p className="mt-1 text-[10px] text-ink/60 text-center">{s}</p>
              </div>
            ))}
          </div>
          <p className="text-ink/60 text-[12px] mt-3">
            CAF usually processes in 2–4 weeks. We'll notify you the moment it moves.
          </p>
        </CCard>
      </div>
    </motion.div>
  );
}
