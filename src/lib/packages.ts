import { useSyncExternalStore } from "react";
import { createCachedLoader } from "@/lib/localStorageCache";

export type ClassPackage = {
  id: string;
  name: string;
  sessions: number;
  duration: string;
  price: number;
  description: string;
  /** English translation of `description`, shown alongside the Korean text. */
  descriptionEn?: string;
  badge?: string;
  /** Whether this package is shown on the public payment page. Defaults to true when unset. */
  visible?: boolean;
};

export const DEFAULT_PACKAGES: ClassPackage[] = [
  {
    id: "trial",
    name: "1회 체험 수업",
    sessions: 1,
    duration: "50분",
    price: 30000,
    description: "처음 만나는 체험 수업으로 부담 없이 시작해보세요.",
    descriptionEn:
      "A low-pressure first trial class to get to know each other.",
    visible: true,
  },
  {
    id: "single",
    name: "1회 수업",
    sessions: 1,
    duration: "50분",
    price: 40000,
    description: "필요할 때마다 편하게 듣는 단건 수업입니다.",
    descriptionEn: "A single class you can book whenever you need one.",
    visible: true,
  },
  {
    id: "package-5",
    name: "5회 패키지",
    sessions: 5,
    duration: "회당 50분",
    price: 190000,
    description: "꾸준히 배우는 학습자를 위한 5회 패키지 (5% 할인 적용가)",
    descriptionEn:
      "A 5-class package for steady learners (5% discounted price).",
    badge: "5% 할인",
    visible: true,
  },
  {
    id: "package-10",
    name: "10회 패키지",
    sessions: 10,
    duration: "회당 50분",
    price: 360000,
    description: "본격적으로 실력을 쌓는 10회 패키지 (10% 할인 적용가)",
    descriptionEn:
      "A 10-class package to build real fluency (10% discounted price).",
    badge: "10% 할인",
    visible: true,
  },
];

const STORAGE_KEY = "ej-korean:packages";

export const loadPackages = createCachedLoader<ClassPackage[]>(
  STORAGE_KEY,
  DEFAULT_PACKAGES,
  (value): value is ClassPackage[] =>
    Array.isArray(value) && value.length > 0,
);

type Listener = () => void;
const listeners = new Set<Listener>();

export function savePackages(packages: ClassPackage[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(packages));
  listeners.forEach((listener) => listener());
}

export function subscribePackages(listener: Listener) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function usePackages(): ClassPackage[] {
  return useSyncExternalStore(
    subscribePackages,
    loadPackages,
    () => DEFAULT_PACKAGES,
  );
}
