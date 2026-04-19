import type { InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

export function GlassCard({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={clsx("glass-card", className)}>{children}</div>;
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx("primary-button", className)} {...props}>
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={clsx("secondary-button", className)} {...props}>
      {children}
    </button>
  );
}

export function TextInput({
  label,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
  return (
    <label className="space-y-2">
      <span className="text-sm font-medium text-[var(--muted)]">{label}</span>
      <input className="text-input" {...props} />
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}
    </label>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-300">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-[var(--muted)]">{body}</p>
    </div>
  );
}
