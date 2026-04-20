import { useMemo, useState } from "react";
import { BarChart3, Flame, PlusSquare, Search, Share2, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { GlassCard, PrimaryButton, SectionHeading } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export function DashboardPage() {
  const { sessionUser, quizzes, attempts, users } = useApp();
  const [query, setQuery] = useState("");
  const [shareMessage, setShareMessage] = useState("");

  const myAttempts = attempts.filter((attempt) => attempt.userId === sessionUser?.id);
  const filteredQuizzes = useMemo(
    () =>
      quizzes.filter((quiz) => {
        const haystack = `${quiz.title} ${quiz.category} ${quiz.difficulty}`.toLowerCase();
        return haystack.includes(query.toLowerCase());
      }),
    [query, quizzes]
  );

  const averageScore = myAttempts.length
    ? Math.round(myAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / myAttempts.length)
    : 0;

  const leaderboard = [...attempts]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((attempt) => {
      const user = users.find((item) => item.id === attempt.userId);
      return { attempt, userName: user?.name ?? "Learner" };
    });

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-5 py-8 lg:px-8">
      <section className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold">Welcome back, {sessionUser?.name}</h1>
              <p className="mt-3 max-w-2xl text-[var(--muted)]">
                Pick a category, stay on pace with timed quizzes, and keep your score trends moving upward.
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-xl font-semibold">
              {sessionUser?.avatar}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <GlassCard className="p-5">
              <p className="text-sm text-[var(--muted)]">Quizzes completed</p>
              <p className="mt-3 text-3xl font-semibold">{myAttempts.length}</p>
            </GlassCard>
            <GlassCard className="p-5">
              <p className="text-sm text-[var(--muted)]">Average score</p>
              <p className="mt-3 text-3xl font-semibold">{averageScore}%</p>
            </GlassCard>
            <GlassCard className="p-5">
              <p className="text-sm text-[var(--muted)]">Preferred category</p>
              <p className="mt-3 text-2xl font-semibold">{sessionUser?.preferences.preferredCategory ?? "All"}</p>
            </GlassCard>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-400/15 p-3 text-emerald-300">
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Daily momentum</p>
              <p className="text-sm text-[var(--muted)]">Complete one short quiz to keep your streak alive.</p>
            </div>
          </div>
          <img src={`${import.meta.env.BASE_URL}empty-state.svg`} alt="Progress illustration" className="w-full" />
        </GlassCard>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Quiz Library"
          title="Search categories and jump into a session"
          body="Starter and custom quizzes live in one library, so you can build your own topics and launch them immediately."
        />

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex min-w-[18rem] flex-1 items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
            <Search className="h-5 w-5 text-[var(--muted)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search quiz title, category, or difficulty"
              className="w-full bg-transparent outline-none placeholder:text-[var(--muted)]"
            />
          </label>
          <Link to="/create-quiz">
            <PrimaryButton>
              <PlusSquare className="h-4 w-4" />
              Create quiz
            </PrimaryButton>
          </Link>
        </div>

        {shareMessage ? <p className="text-sm text-emerald-300">{shareMessage}</p> : null}

        <div className="grid gap-5 lg:grid-cols-3">
          {filteredQuizzes.map((quiz) => (
            <GlassCard key={quiz.id} className="quiz-library-card space-y-5">
              <div className={`quiz-library-banner ${quiz.accent}`}>
                <p className="text-sm font-medium text-white/72">{quiz.category}</p>
                <h3 className="mt-2 text-2xl font-semibold">{quiz.title}</h3>
              </div>
              <p className="text-[var(--muted)]">{quiz.description}</p>
              <div className="flex items-center justify-between text-sm text-[var(--muted)]">
                <span>{quiz.difficulty}</span>
                <span>{quiz.durationMinutes} min</span>
              </div>
              <div className="flex gap-3">
                <Link to={`/quiz/${quiz.id}`} className="flex-1">
                  <PrimaryButton className="quiz-library-button w-full justify-center">Start quiz</PrimaryButton>
                </Link>
                <button
                  type="button"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[var(--muted)] transition hover:bg-white/10 hover:text-[var(--text)]"
                  aria-label={`Share ${quiz.title}`}
                  onClick={async () => {
                    const shareUrl = `${window.location.origin}${import.meta.env.BASE_URL}quiz/${quiz.id}`;
                    const shareData = {
                      title: `${quiz.title} · Kwizify`,
                      text: `Try this ${quiz.difficulty.toLowerCase()} ${quiz.category.toLowerCase()} quiz on Kwizify.`,
                      url: shareUrl
                    };

                    try {
                      if (navigator.share) {
                        await navigator.share(shareData);
                        setShareMessage(`Shared ${quiz.title}.`);
                      } else {
                        await navigator.clipboard.writeText(`${shareData.text} ${shareUrl}`);
                        setShareMessage(`Copied share link for ${quiz.title}.`);
                      }
                    } catch {
                      setShareMessage("Share did not complete.");
                    }
                  }}
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <GlassCard className="space-y-4">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-cyan-300" />
            <h2 className="text-xl font-semibold">Recent history</h2>
          </div>

          {myAttempts.length === 0 ? (
            <p className="text-[var(--muted)]">No quiz attempts yet. Start with a short quiz to populate your history.</p>
          ) : (
            <div className="space-y-3">
              {myAttempts.slice(0, 4).map((attempt) => {
                const quiz = quizzes.find((item) => item.id === attempt.quizId);
                return (
                  <Link
                    key={attempt.id}
                    to={`/results/${attempt.id}`}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/6 px-4 py-4 transition hover:bg-white/8"
                  >
                    <div>
                      <p className="font-semibold">{quiz?.title ?? "Quiz"}</p>
                      <p className="text-sm text-[var(--muted)]">
                        {new Date(attempt.completedAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-xl font-semibold">{attempt.score}%</p>
                  </Link>
                );
              })}
            </div>
          )}
        </GlassCard>

        <GlassCard className="space-y-4">
          <div className="flex items-center gap-3">
            <Trophy className="h-5 w-5 text-amber-300" />
            <h2 className="text-xl font-semibold">Leaderboard preview</h2>
          </div>
          <div className="space-y-3">
            {leaderboard.length === 0 ? (
              <p className="text-[var(--muted)]">Complete a quiz to populate the leaderboard.</p>
            ) : (
              leaderboard.map((entry, index) => (
                <div key={entry.attempt.id} className="flex items-center justify-between rounded-2xl bg-white/6 px-4 py-4">
                  <div>
                    <p className="font-semibold">
                      #{index + 1} {entry.userName}
                    </p>
                    <p className="text-sm text-[var(--muted)]">{entry.attempt.totalQuestions} questions answered</p>
                  </div>
                  <p className="text-lg font-semibold">{entry.attempt.score}%</p>
                </div>
              ))
            )}
          </div>
        </GlassCard>
      </section>
    </div>
  );
}
