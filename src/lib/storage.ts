import type { AppState, User } from "@/types";

const STORAGE_KEY = "quizflow-pro-state";

const starterUser: User = {
  id: "demo-user",
  name: "Welcome Back User",
  email: "demo@quizflow.app",
  password: "Password123",
  avatar: "WU",
  preferences: {
    darkMode: false,
    preferredCategory: "All"
  }
};

const starterState: AppState = {
  users: [starterUser],
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
      customQuizzes: parsed.customQuizzes ?? [],
      users: parsed.users.map((user) =>
        user.id === "demo-user"
          ? {
              ...user,
              name: user.name === "Ava Carter" ? starterUser.name : user.name,
              avatar: user.avatar === "AC" ? starterUser.avatar : user.avatar
            }
          : user
      )
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
