import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlassCard, PrimaryButton, TextInput } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export function SignupPage() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const result = register({ name, email, password });
    if (!result.ok) {
      setError(result.message ?? "Unable to create account.");
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="mx-auto grid min-h-[calc(100vh-89px)] max-w-6xl items-center gap-8 px-5 py-10 lg:grid-cols-2 lg:px-8">
      <GlassCard className="mx-auto max-w-xl">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Create account</p>
          <h1 className="text-3xl font-semibold">Start tracking your learning progress</h1>
          <p className="text-[var(--muted)]">This demo saves users and quiz history locally in your browser.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextInput label="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextInput
            label="Confirm password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          <PrimaryButton className="w-full justify-center" type="submit">
            Create account
          </PrimaryButton>
        </form>

        <p className="mt-6 text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Login here
          </Link>
        </p>
      </GlassCard>

      <img src="/auth-illustration.svg" alt="Signup illustration" className="mx-auto w-full max-w-xl" />
    </div>
  );
}
