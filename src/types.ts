export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Question = {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  image?: string;
};

export type Quiz = {
  id: string;
  title: string;
  category: string;
  difficulty: Difficulty;
  durationMinutes: number;
  icon: string;
  accent: string;
  description: string;
  questions: Question[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  preferences: {
    darkMode: boolean;
    preferredCategory: string;
  };
};

export type QuizAttempt = {
  id: string;
  quizId: string;
  userId: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  completedAt: string;
  answers: Array<{
    questionId: string;
    selectedAnswer: number | null;
    isCorrect: boolean;
    markedForReview: boolean;
  }>;
};

export type AppState = {
  users: User[];
  sessionUserId: string | null;
  attempts: QuizAttempt[];
};
