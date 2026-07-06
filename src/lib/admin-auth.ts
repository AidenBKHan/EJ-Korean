import { useSyncExternalStore } from "react";

export const ADMIN_ID = "admin";
export const ADMIN_PASSWORD = "20151213";
export const ADMIN_PASSWORD_HINT = "* 결기";

const SESSION_KEY = "ej-korean:admin-session";

export function login(id: string, password: string): boolean {
  const ok = id === ADMIN_ID && password === ADMIN_PASSWORD;
  if (ok && typeof window !== "undefined") {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  }
  return ok;
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(SESSION_KEY) === "1";
}

export function logout() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(SESSION_KEY);
}

function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

export function useIsAdminLoggedIn(): boolean {
  return useSyncExternalStore(subscribe, isLoggedIn, () => false);
}
