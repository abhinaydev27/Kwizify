import { useEffect, useMemo, useState } from "react";
import { Flag, MoveLeft, MoveRight } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { GlassCard, PrimaryButton, SecondaryButton } from "@/components/UI";
import { useApp } from "@/context/AppContext";

export function QuizPage() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { quizzes, saveAttempt } = useApp();
  const quiz = quizzes.find((item) => item.id === quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number | null>>({});
  const [reviewFlags, setReviewFlags] = useState<Record<string, boolean>>({});
  const [secondsRemaining, setSecondsRemaining] = useState((quiz?.durationMinutes ?? 1) * 60);

  useEffect(() => {
    if (!quiz) {
      return;
    }
    const interval = window.setInterval(() => {
      setSecondsRemaining((current) => {
        if (current <= 1) {
          window.clearInterval(interval);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [quiz]);

  const progress = useMemo(() => {
    if (!quiz) {
      return 0;
    }
    return ((currentIndex + 1) / quiz.questions.length) * 100;
  }, [currentIndex, quiz]);

  if (!quiz) {
    return <Navigate to="/dashboard" replace />;
  }

  const activeQuiz = quiz;
  const currentQuestion = activeQuiz.questions[currentIndex];

  if (!currentQuestion) {
    return <Navigate to="/dashboard" replace />;
  }

  function submitQuiz() {
    const answers = activeQuiz.questions.map((question) => {
      const selectedAnswer = selectedAnswers[question.id] ?? null;
      return {
        questionId: question.id,
        selectedAnswer,
        isCorrect: selectedAnswer === question.correctAnswer,
        markedForReview: reviewFlags[question.id] ?? false
      };
    });
    const correctCount = answers.filter((answer) => answer.isCorrect).length;
    const score = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const attemptId = saveAttempt({
      quizId: activeQuiz.id,
      score,
      correctCount,
      totalQuestions: activeQuiz.questions.length,
      answers
    });

    navigate(`/results/${attemptId}`);
  }

  useEffect(() => {
    if (secondsRemaining === 0) {
      submitQuiz();
    }
  }, [secondsRemaining]);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-5 py-8 lg:px-8">
      <GlassCard className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">{activeQuiz.category}</p>
            <h1 className="mt-2 text-3xl font-semibold">{activeQuiz.title}</h1>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-3 text-sm">
            Time left: <span className="font-semibold">{formatSeconds(secondsRemaining)}</span>
          </div>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </GlassCard>

      <GlassCard className="space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--muted)]">
            Question {currentIndex + 1} of {activeQuiz.questions.length}
          </p>
          <button
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--muted)] hover:text-white"
            onClick={() =>
              setReviewFlags((current) => ({
                ...current,
                [currentQuestion.id]: !current[currentQuestion.id]
              }))
            }
          >
            <Flag className="h-4 w-4" />
            {reviewFlags[currentQuestion.id] ? "Marked" : "Mark for review"}
          </button>
        </div>

        {currentQuestion.image ? (
          <img src={currentQuestion.image} alt="Question figure" className="w-full rounded-3xl border border-white/10" />
        ) : null}

        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{currentQuestion.prompt}</h2>
          <div className="grid gap-3">
            {currentQuestion.options.map((option, optionIndex) => {
              const isActive = selectedAnswers[currentQuestion.id] === optionIndex;
              return (
                <button
                  key={option}
                  className={`quiz-option rounded-2xl border px-4 py-4 text-left transition ${
                    isActive
                      ? "quiz-option-active"
                      : "border-white/10 bg-white/5 text-[var(--muted)] hover:bg-white/8 hover:text-[var(--text)]"
                  }`}
                  onClick={() =>
                    setSelectedAnswers((current) => ({
                      ...current,
                      [currentQuestion.id]: optionIndex
                    }))
                  }
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <SecondaryButton onClick={() => setCurrentIndex((value) => Math.max(0, value - 1))} disabled={currentIndex === 0}>
            <MoveLeft className="h-4 w-4" />
            Previous
          </SecondaryButton>
          <div className="flex gap-3">
            {currentIndex < activeQuiz.questions.length - 1 ? (
              <PrimaryButton
                onClick={() => setCurrentIndex((value) => Math.min(activeQuiz.questions.length - 1, value + 1))}
              >
                Next
                <MoveRight className="h-4 w-4" />
              </PrimaryButton>
            ) : (
              <PrimaryButton onClick={submitQuiz}>Submit quiz</PrimaryButton>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
