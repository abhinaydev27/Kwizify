import { useState } from "react";
import { GlassCard, PrimaryButton, TextInput } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export function ProfilePage() {
  const { sessionUser, updatePreferences, changePassword, logout } = useApp();
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [message, setMessage] = useState("");

  if (!sessionUser) {
    return null;
  }

  function submitPasswordChange(event: React.FormEvent) {
    event.preventDefault();
    const result = changePassword(currentPassword, nextPassword);
    setMessage(result.message);
    if (result.ok) {
      setCurrentPassword("");
      setNextPassword("");
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-5 py-8 lg:px-8">
      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 text-2xl font-semibold text-white">
              {sessionUser.avatar}
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Profile</p>
              <h1 className="text-3xl font-semibold">{sessionUser.name}</h1>
              <p className="text-[var(--muted)]">{sessionUser.email}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <GlassCard className="p-5">
              <p className="text-sm text-[var(--muted)]">Theme mode</p>
              <button
                className="mt-3 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm"
                onClick={() => updatePreferences({ darkMode: !sessionUser.preferences.darkMode })}
              >
                {sessionUser.preferences.darkMode ? "Switch to light" : "Switch to dark"}
              </button>
            </GlassCard>
            <GlassCard className="p-5">
              <p className="text-sm text-[var(--muted)]">Quiz preference</p>
              <select
                className="mt-3 w-full rounded-2xl border border-white/10 bg-white/6 px-4 py-3 outline-none"
                value={sessionUser.preferences.preferredCategory}
                onChange={(event) => updatePreferences({ preferredCategory: event.target.value })}
              >
                <option>All</option>
                <option>Development</option>
                <option>Product</option>
                <option>Analytics</option>
              </select>
            </GlassCard>
          </div>
        </GlassCard>

        <GlassCard className="space-y-5">
          <h2 className="text-2xl font-semibold">Change password</h2>
          <form className="space-y-4" onSubmit={submitPasswordChange}>
            <TextInput
              label="Current password"
              type="password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
            />
            <TextInput
              label="New password"
              type="password"
              value={nextPassword}
              onChange={(event) => setNextPassword(event.target.value)}
              required
            />
            {message ? <p className="text-sm text-[var(--muted)]">{message}</p> : null}
            <PrimaryButton type="submit">Update password</PrimaryButton>
          </form>
        </GlassCard>
      </section>

      <GlassCard className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Session controls</h2>
          <p className="text-[var(--muted)]">Logout clears the active session but preserves local quiz history.</p>
        </div>
        <button
          className="rounded-full border border-rose-400/30 bg-rose-400/10 px-5 py-2.5 text-sm font-semibold text-rose-100"
          onClick={logout}
        >
          Logout
        </button>
      </GlassCard>
    </div>
  );
}
