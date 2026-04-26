## Goal

Major UX/UI upgrade pass: gamified Duolingo-style quest map with category-shaped buttons, premium AI bank-search animation, document upload step, real bank links, full Profile feature build-out, dynamic loading animation, and ambient backgrounds throughout.

---

## 1. Onboarding — new "Upload your documents" step (Step 9)

Extend the onboarding flow to **9 steps**. After Step 8 ("What do you already have?"), insert **Step 9 — Upload your documents** that asks the user to upload the files they just toggled ON in Step 8.

- File: `src/routes/onboarding.tsx`
  - Bump `TOTAL = 9`.
  - Add `Step9Uploads` component that reads `onboarding.documents`, filters to keys where value === `true`, and shows one upload tile per doc (using the same `IconCard / IconHome / IconShield…` mapping from `DOCS`).
  - Each tile: drag/drop area + "Choose file" button. On select → store filename + size in zustand under a new `onboarding.uploads: Record<string, {name: string; size: number; dataUrl?: string}>`.
  - Skip option: "I'll do this later" link at bottom (still allows continue).
  - `canContinue` for step 9 = always true (uploads optional).
- File: `src/lib/store.ts`
  - Add `uploads: Record<string, { name: string; size: number }>` to `OnboardingData`.
  - Add `setUpload(key, file)` and `removeUpload(key)` actions.
- Step indicator pills updated automatically by the existing `Array.from({length: TOTAL})` loop.

---

## 2. Onboarding Step 3 — destination search with dropdown + globe animation

Rewrite `Step3Destination` to match the reference style:

- **Search bar** at top with dropdown menu listing destinations (currently France only enabled, others locked with "Soon" tag).
- **Centerpiece**: animated globe (SVG sphere with rotating meridians, transparent/monochrome) with a **map pin icon** that animates dropping into the France region (top-right of globe).
  - Use `framer-motion`: globe rotates slowly (continuous 30s linear); pin animates `y: -100 → 0` with bounce + lemon glow burst on land.
- Below the globe: a lemon CCard saying "France · Paris · Lyon · Marseille" with the existing "Selected" pill.
- File: `src/routes/onboarding.tsx` — replace `Step3Destination` fully.

---

## 3. Loading screen — premium AI scanner animation

Replace `src/routes/loading.tsx` with a multi-phase animation matching the user's spec:

- **Background**: deep gradient `#0a0e3d → #1a1147` (dark blue → indigo). Subtle moving radial spotlights.
- **Phase 1 (0–2s) — Scanning**:
  - Center: rounded-card icon + magnifying glass (compose `Search` over a card silhouette in a white circle).
  - 5 concentric circular waves expanding outward in continuous loop, each fading from `opacity 0.6 → 0` over 2.5s with stagger (0.5s delay between each).
  - Below: "Scanning your French journey..." + subtext "Analysing the best path for you".
- **Phase 2 (2–4s) — Discovery**:
  - 6 french-system icons fade in around the center in a circular orbit (banks, tax, CAF, sécu, navigo, housing). Soft scale-up `0.8 → 1` with blur-to-sharp filter transition. Subtle floating motion (`y: ±4` infinite).
- **Phase 3 (4–6s) — Filtering**:
  - 3 icons fade out, 3 move toward center with stagger.
- **Phase 4 (6–7s) — Selection**:
  - Top 3 quest categories highlighted with lemon glow → flash → navigate to `/home`.
- Progress bar replaced with phase-aware text ("Scanning… → Discovering… → Filtering… → Building map…").

---

## 4. Quest Map — category-shaped buttons (Duolingo-style)

Rewrite `src/routes/home.tsx` path to use a **single button per stage** with shapes matching each category's symbolism:

