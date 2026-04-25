import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Building2,
  FileText,
  Snail,
  Euro,
  ChevronDown,
  Star,
  Users,
  Clock,
  X,
  ArrowRight,
  Check,
  Bell,
} from "lucide-react";
import { TopBar } from "@/components/concierge/TopBar";
import { CCard, Pill, ProgressBar } from "@/components/concierge/CCard";
import { CButton } from "@/components/concierge/CButton";
import { Cleo, CleoBubble } from "@/components/concierge/Cleo";
import { useApp } from "@/lib/store";
import { celebrate } from "@/lib/celebrate";

export const Route = createFileRoute("/level/banking")({
  component: BankingLevel,
});

type Step = "intro" | "recommend" | "compare" | "apply" | "track" | "success";

function BankingLevel() {
  const [step, setStep] = useState<Step>("intro");
  const [compareOpen, setCompareOpen] = useState(false);
  const [comparing, setComparing] = useState<string[]>([]);
  const { quest, setQuest, addXp } = useApp();
  const navigate = useNavigate();

  const goTo = (s: Step) => setStep(s);

  return (
    <div className="mobile-shell pb-32">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          {step === "intro" && <IntroStep onNext={() => goTo("recommend")} />}
          {step === "recommend" && (
            <RecommendStep
              comparing={comparing}
              onCompareToggle={(b) =>
                setComparing((prev) =>
                  prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b].slice(-2),
                )
              }
              onCompare={() => setCompareOpen(true)}
              onChoose={(bank) => {
                setQuest({ bankSelected: bank });
                goTo("apply");
              }}
            />
          )}
          {step === "apply" && (
            <ApplyStep
              bank={quest.bankSelected ?? "Revolut"}
              onSubmitted={() => {
                setQuest({ bankApplied: true });
                goTo("track");
              }}
            />
          )}
          {step === "track" && (
            <TrackStep
              bank={quest.bankSelected ?? "Revolut"}
              onAccountReady={() => {
                setQuest({ bankActive: true });
                addXp(150);
                goTo("success");
              }}
            />
          )}
          {step === "success" && (
            <SuccessStep
              bank={quest.bankSelected ?? "Revolut"}
              onContinue={() => navigate({ to: "/level/taxes" })}
              onDashboard={() => navigate({ to: "/dashboard" })}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {compareOpen && (
          <CompareModal
            banks={comparing}
            onClose={() => setCompareOpen(false)}
            onChoose={(bank) => {
              setQuest({ bankSelected: bank });
              setCompareOpen(false);
              goTo("apply");
            }}
          />
        )}
      </AnimatePresence>

      {step === "recommend" && comparing.length >= 2 && !compareOpen && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-ink-black/10/60 px-6 py-4 z-40"
          style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex -space-x-2">
              {comparing.map((b) => (
                <div
                  key={b}
                  className="h-9 w-9 rounded-full bg-white text-jet font-bold flex items-center justify-center border-2 border-jet"
                >
                  {b[0]}
                </div>
              ))}
            </div>
            <CButton fullWidth={false} className="px-5" onClick={() => setCompareOpen(true)}>
              Compare {comparing.length} banks <ArrowRight size={16} />
            </CButton>
          </div>
        </motion.div>
      )}
    </div>
  );
}

