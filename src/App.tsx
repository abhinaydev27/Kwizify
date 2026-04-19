import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { LandingPage } from "@/pages/LandingPage";
import { LoginPage } from "@/pages/LoginPage";
import { SignupPage } from "@/pages/SignupPage";
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { QuizPage } from "@/pages/QuizPage";
import { ResultsPage } from "@/pages/ResultsPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { AppShell } from "@/components/AppShell";
import { useApp } from "@/context/AppContext";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { sessionUser } = useApp();
  const location = useLocation();

  if (!sessionUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <AppShell variant="marketing">
              <LandingPage />
            </AppShell>
          }
        />
        <Route
          path="/login"
          element={
            <AppShell variant="auth">
              <LoginPage />
            </AppShell>
          }
        />
        <Route
          path="/signup"
          element={
            <AppShell variant="auth">
              <SignupPage />
            </AppShell>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AppShell variant="auth">
              <ForgotPasswordPage />
            </AppShell>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppShell variant="app">
                <DashboardPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz/:quizId"
          element={
            <ProtectedRoute>
              <AppShell variant="app">
                <QuizPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/results/:attemptId"
          element={
            <ProtectedRoute>
              <AppShell variant="app">
                <ResultsPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AppShell variant="app">
                <ProfilePage />
              </AppShell>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}