| Stage | Category | Shape | Status |
|---|---|---|---|
| 0 | Start (Plain) | Flat plinth/diamond | done |
| 1 | Banking | Bank facade with columns | active |
| 2 | Taxes | Government building (pediment + dome) | locked-by-progress |
| 3 | Social Benefits | Gift box / heart-hands | locked-by-progress |
| 4 | Housing | House with chimney | locked (Soon) |
| 5 | Healthcare | Medical cross / pill capsule | locked (Soon) |
| 6 | Transportation | Train front / metro arch | locked (Soon) |
| 7 | Language | Speech bubble | locked (Soon) |
| 8 | Retirement | Piggy bank / hourglass | locked (Final) |

- New file `src/components/concierge/CategoryShape.tsx`: renders an inline SVG shape per category (~110×110px), with state-dependent fill (lemon gradient for active/done, navy for locked) and a center icon.
- Replace existing `SectionBlock` + `SectionBanner` + `PathNode` repeating per node. Instead: **one large stage button per section** spaced down a winding path with `offsetX` zig-zag like Duolingo.
- Connecting dashed lemon paths between stages (existing SVG path code, simplified).
- Tapping a stage → navigates to `/level/<id>`. Locked stages show toast "Complete previous level first" or "Coming soon".
- `quest.benefitsClaimed` unlocks final reward; trophy stays at the bottom.

---

## 5. Bank step — Premium AI bank-search animation

Add a new sub-step `searching` between `intro` and `recommend` in `src/routes/level.banking.tsx`:

- New component `BankSearchAnimation` (inline or `src/components/concierge/BankSearchAnimation.tsx`):
  - **Phase 1 — Scan (1.5s)**: deep blue→indigo gradient bg, center rounded-card+magnifier icon, 4 concentric ripple waves, text "Recherche…" + "Nous analysons les meilleures options pour vous".
  - **Phase 2 — Discovery (1.5s)**: 6 french bank logos (BNP, SocGen, Crédit Agricole, LCL, Boursorama, Revolut) appear in orbital layout around center, fade-in scale 0.8→1 with blur transition, gentle floating motion.
  - **Phase 3 — Filtering (1.5s)**: 3 logos fade out, 3 (Revolut, N26, SocGen) scale up and move toward horizontal centered row.
  - **Phase 4 — Lock-in (0.8s)**: Top 3 cards highlighted with lemon glow → auto-advance to `recommend` step.
- Total ~5.3s. Skippable with tap.
- Use the existing `BankLogo` component; extend it with `BNP`, `Crédit Agricole`, `LCL`, `Boursorama` SVG variants.

---

## 6. Bank logos clickable → real bank sites

In `src/components/concierge/BankLogo.tsx` (and where `BankCard` renders the logo in `level.banking.tsx`):

- Add an optional `href` prop. When present, wrap the logo in `<a target="_blank" rel="noopener noreferrer">` so tapping opens the bank's real account-opening page in a new tab.
- Map (real URLs):
  - Revolut → `https://www.revolut.com/fr-FR/`
  - N26 → `https://n26.com/fr-fr`
  - Société Générale → `https://particuliers.sg.fr/ouvrir-compte-bancaire`
  - BNP Paribas → `https://mabanque.bnpparibas/fr/ouvrir-un-compte`
  - Crédit Agricole → `https://www.credit-agricole.fr/`
  - LCL → `https://www.lcl.fr/`
  - Boursorama → `https://www.boursorama-banque.com/`
- In `BankCard` (recommend step) and the compare-modal tiles, pass `href` so users can tap the logo.

---

## 7. Profile — full feature build-out

Rewrite `src/routes/profile.tsx` so each row opens a real panel:

### 7a. Language switcher
- Bottom-sheet drawer listing: English (default), Français, Українська, Español, العربية, हिन्दी.
- Persists `onboarding.language` in zustand. Currently only labels swap in profile UI (real i18n out of scope) — selected language shown in row label.

### 7b. Privacy & data tab
- Bottom-sheet panel with toggles (active state, persisted in zustand under new `settings`):
  - Allow personalised recommendations
  - Share anonymous analytics
  - Receive marketing emails