/* ───────── 5A INTRO ───────── */
function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <>
      <TopBar title="Banking · Level 1" />
      <div className="px-5 pt-2 pb-4 space-y-4">
        {/* Hero */}
        <div
          className="h-[180px] rounded-[28px] relative overflow-hidden flex items-end p-5 border border-jungle/30 shadow-deep"
          style={{
            background:
              "linear-gradient(160deg, #0F2818 0%, #1a4422 60%, #248232 100%)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-jungle-glow opacity-70 pointer-events-none" />
          {/* abstract bank illustration */}
          <svg viewBox="0 0 200 120" className="absolute inset-0 w-full h-full opacity-20">
            <rect x="40" y="40" width="120" height="70" fill="none" stroke="#FCFFFC" strokeWidth="2" />
            <polygon points="30,40 100,15 170,40" fill="none" stroke="#FCFFFC" strokeWidth="2" />
            <rect x="55" y="55" width="14" height="22" fill="none" stroke="#FCFFFC" strokeWidth="1.5" />
            <rect x="78" y="55" width="14" height="22" fill="none" stroke="#FCFFFC" strokeWidth="1.5" />
            <rect x="108" y="55" width="14" height="22" fill="none" stroke="#FCFFFC" strokeWidth="1.5" />
            <rect x="131" y="55" width="14" height="22" fill="none" stroke="#FCFFFC" strokeWidth="1.5" />
          </svg>
          <div className="absolute top-4 left-4">
            <Pill variant="yellow">+50 XP for finishing</Pill>
          </div>
          <div className="relative z-10 flex-1">
            <p className="text-jungle text-[10px] font-bold uppercase tracking-[2px] mb-1">Chapter 1</p>
            <h2 className="text-porcelain text-[24px] font-display font-bold leading-tight">
              Banking, decoded.
            </h2>
          </div>
          <div className="absolute -bottom-2 right-2">
            <Cleo pose="guiding" mood="happy" size={92} />
          </div>
        </div>

        <h2 className="text-ink text-[26px] font-extrabold leading-tight tracking-tight">
          French banking, decoded ✨
        </h2>
        <p className="text-ink/70 text-[14px] font-semibold leading-snug">
          4 quick lessons. By the end, you'll have a French account opened — and bragging rights.
        </p>

        <CleoBubble
          side="left"
          pose="guiding"
          tone="default"
          text={
            <>
              First lesson: French banks come in <b>two flavors</b>. Let me break it down 👇
            </>
          }
        />

        <CCard delay={0.05}>
          <CardHeader icon={<Building2 size={20} />} title="Two types of banks" />
          <p className="text-ink/85 text-[14px] leading-relaxed font-medium">
            <b>🏛️ Traditional banks</b> (BNP, SocGen, Crédit Agricole) — physical branches,
            real-life advisors, sometimes Saturday hours.
            <br />
            <br />
            <b>📱 Neobanks</b> (Revolut, N26, Nickel) — fully online, often free, and you can
            sign up in your pajamas. 🛋️
          </p>
        </CCard>

        <CCard delay={0.1} tone="yellow">
          <CardHeader icon={<FileText size={20} />} title="Paperwork starter pack" />
          <p className="text-ink text-[14px] leading-relaxed font-semibold">
            Almost every bank wants:
            <br />
            ✓ Passport or ID 🛂
            <br />
            ✓ Proof of address in France 📄
            <br />
            ✓ Sometimes proof of income or enrollment 💼
          </p>
        </CCard>

        <CCard delay={0.15}>
          <CardHeader icon={<Snail size={20} />} title="Patience required 🐢" />
          <p className="text-ink/85 text-[14px] leading-relaxed font-medium">
            Traditional banks move at their own pace — <b>5 to 15 business days</b>. Neobanks?
            Sometimes <b>10 minutes</b>. Plan accordingly, especially for that first paycheck.
          </p>
        </CCard>

        <CCard delay={0.2}>
          <CardHeader icon={<Euro size={20} />} title="What's it gonna cost?" />
          <p className="text-ink/85 text-[14px] leading-relaxed font-medium">
            Traditional: <b>€2–10/month</b>. Neobanks: often <b>€0</b> for basic.{" "}
            <span className="text-ink font-extrabold bg-pop-yellow px-1.5 py-0.5 rounded">
              💡 Pro tip: many waive the fee if your salary lands there.
            </span>
          </p>
        </CCard>

        <div className="pt-2">
          <CButton onClick={onNext} size="lg">
            Show me my matches! <ArrowRight size={18} />
          </CButton>
        </div>
      </div>
    </>
  );
}

function CardHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="h-10 w-10 rounded-full bg-ink text-pop-yellow flex items-center justify-center border-2 border-ink">
        {icon}
      </span>
      <h3 className="text-ink text-[17px] font-extrabold">{title}</h3>
    </div>
  );
}

/* ───────── 5B RECOMMEND ───────── */

interface BankRow {
  name: string;
  type: "Neobank" | "Traditional";
  rating: number;
  reviews: string;
  clients: string;
  opening: string;
  fee: string;
  highlights: string[];
  best?: boolean;
  appRating: string;
  intl: string;
  bestFeature: string;
}

