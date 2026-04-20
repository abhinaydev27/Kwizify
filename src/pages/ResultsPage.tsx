import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Share2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { GlassCard, PrimaryButton, SecondaryButton } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export function ResultsPage() {
  const { attemptId } = useParams();
  const { attempts, quizzes, sessionUser } = useApp();
  const [shareMessage, setShareMessage] = useState("");
  const attempt = attempts.find((item) => item.id === attemptId && item.userId === sessionUser?.id);
  const quiz = quizzes.find((item) => item.id === attempt?.quizId);

  const chartData = useMemo(() => {
    if (!attempt) {
      return [];
    }
    return [
      { name: "Correct", value: attempt.correctCount, color: "#22d3ee" },
      { name: "Incorrect", value: attempt.totalQuestions - attempt.correctCount, color: "#fb7185" }
    ];
  }, [attempt]);

  if (!attempt || !quiz) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleShareResult() {
    const safeAttempt = attempt!;
    const safeQuiz = quiz!;
    const shareUrl = `${window.location.origin}${import.meta.env.BASE_URL}results/${safeAttempt.id}`;
    const shareText = `I scored ${safeAttempt.score}% on ${safeQuiz.title} in Kwizify.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${safeQuiz.title} result · Kwizify`,
          text: shareText,
          url: shareUrl
        });
        setShareMessage("Result shared.");
        return;
      }

      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setShareMessage("Result link copied.");
    } catch {
      setShareMessage("Share did not complete.");
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-5 py-8 lg:px-8">
      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="space-y-5">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Results</p>
          <h1 className="text-4xl font-semibold">{attempt.score}% overall score</h1>
          <p className="text-[var(--muted)]">
            You answered {attempt.correctCount} out of {attempt.totalQuestions} questions correctly in {quiz.title}.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <GlassCard className="p-5">
              <p className="text-sm text-[var(--muted)]">Correct answers</p>
              <p className="mt-3 text-3xl font-semibold">{attempt.correctCount}</p>
            </GlassCard>
            <GlassCard className="p-5">
              <p className="text-sm text-[var(--muted)]">Marked for review</p>
              <p className="mt-3 text-3xl font-semibold">
                {attempt.answers.filter((answer) => answer.markedForReview).length}
              </p>
            </GlassCard>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to={`/quiz/${quiz.id}`}>
              <PrimaryButton>Retake quiz</PrimaryButton>
            </Link>
            <SecondaryButton onClick={handleShareResult}>
              <Share2 className="h-4 w-4" />
              Share result
            </SecondaryButton>
          </div>
          {shareMessage ? <p className="text-sm text-emerald-300">{shareMessage}</p> : null}
        </GlassCard>

        <GlassCard className="space-y-4">
          <h2 className="text-xl font-semibold">Performance chart</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={70} outerRadius={105} paddingAngle={5} dataKey="value">
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {chartData.map((entry) => (
              <div key={entry.name} className="rounded-2xl border border-white/10 bg-white/6 p-4">
                <div className="mb-2 h-2 rounded-full" style={{ background: entry.color }} />
                <p className="font-semibold">{entry.name}</p>
                <p className="text-sm text-[var(--muted)]">{entry.value} questions</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </section>

      <GlassCard className="space-y-4">
        <h2 className="text-2xl font-semibold">Answer review</h2>
        <div className="space-y-4">
          {quiz.questions.map((question) => {
            const answer = attempt.answers.find((item) => item.questionId === question.id);
            const selectedIndex = answer?.selectedAnswer ?? null;
            return (
              <div key={question.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="font-semibold">{question.prompt}</p>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  Your answer: {selectedIndex !== null ? question.options[selectedIndex] : "Not answered"}
                </p>
                <p className="mt-2 text-sm text-emerald-300">Correct answer: {question.options[question.correctAnswer]}</p>
                <p className="mt-3 text-sm text-[var(--muted)]">{question.explanation}</p>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </div>
  );
}