- Buttons: "Download my data" (mock toast) and "Delete my account" (red destructive button with confirm).

### 7c. Help & support
- Bottom-sheet panel showing:
  - Email: `support@concierge.fr` (tap to mailto)
  - WhatsApp: tap to open `https://wa.me/33...`
  - FAQ link
  - **Contact form**: name (prefilled), email, subject dropdown (Bug / Feature / Question), message textarea, "Send" button → toast "Message sent — we reply within 24h".

### 7d. Update my profile
- Bottom-sheet panel with editable fields based on onboarding answers:
  - Name (text)
  - Email (text — new field)
  - Country of origin (dropdown using same COUNTRIES list)
  - Status (Student/Salaried/Freelance/Job-seeking — same chips as Step 5)
  - Time in France (chips from Step 6)
  - Goals (multi-select chips)
  - Documents I have (toggles list — same as Step 8)
- "Save changes" button persists to `onboarding`.

### 7e. Sign-out fix
- Replace `text-coral-red border-coral-red/30 bg-coral-red/5` with `text-red-400 border-red-400/30 bg-red-400/5` (the `coral-red` token is missing/legacy).

### 7f. Country card emoji bug
- Replace literal `🇫🇷` and `onboarding.fromCountryFlag` (string) with the `<Flag code="FR" />` component for consistent rendering.

---

## 8. Ambient background animation (cross-cutting)

Add a shared `<AmbientGlobe />` component (`src/components/concierge/AmbientGlobe.tsx`):

- Position: `fixed inset-0 -z-0 pointer-events-none`.
- Render a large semi-transparent SVG globe (single lemon tone, opacity 0.06) slowly rotating (60s linear loop).
- Subtle drifting radial-gradient blobs (lemon and lilac) animated with `motion.div` over 20s.
- Only renders on dark screens (home, profile, dashboard, level pages).

Mount in `__root.tsx` or per-route. Will sit behind all content so existing layouts remain readable.

---

## 9. Store extensions

`src/lib/store.ts`:

```ts
interface Settings {
  language: "en" | "fr" | "uk" | "es" | "ar" | "hi";
  personalised: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface OnboardingData {
  // ...existing fields
  email: string;            // new
  uploads: Record<string, { name: string; size: number }>; // new
}

interface AppState {
  // ...existing
  settings: Settings;
  setSettings: (patch: Partial<Settings>) => void;
  setUpload: (key: string, file: { name: string; size: number }) => void;
  removeUpload: (key: string) => void;
}
```

Defaults: language `en`, all toggles `true`.

---

## Files touched

**New**
- `src/components/concierge/AmbientGlobe.tsx`
- `src/components/concierge/CategoryShape.tsx`
- `src/components/concierge/BankSearchAnimation.tsx`
- `src/components/concierge/profile/LanguageSheet.tsx`
- `src/components/concierge/profile/PrivacySheet.tsx`
- `src/components/concierge/profile/SupportSheet.tsx`
- `src/components/concierge/profile/EditProfileSheet.tsx`

**Edited**
- `src/lib/store.ts` (uploads, settings, email)
- `src/routes/onboarding.tsx` (Step 9 uploads, new Step3 globe + search)
- `src/routes/loading.tsx` (premium AI animation)
- `src/routes/home.tsx` (single category-shape buttons per stage)
- `src/routes/level.banking.tsx` (insert searching step + bank logo links)
- `src/routes/profile.tsx` (functional rows + sheets, fix sign-out color, flag fix)
- `src/components/concierge/BankLogo.tsx` (href prop, more banks)
- `src/routes/__root.tsx` (mount `<AmbientGlobe />`)

## Out of scope

- Real i18n translations (only language label switch).
- Real file upload to a backend (uploads stored client-side in zustand only).
- Real auth / account deletion (mock toasts).
- Unlocking Housing/Healthcare/Transport/Language/Retirement levels (kept locked with shape preview).
