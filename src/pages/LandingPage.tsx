import { motion } from "framer-motion";
import { ArrowRight, ChartColumn, Clock3, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { GlassCard, PrimaryButton, SectionHeading, SecondaryButton } from "@/components/UI";

const features = [
  {
    title: "Smart quiz experiences",
    description: "Timed flows, progress tracking, answer review, and clean interaction patterns.",
    icon: Clock3
  },
  {
    title: "Insights that feel useful",
    description: "Visual score summaries and recent attempt history designed like a real product dashboard.",
    icon: ChartColumn
  },
  {
    title: "Secure-feeling auth UX",
    description: "Login, signup, forgot password, validation states, and reusable forms.",
    icon: ShieldCheck
  }
];

const stats = [
  { label: "Completion uplift", value: "38%" },
  { label: "Categories ready", value: "12+" },
  { label: "Average rating", value: "4.9/5" }
];

export function LandingPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-16">
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
              <Sparkles className="h-4 w-4" />
              Premium quiz product starter
            </div>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
                Build skills and track results in a quiz app that looks launch-ready.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
                QuizFlow Pro blends a polished learning interface with practical features: auth, category discovery,
                timed quizzes, result analytics, and profile controls.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link to="/signup">
                <PrimaryButton>
                  Start exploring
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              </Link>
              <Link to="/login">
                <SecondaryButton>Use demo account</SecondaryButton>
              </Link>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <GlassCard key={stat.label} className="space-y-2">
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="text-sm text-[var(--muted)]">{stat.label}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        <GlassCard className="relative overflow-hidden p-0">
          <img src="/hero-illustration.svg" alt="Quiz dashboard preview" className="w-full" />
        </GlassCard>
      </section>

      <section className="space-y-8 py-20">
        <SectionHeading
          eyebrow="Features"
          title="Made to feel like an actual SaaS product"
          body="The interface focuses on clear hierarchy, smooth gradients, useful cards, and responsive layouts instead of generic classroom-project styling."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <GlassCard key={feature.title} className="space-y-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Icon className="h-6 w-6 text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-[15px] leading-7 text-[var(--muted)]">{feature.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 py-6 lg:grid-cols-3">
        {[
          ["1", "Create your account", "Register in seconds and land directly on a dashboard with starter quizzes."],
          ["2", "Take guided quizzes", "Answer questions with a timer, mark items for review, and move across steps."],
          ["3", "Track performance", "See scores, completion history, strengths, and your saved preferences in one place."]
        ].map(([step, title, description]) => (
          <GlassCard key={title} className="space-y-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 font-semibold text-white">
              {step}
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-[var(--muted)]">{description}</p>
          </GlassCard>
        ))}
      </section>

      <section className="py-20">
        <GlassCard className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="Social Proof"
            title="Teams use clean quiz products because presentation affects trust."
            body="A credible learning experience needs strong visual rhythm, clear states, and dashboards that make data feel understandable."
          />
          <div className="grid gap-4">
            {[
              {
                name: "Nina Patel",
                role: "Product Designer",
                quote: "This feels closer to an edtech startup dashboard than a student project."
              },
              {
                name: "Leo Morgan",
                role: "Frontend Lead",
                quote: "The quiz flow and score summary already read like something ready for a portfolio demo."
              }
            ].map((item) => (
              <div key={item.name} className="rounded-3xl border border-white/10 bg-white/6 p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 font-semibold text-white">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-[var(--muted)]">{item.role}</p>
                  </div>
                </div>
                <p className="text-[var(--muted)]">{item.quote}</p>
              </div>
            ))}
            <div className="grid gap-4 sm:grid-cols-2">
              <GlassCard className="flex items-center gap-3">
                <Users className="h-5 w-5 text-cyan-300" />
                <div>
                  <p className="font-semibold">12k+ learners</p>
                  <p className="text-sm text-[var(--muted)]">Exploring categories weekly</p>
                </div>
              </GlassCard>
              <GlassCard className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-cyan-300" />
                <div>
                  <p className="font-semibold">Responsive by default</p>
                  <p className="text-sm text-[var(--muted)]">Built for desktop and mobile</p>
                </div>
              </GlassCard>
            </div>
          </div>
        </GlassCard>
      </section>

      <footer className="border-t border-white/10 py-10 text-sm text-[var(--muted)]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>QuizFlow Pro. Demo account: `demo@quizflow.app` / `Password123`</p>
          <p>Designed for portfolio-ready presentation and quick local testing.</p>
        </div>
      </footer>
    </div>
  );
}
