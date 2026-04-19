import { useState } from "react";
import { Link } from "react-router-dom";
import { GlassCard, PrimaryButton, TextInput } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export function ForgotPasswordPage() {
  const { requestPasswordReset } = useApp();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const result = requestPasswordReset(email);
    if (!result.ok) {
      setError(result.message);
      setMessage("");
      return;
    }
    setMessage(result.message);
    setError("");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-89px)] max-w-3xl items-center px-5 py-10 lg:px-8">
      <GlassCard className="mx-auto w-full max-w-xl">
        <div className="mb-8 space-y-3">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Recovery</p>
          <h1 className="text-3xl font-semibold">Forgot your password?</h1>
          <p className="text-[var(--muted)]">For this demo, the flow is simulated so you can test the UI states quickly.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <TextInput label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
          {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
          <PrimaryButton className="w-full justify-center" type="submit">
            Send reset link
          </PrimaryButton>
        </form>

        <p className="mt-6 text-sm text-[var(--muted)]">
          Back to{" "}
          <Link to="/login" className="text-white hover:underline">
            login
          </Link>
        </p>
      </GlassCard>
    </div>
  );
}
