import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "./store/authStore";
import { useSettings } from "./Settings/hooks/useSettings";
import { useThemeStore } from "./store/themeStore";
import { ToastProvider } from "./components/ui/Toast";
import { ConfirmDialog } from "./components/ui/ConfirmDialog";
import Layout from "./components/Layout";
import LoginPage from "./Auth/pages/Login";
import OverviewPage from "./Overview/pages/Overview";
import ProjectsPage from "./Projects/pages/Projects";
import AddProjectPage from "./Projects/pages/AddProject";
import SettingsPage from "./Settings/pages/Settings";
import ProfilePage from "./Profile/pages/ProfilePage";
import PortfolioPage from "./Portfolio/pages/Portfolio";
import AllProjectsPage from "./Projects/pages/AllProjects";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 5,
      retry: 1,
      refetchOnWindowFocus: true,
    },
  },
});

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

interface DashboardRouteProps {
  element: React.ReactNode;
}

function DashboardRoute({ element }: DashboardRouteProps) {
  return (
    <ProtectedRoute>
      <Layout>{element}</Layout>
    </ProtectedRoute>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/all-projects" element={<AllProjectsPage />} />

      {/* Dashboard */}
      <Route path="/" element={<DashboardRoute element={<OverviewPage />} />} />
      <Route
        path="/overview"
        element={<DashboardRoute element={<OverviewPage />} />}
      />
      <Route
        path="/projects"
        element={<DashboardRoute element={<ProjectsPage />} />}
      />
      <Route
        path="/projects/new"
        element={<DashboardRoute element={<AddProjectPage />} />}
      />
      <Route
        path="/projects/:id/edit"
        element={<DashboardRoute element={<AddProjectPage />} />}
      />
      <Route
        path="/settings"
        element={<DashboardRoute element={<SettingsPage />} />}
      />
      <Route
        path="/profile"
        element={<DashboardRoute element={<ProfilePage />} />}
      />

      <Route path="*" element={<Navigate to="/overview" replace />} />
    </Routes>
  );
}

function ThemeSync() {
  const { data: settings } = useSettings();
  const syncSettings = useThemeStore((s) => s.syncSettings);

  useEffect(() => {
    if (settings) syncSettings(settings);
  }, [settings, syncSettings]);

  return null;
}

import { useCheckAuth } from "./Auth/hooks/useCheckAuth";

function AuthSync() {
  useCheckAuth();
  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthSync />
        <ThemeSync />
        <ToastProvider>
          <AppRoutes />
          <ConfirmDialog />
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
