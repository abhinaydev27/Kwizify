import { useState, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { GlassCard, PrimaryButton, SecondaryButton, TextInput } from "@/components/UI";
import { useApp } from "@/context/AppContext";
import type { Difficulty } from "@/types";

type DraftQuestion = {
  prompt: string;
  options: [string, string, string, string];
  correctAnswer: number;
  explanation: string;
};

const accentByCategory: Record<string, string> = {
  Development: "quiz-accent-development",
  Product: "quiz-accent-product",
  Analytics: "quiz-accent-analytics"
};

function makeDraftQuestion(): DraftQuestion {
  return {
    prompt: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: ""
  };
}

export function CreateQuizPage() {
  const navigate = useNavigate();
  const { createQuiz } = useApp();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Development");
  const [difficulty, setDifficulty] = useState<Difficulty>("Beginner");
  const [durationMinutes, setDurationMinutes] = useState("8");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<DraftQuestion[]>([makeDraftQuestion(), makeDraftQuestion(), makeDraftQuestion()]);
  const [error, setError] = useState("");

  function updateQuestion(index: number, updater: (current: DraftQuestion) => DraftQuestion) {
    setQuestions((current) => current.map((question, questionIndex) => (questionIndex === index ? updater(question) : question)));
  }

  function addQuestion() {
    setQuestions((current) => [...current, makeDraftQuestion()]);
  }

  function removeQuestion(index: number) {
    setQuestions((current) => (current.length <= 3 ? current : current.filter((_, questionIndex) => questionIndex !== index)));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const parsedDuration = Number(durationMinutes);

    if (!trimmedTitle || !trimmedDescription) {
      setError("Title and description are required.");
      return;
    }

    if (!Number.isFinite(parsedDuration) || parsedDuration < 3 || parsedDuration > 30) {
      setError("Duration must be between 3 and 30 minutes.");
      return;
    }

    for (const [index, question] of questions.entries()) {
      if (!question.prompt.trim() || !question.explanation.trim() || question.options.some((option) => !option.trim())) {
        setError(`Question ${index + 1} is incomplete.`);
        return;
      }
    }

    const quizId = createQuiz({
      title: trimmedTitle,
      category,
      difficulty,
      durationMinutes: parsedDuration,
      description: trimmedDescription,
      accent: accentByCategory[category] ?? "quiz-accent-development",
      questions: questions.map((question, index) => ({
        id: `custom-q-${index + 1}`,
        prompt: question.prompt.trim(),
        options: question.options.map((option) => option.trim()),
        correctAnswer: question.correctAnswer,
        explanation: question.explanation.trim()
      }))
    });

    navigate(`/quiz/${quizId}`);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-5 py-8 lg:px-8">
      <GlassCard className="space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">Create Quiz</p>
        <h1 className="text-4xl font-semibold">Build your own quiz library</h1>
        <p className="max-w-3xl text-[var(--muted)]">
          Add a title, choose a category, and write your own questions. Custom quizzes are saved on this device and show
          up beside the starter quizzes in the dashboard.
        </p>
      </GlassCard>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <GlassCard className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <TextInput label="Quiz title" value={title} onChange={(event) => setTitle(event.target.value)} />
            <label className="space-y-2">
              <span className="text-sm font-medium text-[var(--muted)]">Category</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="text-input"
              >
                <option>Development</option>
                <option>Product</option>
                <option>Analytics</option>
              </select>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-[var(--muted)]">Difficulty</span>
              <select
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value as Difficulty)}
                className="text-input"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>
            <TextInput
              label="Duration in minutes"
              type="number"
              min={3}
              max={30}
              value={durationMinutes}
              onChange={(event) => setDurationMinutes(event.target.value)}
            />
          </div>

          <label className="space-y-2">
            <span className="text-sm font-medium text-[var(--muted)]">Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="text-input min-h-28 resize-y"
              placeholder="Summarize what this quiz tests."
            />
          </label>
        </GlassCard>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <GlassCard key={index} className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl font-semibold">Question {index + 1}</h2>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  disabled={questions.length <= 3}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-[var(--muted)] transition hover:text-[var(--text)] disabled:opacity-40"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </div>

              <TextInput
                label="Prompt"
                value={question.prompt}
                onChange={(event) => updateQuestion(index, (current) => ({ ...current, prompt: event.target.value }))}
              />

              <div className="grid gap-4 md:grid-cols-2">
                {question.options.map((option, optionIndex) => (
                  <TextInput
                    key={optionIndex}
                    label={`Option ${optionIndex + 1}`}
                    value={option}
                    onChange={(event) =>
                      updateQuestion(index, (current) => {
                        const nextOptions = [...current.options] as DraftQuestion["options"];
                        nextOptions[optionIndex] = event.target.value;
                        return { ...current, options: nextOptions };
                      })
                    }
                  />
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-[0.32fr_0.68fr]">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-[var(--muted)]">Correct option</span>
                  <select
                    value={question.correctAnswer}
                    onChange={(event) =>
                      updateQuestion(index, (current) => ({
                        ...current,
                        correctAnswer: Number(event.target.value)
                      }))
                    }
                    className="text-input"
                  >
                    <option value={0}>Option 1</option>
                    <option value={1}>Option 2</option>
                    <option value={2}>Option 3</option>
                    <option value={3}>Option 4</option>
                  </select>
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-[var(--muted)]">Explanation</span>
                  <textarea
                    value={question.explanation}
                    onChange={(event) =>
                      updateQuestion(index, (current) => ({ ...current, explanation: event.target.value }))
                    }
                    className="text-input min-h-24 resize-y"
                    placeholder="Why is this answer correct?"
                  />
                </label>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <SecondaryButton type="button" onClick={addQuestion}>
            <Plus className="h-4 w-4" />
            Add question
          </SecondaryButton>
          <div className="flex items-center gap-3">
            {error ? <p className="text-sm text-rose-400">{error}</p> : null}
            <PrimaryButton type="submit">Save and open quiz</PrimaryButton>
          </div>
        </div>
      </form>
    </div>
  );
}
