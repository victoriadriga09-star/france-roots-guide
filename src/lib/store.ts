import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Language = "en" | "fr" | "uk" | "es" | "ar" | "hi";

export interface UploadedFile {
  name: string;
  size: number;
}

export interface OnboardingData {
  name: string;
  email: string;
  fromCountry: string;
  fromCountryFlag: string;
  toCountry: string;
  goals: string[];
  status: string;
  timeInFrance: string;
  hasHomeTies: boolean | null;
  documents: Record<string, boolean>;
  uploads: Record<string, UploadedFile>;
}

export interface Settings {
  language: Language;
  personalised: boolean;
  analytics: boolean;
  marketing: boolean;
  notifications: boolean;
}

export interface QuestState {
  bankSelected?: string;
  bankApplied?: boolean;
  bankActive?: boolean;
  taxesFiled?: boolean;
  benefitsClaimed?: boolean;
  benefitsApplied: string[];
}

interface AppState {
  onboarded: boolean;
  onboarding: OnboardingData;
  settings: Settings;
  xp: number;
  streak: number;
  questsDone: number;
  level: number;
  quest: QuestState;
  setOnboarding: (patch: Partial<OnboardingData>) => void;
  setSettings: (patch: Partial<Settings>) => void;
  completeOnboarding: () => void;
  toggleDocument: (key: string) => void;
  setUpload: (key: string, file: UploadedFile) => void;
  removeUpload: (key: string) => void;
  addXp: (amount: number) => void;
  setQuest: (patch: Partial<QuestState>) => void;
  reset: () => void;
}

const defaultOnboarding: OnboardingData = {
  name: "Viktoria",
  email: "viktoria@example.com",
  fromCountry: "Ukraine",
  fromCountryFlag: "🇺🇦",
  toCountry: "France",
  goals: ["banking", "admin"],
  status: "salaried",
  timeInFrance: "3-12",
  hasHomeTies: true,
  documents: {
    bank: false,
    sim: true,
    address: true,
    secu: false,
    vitale: false,
    visa: true,
    fiscal: false,
    caf: false,
  },
  uploads: {},
};

const defaultSettings: Settings = {
  language: "en",
  personalised: true,
  analytics: true,
  marketing: false,
  notifications: true,
};

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      onboarded: false,
      onboarding: defaultOnboarding,
      settings: defaultSettings,
      xp: 0,
      streak: 3,
      questsDone: 0,
      level: 1,
      quest: { benefitsApplied: [] },
      setOnboarding: (patch) =>
        set((s) => ({ onboarding: { ...s.onboarding, ...patch } })),
      setSettings: (patch) =>
        set((s) => ({ settings: { ...s.settings, ...patch } })),
      completeOnboarding: () => set({ onboarded: true }),
      toggleDocument: (key) =>
        set((s) => ({
          onboarding: {
            ...s.onboarding,
            documents: { ...s.onboarding.documents, [key]: !s.onboarding.documents[key] },
          },
        })),
      setUpload: (key, file) =>
        set((s) => ({
          onboarding: {
            ...s.onboarding,
            uploads: { ...s.onboarding.uploads, [key]: file },
          },
        })),
      removeUpload: (key) =>
        set((s) => {
          const next = { ...s.onboarding.uploads };
          delete next[key];
          return { onboarding: { ...s.onboarding, uploads: next } };
        }),
      addXp: (amount) =>
        set((s) => ({ xp: s.xp + amount, questsDone: s.questsDone + 1 })),
      setQuest: (patch) => set((s) => ({ quest: { ...s.quest, ...patch } })),
      reset: () =>
        set({
          onboarded: false,
          onboarding: defaultOnboarding,
          settings: defaultSettings,
          xp: 0,
          streak: 3,
          questsDone: 0,
          level: 1,
          quest: { benefitsApplied: [] },
        }),
    }),
    { name: "concierge-state" },
  ),
);
