import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard, PrimaryButton, SecondaryButton, TextInput } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export function LoginPage() {
  const { login, register } = useApp();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setMessage("Email and password are required.");
      return;
    }

    if (mode === "register") {
      if (!name.trim()) {
        setMessage("Name is required.");
        return;
      }

      const result = register({
        name: name.trim(),
        email: email.trim(),
        password: password.trim()
      });

      if (!result.ok) {
        setMessage(result.message ?? "Could not create account.");
        return;
      }

      navigate("/dashboard");
      return;
    }

    const result = login(email.trim(), password.trim());
    if (!result.ok) {
      setMessage(result.message ?? "Could not login.");
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-3xl items-center px-5 py-10">
      <GlassCard className="w-full">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Simple Login App</p>
          <h1 className="text-3xl font-semibold">{mode === "login" ? "Login" : "Create account"}</h1>
          <p className="text-[var(--muted)]">
            This project stores user data in localStorage, so it works like a simple browser database.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <SecondaryButton type="button" className="justify-center" onClick={() => setMode("login")}>
            Login mode
          </SecondaryButton>
          <SecondaryButton type="button" className="justify-center" onClick={() => setMode("register")}>
            Register mode
          </SecondaryButton>
        </div>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {mode === "register" ? (
            <TextInput label="Name" value={name} onChange={(event) => setName(event.target.value)} />
          ) : null}
          <TextInput label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {message ? <p className="text-sm text-rose-400">{message}</p> : null}

          <PrimaryButton className="w-full justify-center" type="submit">
            {mode === "login" ? "Login" : "Create account"}
          </PrimaryButton>
        </form>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-[var(--muted)]">
          <p>How it works:</p>
          <p>1. Register a user.</p>
          <p>2. Data is saved in browser localStorage.</p>
          <p>3. Login checks email and password from that saved data.</p>
        </div>
      </GlassCard>
    </div>
  );
}
