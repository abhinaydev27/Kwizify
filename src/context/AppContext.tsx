import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AppState, QuizAttempt, User } from "@/types";
import { quizzes } from "@/data/quizzes";
import { loadState, makeId, saveState } from "@/lib/storage";

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type AppContextValue = {
  users: User[];
  attempts: QuizAttempt[];
  sessionUser: User | null;
  quizzes: typeof quizzes;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  loginDemo: () => { ok: boolean; message?: string };
  register: (payload: RegisterPayload) => { ok: boolean; message?: string };
  logout: () => void;
  requestPasswordReset: (email: string) => { ok: boolean; message: string };
  saveAttempt: (attempt: Omit<QuizAttempt, "id" | "userId" | "completedAt">) => string;
  updatePreferences: (updates: Partial<User["preferences"]>) => void;
  changePassword: (currentPassword: string, nextPassword: string) => { ok: boolean; message: string };
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const sessionUser = state.users.find((user) => user.id === state.sessionUserId) ?? null;

  useEffect(() => {
    document.documentElement.dataset.theme = sessionUser?.preferences.darkMode ? "dark" : "light";
  }, [sessionUser?.preferences.darkMode]);

  const value = useMemo<AppContextValue>(
    () => ({
      users: state.users,
      attempts: state.attempts,
      sessionUser,
      quizzes,
      login(email, password) {
        const user = state.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
        if (!user || user.password !== password) {
          return { ok: false, message: "Invalid email or password." };
        }
        setState((current) => ({ ...current, sessionUserId: user.id }));
        return { ok: true };
      },
      loginDemo() {
        const demoUser = state.users.find((item) => item.id === "demo-user");
        if (!demoUser) {
          return { ok: false, message: "Demo account is unavailable." };
        }
        setState((current) => ({ ...current, sessionUserId: demoUser.id }));
        return { ok: true };
      },
      register(payload) {
        const existing = state.users.find((item) => item.email.toLowerCase() === payload.email.toLowerCase());
        if (existing) {
          return { ok: false, message: "An account with this email already exists." };
        }

        const user: User = {
          id: makeId("user"),
          name: payload.name,
          email: payload.email,
          password: payload.password,
          avatar: payload.name
            .split(" ")
            .map((part) => part[0]?.toUpperCase())
            .join("")
            .slice(0, 2),
          preferences: {
            darkMode: false,
            preferredCategory: "All"
          }
        };

        setState((current) => ({
          ...current,
          users: [...current.users, user],
          sessionUserId: user.id
        }));

        return { ok: true };
      },
      logout() {
        setState((current) => ({ ...current, sessionUserId: null }));
      },
      requestPasswordReset(email) {
        const user = state.users.find((item) => item.email.toLowerCase() === email.toLowerCase());
        if (!user) {
          return { ok: false, message: "No account found for that email." };
        }
        return { ok: true, message: "Reset link simulated. Use your existing password for this demo." };
      },
      saveAttempt(attempt) {
        if (!sessionUser) {
          return "";
        }
        const id = makeId("attempt");
        const nextAttempt: QuizAttempt = {
          ...attempt,
          id,
          userId: sessionUser.id,
          completedAt: new Date().toISOString()
        };

        setState((current) => ({
          ...current,
          attempts: [nextAttempt, ...current.attempts]
        }));

        return id;
      },
      updatePreferences(updates) {
        if (!sessionUser) {
          return;
        }
        setState((current) => ({
          ...current,
          users: current.users.map((user) =>
            user.id === sessionUser.id
              ? {
                  ...user,
                  preferences: {
                    ...user.preferences,
                    ...updates
                  }
                }
              : user
          )
        }));
      },
      changePassword(currentPassword, nextPassword) {
        if (!sessionUser) {
          return { ok: false, message: "You must be logged in." };
        }
        if (sessionUser.password !== currentPassword) {
          return { ok: false, message: "Current password is incorrect." };
        }
        setState((current) => ({
          ...current,
          users: current.users.map((user) =>
            user.id === sessionUser.id ? { ...user, password: nextPassword } : user
          )
        }));
        return { ok: true, message: "Password updated." };
      }
    }),
    [sessionUser, state]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
