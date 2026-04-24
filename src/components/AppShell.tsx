import { Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";

type Variant = "auth" | "app";

export function AppShell({
  children,
  variant
}: {
  children: React.ReactNode;
  variant: Variant;
}) {
  const { sessionUser } = useApp();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <header className="border-b border-white/10 bg-[color:var(--panel-strong)]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to={sessionUser ? "/dashboard" : "/login"}>
            <div>
              <p className="text-lg font-semibold">Simple Login Storage App</p>
              <p className="text-sm text-[var(--muted)]">
                {variant === "auth" ? "Register and login" : "Saved user data view"}
              </p>
            </div>
          </Link>

          {sessionUser ? <p className="text-sm text-[var(--muted)]">Logged in as {sessionUser.email}</p> : null}
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
