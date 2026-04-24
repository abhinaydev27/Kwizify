import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { DashboardPage } from "@/pages/DashboardPage";
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
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <AppShell variant="auth">
            <LoginPage />
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
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppShell variant="app">
              <DashboardPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