const BANKS: BankRow[] = [
  {
    name: "Revolut",
    type: "Neobank",
    rating: 4.6,
    reviews: "128K reviews",
    clients: "14M",
    opening: "10 min",
    fee: "€0",
    highlights: ["No fee with salary", "English app", "Instant card"],
    best: true,
    appRating: "4.7 ★",
    intl: "Free",
    bestFeature: "Multi-currency wallet",
  },
  {
    name: "N26",
    type: "Neobank",
    rating: 4.4,
    reviews: "82K reviews",
    clients: "8M",
    opening: "8 min",
    fee: "€0",
    highlights: ["German backed", "English app", "Spaces (sub-accounts)"],
    appRating: "4.5 ★",
    intl: "€0–1",
    bestFeature: "Spaces savings buckets",
  },
  {
    name: "Société Générale",
    type: "Traditional",
    rating: 3.9,
    reviews: "21K reviews",
    clients: "26M",
    opening: "10 days",
    fee: "€8.50",
    highlights: ["Full branch network", "Mortgage ready", "Advisor"],
    appRating: "4.1 ★",
    intl: "€15+",
    bestFeature: "Local branch advisor",
  },
];

function RecommendStep({
  comparing,
  onCompareToggle,
  onCompare,
  onChoose,
}: {
  comparing: string[];
  onCompareToggle: (b: string) => void;
  onCompare: () => void;
  onChoose: (b: string) => void;
}) {
  return (
    <>
      <TopBar title="Level 1 — Banking" />
      <div className="px-6 pt-1">
        <div className="flex items-center gap-2 mb-4">
          <ProgressDots filled={2} total={4} />
          <span className="text-ink/60 text-[12px]">Step 2 of 4</span>
        </div>
        <h2 className="text-ink text-[22px] font-bold">Your top 3 banks in France</h2>
        <p className="text-ink/60 text-[13px] mt-1">
          Based on your profile — salaried, arriving from Ukraine, needing a quick setup.
        </p>
        <div className="mt-3 mb-5">
          <Pill>✨ Personalized for you</Pill>
        </div>
        <div className="space-y-4">
          {BANKS.map((b, i) => (
            <BankCard
              key={b.name}
              bank={b}
              delay={i * 0.08}
              comparing={comparing.includes(b.name)}
              onToggleCompare={() => onCompareToggle(b.name)}
              onChoose={() => onChoose(b.name)}
            />
          ))}
        </div>
        {comparing.length >= 2 && (
          <div className="mt-5">
            <CButton variant="secondary" onClick={onCompare}>
              Open comparison ({comparing.length})
            </CButton>
          </div>
        )}
      </div>
    </>
  );
}

