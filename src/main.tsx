import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import { AppProvider } from "@/context/AppContext";
import "@/styles/globals.css";

function BootScreen() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(70,168,255,0.12),_transparent_30%),var(--bg)] px-5 py-8 text-[var(--text)]">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 animate-pulse rounded-2xl bg-white/12" />
          <div className="space-y-2">
            <div className="h-4 w-28 animate-pulse rounded-full bg-white/12" />
            <div className="h-4 w-40 animate-pulse rounded-full bg-white/8" />
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass-card space-y-4">
            <div className="h-6 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="h-12 w-4/5 animate-pulse rounded-2xl bg-white/10" />
            <div className="h-5 w-3/4 animate-pulse rounded-full bg-white/8" />
            <div className="flex gap-3">
              <div className="h-12 w-28 animate-pulse rounded-full bg-white/12" />
              <div className="h-12 w-32 animate-pulse rounded-full bg-white/8" />
            </div>
          </div>
          <div className="glass-card space-y-4">
            <div className="h-6 w-32 animate-pulse rounded-full bg-white/10" />
            <div className="h-24 animate-pulse rounded-3xl bg-white/8" />
            <div className="h-20 animate-pulse rounded-3xl bg-white/8" />
          </div>
        </div>
      </div>
    </div>
  );
}

function AppBootstrap() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 120);
    return () => window.clearTimeout(id);
  }, []);

  if (!ready) {
    return <BootScreen />;
  }

  return (
    <BrowserRouter basename="/Kwizify">
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppBootstrap />
  </React.StrictMode>
);
