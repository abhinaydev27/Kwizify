import React from "react";

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Kwizify runtime error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[var(--bg)] px-5 py-8 text-[var(--text)]">
          <div className="mx-auto max-w-xl rounded-[28px] border border-white/10 bg-white/6 p-8 text-center shadow-[0_24px_80px_rgba(2,8,23,0.22)]">
            <h1 className="text-3xl font-semibold">Something went wrong</h1>
            <p className="mt-3 text-[var(--muted)]">
              Kwizify hit an unexpected error. Reload the app to continue.
            </p>
            <button
              className="mt-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-5 py-3 font-semibold text-white"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
