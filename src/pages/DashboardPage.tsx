import { useNavigate } from "react-router-dom";
import { GlassCard, PrimaryButton, SecondaryButton } from "@/components/UI";
import { useApp } from "@/context/AppContext";
import { STORAGE_KEY } from "@/lib/storage";

export function DashboardPage() {
  const navigate = useNavigate();
  const { sessionUser, users, logout } = useApp();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-5 py-8">
      <GlassCard>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Dashboard</p>
        <h1 className="mt-3 text-3xl font-semibold">Welcome, {sessionUser?.name}</h1>
        <p className="mt-3 text-[var(--muted)]">
          You are logged in. The app is saving all registered users inside browser localStorage.
        </p>

        <div className="mt-6 flex gap-3">
          <PrimaryButton onClick={handleLogout}>Logout</PrimaryButton>
          <SecondaryButton type="button" onClick={() => window.location.reload()}>
            Refresh page
          </SecondaryButton>
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="text-2xl font-semibold">Stored user data</h2>
        <p className="mt-2 text-[var(--muted)]">
          Storage key: <code>{STORAGE_KEY}</code>
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-sm text-[var(--muted)]">
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Email</th>
                <th className="px-3 py-3">Password</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5">
                  <td className="px-3 py-3">{user.name}</td>
                  <td className="px-3 py-3">{user.email}</td>
                  <td className="px-3 py-3">{user.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard>
        <h2 className="text-2xl font-semibold">Explain to teacher</h2>
        <div className="mt-4 space-y-2 text-[var(--muted)]">
          <p>1. Register form saves user details into localStorage.</p>
          <p>2. Login checks the saved email and password.</p>
          <p>3. Dashboard reads the stored users and shows them in a table.</p>
          <p>4. This is a frontend-only beginner project, not a real backend database.</p>
        </div>
      </GlassCard>
    </div>
  );
}
