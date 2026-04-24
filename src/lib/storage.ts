import type { AppState } from "@/types";

export const STORAGE_KEY = "simple-login-app-state";

const starterState: AppState = {
  users: [],
  sessionUserId: null,
  attempts: [],
  customQuizzes: []
};

export function loadState(): AppState {
  if (typeof window === "undefined") {
    return starterState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(starterState));
    return starterState;
  }

  try {
    const parsed = JSON.parse(raw) as AppState;
    return {
      ...parsed,
      users: parsed.users ?? [],
      attempts: parsed.attempts ?? [],
      customQuizzes: parsed.customQuizzes ?? [],
      sessionUserId: parsed.sessionUserId ?? null
    };
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(starterState));
    return starterState;
  }
}

export function saveState(state: AppState) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
}

export function makeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
