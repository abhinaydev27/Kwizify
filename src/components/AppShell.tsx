import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { GraduationCap, LayoutDashboard, LogOut, Menu, UserCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { useApp } from "@/context/AppContext";

type Variant = "marketing" | "auth" | "app";

export function AppShell({
  children,
  variant
}: {
  children: React.ReactNode;
  variant: Variant;
}) {
  const location = useLocation();
  const { sessionUser, logout } = useApp();
  const [open, setOpen] = useState(false);

  const navLinks = useMemo(
    () =>
      variant === "app"
        ? [
            { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
            { to: "/profile", label: "Profile", icon: UserCircle2 }
          ]
        : [
            { to: "/", label: "Home" },
            { to: "/login", label: "Login" },
            { to: "/signup", label: "Sign up" }
          ],
    [variant]
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(70,168,255,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,95,140,0.18),_transparent_30%),var(--bg)] text-[var(--text)] transition-colors duration-300">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[color:var(--panel-strong)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <Link to={sessionUser ? "/dashboard" : "/"} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/25">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--muted)]">QuizFlow Pro</p>
              <p className="text-base font-semibold">Modern quiz platform</p>
            </div>
          </Link>

          <button
            className="inline-flex rounded-full border border-white/10 p-3 text-[var(--text)] lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav className="hidden items-center gap-3 lg:flex">
            {navLinks.map((link) => {
              const Icon = "icon" in link ? link.icon : null;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    clsx(
                      "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                      isActive
                        ? "bg-white/12 text-white"
                        : "text-[var(--muted)] hover:bg-white/8 hover:text-white"
                    )
                  }
                >
                  {Icon ? <Icon className="h-4 w-4" /> : null}
                  {link.label}
                </NavLink>
              );
            })}
            {variant === "app" && sessionUser ? (
              <div className="ml-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                  {sessionUser.avatar}
                </div>
                <button
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:scale-[1.02]"
                  onClick={() => logout()}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to={sessionUser ? "/dashboard" : "/signup"}
                className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:scale-[1.02]"
              >
                {sessionUser ? "Open app" : "Start free"}
              </Link>
            )}
          </nav>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/10 lg:hidden"
            >
              <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      "rounded-2xl px-4 py-3 text-sm",
                      location.pathname === link.to ? "bg-white/10 text-white" : "text-[var(--muted)]"
                    )}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>{children}</main>
    </div>
  );
}
