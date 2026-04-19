import { ArrowRight, Clock3, LayoutList, Trophy } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { GlassCard, PrimaryButton, SecondaryButton } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export function LandingPage() {
  const { quizzes, sessionUser } = useApp();

  if (sessionUser) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
      <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <GlassCard className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Kwizify</p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Start a quiz, track your score, and move on.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-[var(--muted)]">
              This version keeps the homepage simple. Login, use the demo account, or create a user and go straight to the dashboard.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/login">
              <PrimaryButton>
                Login
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            </Link>
            <Link to="/signup">
              <SecondaryButton>Create account</SecondaryButton>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
              <LayoutList className="mb-3 h-5 w-5 text-cyan-300" />
              <p className="font-semibold">{quizzes.length} ready quizzes</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Open the dashboard and start immediately.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
              <Clock3 className="mb-3 h-5 w-5 text-cyan-300" />
              <p className="font-semibold">Timed quiz flow</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Questions, progress bar, review flags, and results.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/6 p-5">
              <Trophy className="mb-3 h-5 w-5 text-cyan-300" />
              <p className="font-semibold">Stored history</p>
              <p className="mt-2 text-sm text-[var(--muted)]">Scores and settings stay in your browser.</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-5">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Demo Access</p>
            <h2 className="mt-2 text-2xl font-semibold">Use this account right away</h2>
          </div>

          <div className="space-y-3 rounded-3xl border border-white/10 bg-white/6 p-5">
            <div>
              <p className="text-sm text-[var(--muted)]">Email</p>
              <p className="font-semibold">demo@quizflow.app</p>
            </div>
            <div>
              <p className="text-sm text-[var(--muted)]">Password</p>
              <p className="font-semibold">Password123</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">Available Quizzes</p>
            <div className="space-y-3">
              {quizzes.map((quiz) => (
                <div key={quiz.id} className="rounded-3xl border border-white/10 bg-white/6 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-semibold">{quiz.title}</p>
                      <p className="text-sm text-[var(--muted)]">
                        {quiz.category} · {quiz.difficulty}
                      </p>
                    </div>
                    <p className="text-sm text-[var(--muted)]">{quiz.durationMinutes} min</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