function ProgressDots({ filled, total }: { filled: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i < filled ? "bg-coral w-6" : "bg-white w-3"
          }`}
        />
      ))}
    </div>
  );
}

function BankCard({
  bank,
  delay,
  comparing,
  onToggleCompare,
  onChoose,
}: {
  bank: BankRow;
  delay: number;
  comparing: boolean;
  onToggleCompare: () => void;
  onChoose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const { onboarding } = useApp();
  const docList = [
    { key: "passport", label: "Passport / ID", have: true },
    { key: "address", label: "Proof of address", have: onboarding.documents.address },
    { key: "bank", label: "Existing bank statement", have: false },
  ];

  return (
    <CCard delay={delay} className="relative">
      {bank.best && (
        <span className="absolute top-4 right-4 bg-coral text-ink px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide">
          Best match
        </span>
      )}
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-white text-jet font-extrabold text-[18px] flex items-center justify-center">
          {bank.name[0]}
        </div>
        <div>
          <h3 className="text-ink text-[18px] font-bold">{bank.name}</h3>
          <span className="text-ink/60 text-[11px] bg-white/10 px-2 py-0.5 rounded-full">
            {bank.type}
          </span>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={14}
              fill={i <= Math.round(bank.rating) ? "#EF8354" : "transparent"}
              className={i <= Math.round(bank.rating) ? "text-coral" : "text-ink/60/40"}
            />
          ))}
        </div>
        <span className="text-coral text-[13px] font-bold">{bank.rating}/5</span>
        <span className="text-ink/60 text-[12px]">({bank.reviews})</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Metric icon={<Users size={14} />} label="Clients" value={bank.clients} />
        <Metric icon={<Clock size={14} />} label="Opening" value={bank.opening} />
        <Metric icon={<Euro size={14} />} label="Fee/mo" value={bank.fee} />
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="mt-4 text-coral text-[12px] font-semibold flex items-center gap-1"
      >
        Documents needed <ChevronDown size={14} className={open ? "rotate-180 transition" : "transition"} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-2 space-y-1"
          >
            {docList.map((d) => (
              <li
                key={d.key}
                className={`text-[13px] flex items-center gap-2 ${
                  d.have ? "text-coral" : "text-ink/60"
                }`}
              >
                <span>{d.have ? "✓" : "○"}</span> {d.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {bank.highlights.map((h) => (
          <span
            key={h}
            className="text-[11px] text-coral border border-coral/50 rounded-full px-2 py-0.5"
          >
            {h}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <CButton variant="secondary" onClick={onToggleCompare}>
          {comparing ? "Added ✓" : "Compare"}
        </CButton>
        <CButton onClick={onChoose}>Choose</CButton>
      </div>
    </CCard>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white/40 rounded-lg py-2 px-2 text-center">
      <div className="text-ink/60 flex items-center justify-center mb-0.5">{icon}</div>
      <p className="text-ink text-[13px] font-bold">{value}</p>
      <p className="text-ink/60 text-[10px]">{label}</p>
    </div>
  );
}

/* ───────── 5C COMPARE MODAL ───────── */

function CompareModal({
  banks,
  onClose,
  onChoose,
}: {
  banks: string[];
  onClose: () => void;
  onChoose: (b: string) => void;
}) {
  const items = BANKS.filter((b) => banks.includes(b.name));
  const [chosen, setChosen] = useState<string>(items[0]?.name ?? "");

  const rows: { label: string; key: keyof BankRow; better?: "high" | "low" }[] = [
    { label: "Satisfaction", key: "rating", better: "high" },
    { label: "Clients", key: "clients", better: "high" },
    { label: "Monthly fee", key: "fee", better: "low" },
    { label: "Time to open", key: "opening", better: "low" },
    { label: "International", key: "intl", better: "low" },
    { label: "App rating", key: "appRating", better: "high" },
    { label: "Best feature", key: "bestFeature" },
  ];

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", damping: 30, stiffness: 280 }}
      className="fixed inset-0 z-50 bg-white flex flex-col mobile-shell"
    >
      <div
        className="px-6 pt-4 pb-3 flex items-center justify-between"
        style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
      >
        <h3 className="text-ink text-[18px] font-bold">Compare banks</h3>
        <button onClick={onClose} className="text-ink">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32">
        <div className="grid grid-cols-2 gap-3 sticky top-0 bg-white pt-2 pb-3">
          {items.map((b) => (
            <button
              key={b.name}
              onClick={() => setChosen(b.name)}
              className={`bg-white rounded-2xl p-3 text-center border-2 transition ${
                chosen === b.name ? "border-coral" : "border-transparent"
              }`}
            >
              <div className="h-10 w-10 mx-auto rounded-lg bg-white text-jet font-bold flex items-center justify-center">
                {b.name[0]}
              </div>
              <p className="mt-1 text-ink text-[13px] font-bold">{b.name}</p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden">
          {rows.map((row, i) => (
            <div
              key={row.key}
              className={`grid grid-cols-3 px-3 py-3 ${
                i % 2 === 0 ? "bg-white" : "bg-white"
              }`}
            >
              <div className="text-ink/60 text-[12px] font-semibold col-span-1">
                {row.label}
              </div>
              {items.map((b) => (
                <div
                  key={b.name}
                  className="text-ink text-[13px] font-medium text-center col-span-1"
                >
                  {String(b[row.key])}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-6 pb-6 pt-3 bg-white"
        style={{ paddingBottom: "max(20px, env(safe-area-inset-bottom))" }}
      >
        <CButton onClick={() => onChoose(chosen)} disabled={!chosen}>
          I've made my choice — {chosen} →
        </CButton>
      </div>
    </motion.div>
  );
}

/* ───────── 5D APPLY ───────── */

function ApplyStep({ bank, onSubmitted }: { bank: string; onSubmitted: () => void }) {
  const steps = [
    { t: "Download the app", d: `Search '${bank}' in App Store or Google Play — takes 30 seconds.` },
    { t: "Create your account", d: "Enter your email and set a password. Use a secure one — this is your money!" },
    { t: "Verify your identity", d: "Take a photo of your passport and a quick selfie video. AI checks it instantly." },
    { t: "Confirm your address", d: "Upload your rental contract or utility bill." },
    { t: "Activate your card", d: "Your virtual card is ready instantly. Physical card arrives in 5–7 days." },
  ];

  return (
    <>
      <TopBar title="Level 1 — Banking" />
      <div className="px-6 space-y-5">
        <div className="flex items-center gap-2">
          <ProgressDots filled={3} total={4} />
          <span className="text-ink/60 text-[12px]">Step 3 of 4</span>
        </div>
        <div>
          <h2 className="text-ink text-[22px] font-bold">Let's open your account 🎯</h2>
          <p className="text-ink/60 text-[13px] mt-1">
            You chose <span className="text-coral font-semibold">{bank}</span>. Here's exactly what
            to do — we'll walk you through every step.
          </p>
        </div>

        <div className="relative pl-3">
          <div className="absolute left-[18px] top-3 bottom-3 w-px bg-white" />
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 mb-3 relative"
            >
              <div className="h-7 w-7 rounded-full bg-coral text-ink text-[12px] font-bold flex items-center justify-center z-10">
                {i + 1}
              </div>
              <div className="flex-1 bg-white rounded-2xl p-4">
                <p className="text-ink text-[15px] font-bold">{s.t}</p>
                <p className="text-ink/60 text-[12px] mt-1 leading-snug">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <CCard delay={0.4}>
          <h3 className="text-ink text-[16px] font-bold mb-3">What to have ready 📋</h3>
          <DocChecklist />
        </CCard>

        <div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #EF8354 0%, #4F5D75 100%)",
          }}
        >
          <div className="flex items-center gap-3">
            <Cleo pose="guiding" size={56} />
            <p className="text-ink text-[14px] font-semibold flex-1">
              Ready? This takes about 10 minutes.
            </p>
          </div>
          <div className="mt-4">
            <CButton variant="white" onClick={onSubmitted}>
              Open {bank} app →
            </CButton>
          </div>
          <p className="mt-2 text-ink/80 text-[11px] text-center">
            Come back here when done — we'll track your status.
          </p>
        </div>
      </div>
    </>
  );
}

function DocChecklist() {
  const { onboarding } = useApp();
  const items = [
    { key: "address", label: "Proof of address" },
    { key: "visa", label: "Residence permit / visa" },
    { key: "fiscal", label: "French tax number" },
  ];
  return (
    <ul className="space-y-2">
      {items.map((d) => {
        const have = onboarding.documents[d.key];
        return (
          <li
            key={d.key}
            className="flex items-center justify-between bg-white/30 rounded-xl px-3 py-2.5"
          >
            <span className="text-ink text-[14px]">{d.label}</span>
            <span
              className={`h-5 w-5 rounded-full flex items-center justify-center ${
                have ? "bg-coral" : "border border-silver"
              }`}
            >
              {have && <Check size={12} className="text-ink" strokeWidth={3} />}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/* ───────── 5E TRACK ───────── */

function TrackStep({
  bank,
  onAccountReady,
}: {
  bank: string;
  onAccountReady: () => void;
}) {
  const [phase, setPhase] = useState(1);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 2200);
    const t2 = setTimeout(() => setPhase(3), 4400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const stages = ["Submitted", "Under review", "Approved", "Account ready"];

  return (
    <>
      <TopBar title="Level 1 — Banking" />
      <div className="px-6 space-y-5">
        <div className="flex items-center gap-2">
          <ProgressDots filled={4} total={4} />
          <span className="text-ink/60 text-[12px]">Step 4 of 4</span>
        </div>
        <div>
          <h2 className="text-ink text-[22px] font-bold">Application submitted! 🎉</h2>
          <p className="text-ink/60 text-[13px] mt-1">Now we wait. Here's where things stand:</p>
        </div>

        {/* Timeline */}
        <CCard>
          <div className="flex items-center justify-between">
            {stages.map((s, i) => {
              const done = i < phase;
              const current = i === phase;
              return (
                <div key={s} className="flex-1 flex flex-col items-center relative">
                  {i > 0 && (
                    <div
                      className={`absolute right-1/2 top-3 h-0.5 w-full ${
                        i <= phase ? "bg-coral" : "bg-silver/30"
                      }`}
                    />
                  )}
                  <div
                    className={`relative z-10 h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      done
                        ? "bg-coral text-ink"
                        : current
                          ? "bg-coral/30 border-2 border-coral text-coral animate-pulse-ring"
                          : "border border-silver/50 text-ink/60"
                    }`}
                  >
                    {done ? <Check size={12} strokeWidth={3} /> : ""}
                  </div>
                  <p className={`mt-1.5 text-[10px] font-semibold text-center ${
                    done || current ? "text-ink" : "text-ink/60"
                  }`}>
                    {s}
                  </p>
                </div>
              );
            })}
          </div>
        </CCard>

        <CCard>
          <div className="mb-2">
            <Pill>{phase >= 3 ? "✓ Approved" : "⏳ Under review"}</Pill>
          </div>
          <p className="text-ink text-[14px] leading-relaxed">
            {phase >= 3
              ? `Your ${bank} account is being activated. Final touches in progress.`
              : `Your documents are being checked. This usually takes 1–3 business days for ${bank}.`}
          </p>
          <p className="text-ink/60 text-[11px] mt-2">Last updated: just now</p>
        </CCard>

        <CCard className="flex items-center justify-between">
          <div>
            <p className="text-ink text-[14px] font-bold">Get notified when it's done 🔔</p>
            <p className="text-ink/60 text-[12px] mt-0.5">
              We'll send you a push the moment your account is ready.
            </p>
          </div>
          <Bell size={20} className="text-coral" />
        </CCard>

        <CCard>
          <div className="flex items-center gap-3 mb-3">
            <Cleo pose="thinking" size={48} />
            <p className="text-ink text-[14px] font-semibold">
              While your account is opening...
            </p>
          </div>
          <div className="flex flex-col gap-2">
            {["→ Explore Level 2: Taxes", "→ Learn about CAF benefits"].map((t) => (
              <span
                key={t}
                className="text-coral text-[13px] bg-coral/10 px-3 py-2 rounded-full font-semibold"
              >
                {t}
              </span>
            ))}
          </div>
        </CCard>

        <CButton onClick={onAccountReady}>Mark account as ready (demo) 🎉</CButton>
      </div>
    </>
  );
}

/* ───────── 5F SUCCESS ───────── */

function SuccessStep({
  bank,
  onContinue,
  onDashboard,
}: {
  bank: string;
  onContinue: () => void;
  onDashboard: () => void;
}) {
  useEffect(() => {
    celebrate();
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-6 text-center">
      <Cleo pose="celebrating" size={120} />
      <h1 className="mt-6 text-ink text-[28px] font-extrabold">Your account is open! 🏦</h1>
      <p className="mt-2 text-ink/60 text-[14px]">{bank} account activated</p>

      <div
        className="mt-6 w-full rounded-2xl p-5"
        style={{ background: "linear-gradient(135deg, #EF8354 0%, #4F5D75 100%)" }}
      >
        <p className="text-ink text-[18px] font-bold">🎉 Quest complete!</p>
        <motion.p
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-ink text-[28px] font-extrabold mt-1"
        >
          +150 XP earned
        </motion.p>
        <div className="mt-4">
          <ProgressBar value={4} max={4} />
          <p className="text-ink/90 text-[12px] mt-2">Level 1 — 100% complete</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-4 bg-white border border-coral/40 rounded-xl px-3 py-2 text-coral text-[13px] font-semibold"
      >
        🔓 Level 2 — Taxes unlocked!
      </motion.div>

      <div className="mt-8 w-full space-y-3">
        <CButton onClick={onContinue}>Continue to Level 2 →</CButton>
        <CButton variant="ghost" onClick={onDashboard}>
          View my dashboard first
        </CButton>
      </div>
    </div>
  );
}
