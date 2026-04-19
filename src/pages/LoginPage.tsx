import { useState } from "react";
import { Github, Mail } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlassCard, PrimaryButton, SecondaryButton, TextInput } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export function LoginPage() {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("demo@quizflow.app");
  const [password, setPassword] = useState("Password123");
  const [error, setError] = useState("");

  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = login(email, password);
    if (!result.ok) {
      setError(result.message ?? "Unable to login.");
      return;
    }
    navigate(from);
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-89px)] max-w-6xl items-center gap-8 px-5 py-10 lg:grid-cols-2 lg:px-8">
      <div className="order-2 lg:order-1">
        <GlassCard className="mx-auto max-w-xl">
          <div className="mb-8 space-y-3">
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Welcome back</p>
            <h1 className="text-3xl font-semibold">Login to continue your quiz journey</h1>
            <p className="text-[var(--muted)]">Use the included demo account or create your own account in seconds.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <TextInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error ? <p className="text-sm text-rose-400">{error}</p> : null}
            <PrimaryButton className="w-full justify-center" type="submit">
              Login
            </PrimaryButton>
          </form>

          <div className="my-6 grid gap-3 sm:grid-cols-2">
            <SecondaryButton className="justify-center">
              <Mail className="h-4 w-4" />
              Google
            </SecondaryButton>
            <SecondaryButton className="justify-center">
              <Github className="h-4 w-4" />
              GitHub
            </SecondaryButton>
          </div>

          <div className="flex items-center justify-between text-sm text-[var(--muted)]">
            <Link to="/forgot-password" className="hover:text-white">
              Forgot password?
            </Link>
            <Link to="/signup" className="hover:text-white">
              Create account
            </Link>
          </div>
        </GlassCard>
      </div>

      <div className="order-1 lg:order-2">
        <img
          src={`${import.meta.env.BASE_URL}auth-illustration.svg`}
          alt="Authentication illustration"
          className="mx-auto w-full max-w-xl"
        />
      </div>
    </div>
  );
}
