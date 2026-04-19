import type { AppState, User } from "@/types";

const STORAGE_KEY = "quizflow-pro-state";

const starterUser: User = {
  id: "demo-user",
  name: "Ava Carter",
  email: "demo@quizflow.app",
  password: "Password123",
  avatar: "AC",
  preferences: {
    darkMode: false,
    preferredCategory: "All"
  }
};

const starterState: AppState = {
  users: [starterUser],
  sessionUserId: null,
  attempts: []
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
    return JSON.parse(raw) as AppState;
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
