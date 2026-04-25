## Goal

The first half of the build (Design System, Splash, Onboarding, Loading, Banking) already lives in the premium black / navy / lemon system with Unbounded headlines, Cleo storytelling, and game-feel animations. The remaining screens still mix legacy coral / porcelain / mint styling and inconsistent voice. This pass brings them all up to the same bar.

## Scope (in order)

### 1. Quest Map — `src/routes/home.tsx` (Screen 4, hero polish)
- Replace remaining "jungle / forest / coral / porcelain" styling with the lemon / navy / black tokens.
- Black canvas + subtle lemon ambient glow + dotted navy grid backdrop.
- Top bar: Cleo avatar (waving), name + "Bonjour" eyebrow, lemon flame streak chip, lemon XP chip, navy settings button.
- Level summary card on `card-hero` (navy gradient) with lemon progress bar.
- Section banners: navy cards, lemon icon tile for active sections, "Coming soon" pill in lilac for future sections.
- Path nodes (Duolingo style):
  - `done` → lemon-filled with black check, 3D drop shadow.
  - `current` → animated pulse ring in lemon, Cleo "START" speech bubble pinned next to it.
  - `boss` → larger node with lemon gradient + crown.
  - `locked` → navy with white/30 lock icon.
- Final reward trophy in lemon gradient with glow-pulse.
- Smooth scroll-in motion for each section/node.

### 2. Dashboard — `src/routes/dashboard.tsx` (Screen 8)
Rebuild as the user's "financial picture" hub:
- Header: greeting + date, Cleo guiding pose mini-avatar.
- Hero balance card on `card-hero` navy gradient: total across accounts, EUR/UAH toggle pill, account chips (FR + Home country), "Last synced" footer.
- This-month income/expense card with lemon (income) / coral-red (expenses) split bar.
- "Unclaimed benefits" card: lemon highlight pill (€1,200/yr), 2 quick benefit rows linking to `/level/benefits`.
- "Upcoming deadlines" card with colored urgency dots (coral-red / warn-yellow / lemon).
- Cleo suggests card: navy with lemon left border, Cleo guiding avatar, suggestion + CTA.
- Journey progress card: lemon progress bar, "Continue your quest" CTA back to `/home`.

### 3. Level 2 — Taxes — `src/routes/level.taxes.tsx` (Screen 6)
Three-step storytelling flow with consistent design:
- TopBar with step progress (1/3, 2/3, 3/3) instead of plain title.
- **Intro:** Lemon-edged hero with animated tax form SVG, Cleo "thinking" speech bubble framing the chapter, lemon "+200 XP" pill, sequenced cards explaining tax year, brackets (animated lemon progress bars), first-year paper rule, other taxes.
- **Plan:** Personalized recap card (Viktoria, Ukraine, salaried, 4 months, €2,200/mo) on lemon gradient with black text. Status / process / estimated tax cards using navy surfaces and lemon highlights, deadline date in coral-red.
- **Pack:** Timeline (4 months Mar→Jun) with lemon active dot pulse, document checklist with lemon check tokens, two secondary lemon-outline buttons (Form 2042 / Tax office), Centre des Finances map card with stylized navy/lemon SVG, primary "I've filed my taxes" CTA → confetti + +200 XP + advance to Benefits.

### 4. Level 3 — Benefits — `src/routes/level.benefits.tsx` (Screen 7)
- Hero card: navy gradient with animated lemon "money rain" coins SVG, headline, Cleo guiding bubble.
- Big "You may be entitled to ~€2,100/year" callout on lemon gradient with black text.
- 4 benefit cards (CAF, Navigo, Prime d'Activité, CSS) on navy surface:
  - Lemon left border for eligible, white-10 border for "check" ones.
  - Emoji + name + monthly value in lemon-deep, eligibility pill, mini status.
- Detail drawer (slide from right): TopBar with back, lemon "Estimated value" hero, "What is it?", "Why this applies" (lemon left border), numbered step list with lemon counters and navy step cards, "What you'll need" checklist, primary lemon CTA "Apply on caf.fr →", tracking strip (Applied → Processing → Approved → Paid) with lemon active state.

### 5. Deadlines — `src/routes/deadlines.tsx` (Screen 9)
- Header: "Upcoming deadlines" + Cleo mini guide bubble ("Don't miss these — I'll keep you on track").
- Filter chips (All / Urgent / Tax / Benefits / Admin) in lemon-on-black active vs. navy/white inactive.
- Deadline cards on navy surface with colored left border by urgency:
  - urgent → coral-red, soon → warn-yellow, fine → lemon.
  - Title, description, days-left badge in matching urgency color, "Start quest →" CTA to relevant level, "Already done ✓" muted state.
- Empty state per filter handled.

### 6. Profile — `src/routes/profile.tsx` (Screen 10)
- Header: avatar with initial on lemon gradient + black text, name in Unbounded, Level 1 — Newcomer pill, XP chip.
- Stats card (Quests done / Day streak / € unlocked) — big lemon numbers, subtle white-60 labels.
- Countries card: home flag + current FR flag (lemon ring on active), "Add country" ghost CTA.
- Settings list in navy card, lemon icon tiles, divider rows: Notifications, Language, Privacy & data, Help & support, Update profile.
- Sign out: full-width ghost button in coral-red.
- Cleo waving in a small footer card: "Proud of you, Viktoria 🌟".

### 7. Cross-cutting consistency
- Audit remaining hard-coded `linear-gradient(... #4F5D75 ... #2D3142)` or coral-only blocks in these files and swap to design-system gradients (`bg-gradient-hero-card`, `bg-gradient-lemon`, `bg-gradient-night`).
- Ensure every page uses `mobile-shell pb-32`, sticky `TopBar` or page header pattern, and `BottomNav` where appropriate.
- Verify `CleoCompanion` floating mascot still appears on every screen (route-aware tips for Dashboard, Deadlines, Profile, Taxes, Benefits).
- Tighten copy across all screens to the playful, warm, narrator voice already used in Banking and Onboarding ("Let's go", "Don't panic, we've got you", "Money the state owes you").

## Technical notes (for the build pass)

- Use existing primitives: `CCard`, `CButton`, `Pill`, `ProgressBar`, `TopBar`, `BottomNav`, `Cleo`, `CleoBubble`, `CleoCompanion`.
- Animations via existing `framer-motion` patterns (`initial / whileInView / animate` with spring stiffness 220–280, damping 18–22) and the `animate-pulse-ring`, `animate-glow-pulse`, `animate-float`, `animate-bounce-soft`, `animate-pop-in` utilities already in `styles.css`.
- Use `celebrate()` from `src/lib/celebrate.ts` for quest completion at the end of Taxes and Benefits.
- Persist quest progress through `useApp` (`addXp`, `setQuest`).
- Demo data stays exactly as specified: Viktoria, Ukraine → Paris, €2,200 net, Monobank €1,800, French account €2,480, 150 XP, Level 1, 3-day streak, 2/12 quests, ~€1,200/yr unclaimed, May 31 tax deadline.
- No new packages needed; no schema changes.
- No edits to `routeTree.gen.ts` — all routes already exist.

## Out of scope (this pass)

- Locked levels (Housing, Healthcare, Language, Transport, Retirement) keep their "Coming soon" treatment — no new flows.
- Backend / persistence beyond the existing zustand store.
- Auth, accounts, real bank integrations.
