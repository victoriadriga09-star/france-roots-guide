import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CCard } from "@/components/concierge/CCard";
import { BottomNav } from "@/components/concierge/BottomNav";

export const Route = createFileRoute("/deadlines")({
  component: Deadlines,
});

const FILTERS = ["All", "Urgent", "Tax", "Benefits", "Admin"] as const;

const ITEMS = [
  {
    cat: "Tax",
    title: "Tax declaration (Form 2042)",
    desc: "First-year paper declaration. Mail to Centre des Finances Publiques.",
    days: 36,
    urgency: "urgent",
    done: false,
  },
  {
    cat: "Benefits",
    title: "CAF housing renewal",
    desc: "Confirm your income and address with CAF to keep monthly aid.",
    days: 51,
    urgency: "soon",
    done: false,
  },
  {
    cat: "Admin",
    title: "Carte de séjour renewal",
    desc: "Apply 2 months before expiry on your local préfecture's site.",
    days: 109,
    urgency: "fine",
    done: false,
  },
  {
    cat: "Admin",
    title: "Update RIB with employer",
    desc: "Send your new French IBAN once your bank account is open.",
    days: 14,
    urgency: "urgent",
    done: true,
  },
];

const colors = {
  urgent: "border-coral",
  soon: "border-[color:var(--warning)]",
  fine: "border-[color:var(--success)]",
} as const;

const textColors = {
  urgent: "text-coral",
  soon: "text-[color:var(--warning)]",
  fine: "text-[color:var(--success)]",
} as const;

function Deadlines() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const filtered = ITEMS.filter(
    (i) => filter === "All" || i.cat === filter || (filter === "Urgent" && i.urgency === "urgent"),
  );

  return (
    <div className="mobile-shell pb-28">
      <div
        className="px-6 pt-4 pb-3"
        style={{ paddingTop: "max(16px, env(safe-area-inset-top))" }}
      >
        <h1 className="text-ink text-[24px] font-bold">Upcoming deadlines 🗓</h1>
      </div>

      <div className="px-6 mb-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 w-max">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition ${
                filter === f
                  ? "bg-coral text-ink"
                  : "bg-white text-ink/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 space-y-3">
        {filtered.map((item, i) => (
          <CCard
            key={item.title}
            delay={i * 0.06}
            className={`border-l-4 ${colors[item.urgency as keyof typeof colors]}`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-ink text-[15px] font-bold flex-1">{item.title}</p>
              <p
                className={`text-[14px] font-extrabold whitespace-nowrap ${
                  textColors[item.urgency as keyof typeof textColors]
                }`}
              >
                {item.days}d
              </p>
            </div>
            <p className="text-ink/60 text-[12px] mt-1">{item.desc}</p>
            <div className="mt-3">
              {item.done ? (
                <button className="text-ink/60 text-[13px] font-semibold">Already done ✓</button>
              ) : (
                <button className="text-coral text-[13px] font-bold">Start quest →</button>
              )}
            </div>
          </CCard>
        ))}
      </div>

      <BottomNav />
    </div>
  );
}
