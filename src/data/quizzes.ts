import type { Quiz } from "@/types";

export const quizzes: Quiz[] = [
  {
    id: "frontend-foundations",
    title: "Frontend Foundations",
    category: "Development",
    difficulty: "Beginner",
    durationMinutes: 8,
    icon: "Code2",
    accent: "from-cyan-400 to-blue-500",
    description: "Brush up on HTML, CSS, and responsive design fundamentals.",
    questions: [
      {
        id: "ff-1",
        prompt: "Which CSS property is most appropriate for creating a flexible layout that aligns items in a row?",
        options: ["grid-template-columns", "position", "display: flex", "float"],
        correctAnswer: 2,
        explanation: "Flexbox is designed for one-dimensional layouts and alignment.",
        image: "/question-ui.svg"
      },
      {
        id: "ff-2",
        prompt: "What does semantic HTML improve the most?",
        options: ["Animation speed", "Accessibility and structure", "Image compression", "Browser caching"],
        correctAnswer: 1,
        explanation: "Semantic tags provide meaning for assistive tech and better structure."
      },
      {
        id: "ff-3",
        prompt: "Which viewport meta setting is critical for mobile responsiveness?",
        options: ["initial-scale=1", "cache-control=no-cache", "theme-color", "charset=utf-8"],
        correctAnswer: 0,
        explanation: "The viewport meta tag with initial-scale ensures proper device scaling."
      }
    ]
  },
  {
    id: "product-thinking",
    title: "Product Thinking Sprint",
    category: "Product",
    difficulty: "Intermediate",
    durationMinutes: 10,
    icon: "Sparkles",
    accent: "from-fuchsia-500 to-rose-500",
    description: "Validate how well you understand prioritization and customer value.",
    questions: [
      {
        id: "pt-1",
        prompt: "A feature request is loud but requested by only 2% of active users. What should be checked first?",
        options: ["Color palette options", "Strategic impact and segment value", "Server vendor", "Team birthdays"],
        correctAnswer: 1,
        explanation: "Prioritization should start with impact and who benefits."
      },
      {
        id: "pt-2",
        prompt: "Which metric best reflects product adoption after launch?",
        options: ["Daily active usage of the feature", "Logo redesign feedback", "Office attendance", "Slack emoji count"],
        correctAnswer: 0,
        explanation: "Feature usage over time is a strong adoption indicator."
      },
      {
        id: "pt-3",
        prompt: "A polished onboarding flow usually aims to reduce what?",
        options: ["Storage space", "Time to first value", "Screen brightness", "Compiler warnings"],
        correctAnswer: 1,
        explanation: "Good onboarding gets users to value quickly."
      }
    ]
  },
  {
    id: "data-essentials",
    title: "Data Essentials",
    category: "Analytics",
    difficulty: "Advanced",
    durationMinutes: 12,
    icon: "BarChart3",
    accent: "from-amber-400 to-orange-500",
    description: "Interpret charts, trends, and performance metrics with confidence.",
    questions: [
      {
        id: "de-1",
        prompt: "Which chart is usually best for showing a trend over time?",
        options: ["Pie chart", "Line chart", "Scatter plot", "Radar chart"],
        correctAnswer: 1,
        explanation: "Line charts are ideal for time-series changes."
      },
      {
        id: "de-2",
        prompt: "What is the main purpose of a benchmark in a dashboard?",
        options: ["To decorate empty space", "To compare performance against a target", "To rename datasets", "To reduce bundle size"],
        correctAnswer: 1,
        explanation: "Benchmarks make interpretation meaningful by adding context."
      },
      {
        id: "de-3",
        prompt: "If conversion rises but traffic falls sharply, what should you do next?",
        options: ["Ignore it", "Inspect both absolute numbers and funnel segments", "Delete historical data", "Change the logo"],
        correctAnswer: 1,
        explanation: "Percentages alone can mislead without absolute context."
      }
    ]
  }
];
