import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import LoadingSpinner from "../components/ui/loading-spinner/LoadingSpinner";

// #region Lazy Pages
const DashboardPage = lazy(() => import("../pages/DashboardPage"));
const TeamPage = lazy(() => import("../pages/TeamPage"));
const CalendarPage = lazy(() => import("../pages/CalendarPage"));
const BlocksPage = lazy(() => import("../pages/BlocksPage"));
const DocumentsPage = lazy(() => import("../pages/DocumentsPage"));
const AnalyticsPage = lazy(() => import("../pages/AnalyticsPage"));
const LogsPage = lazy(() => import("../pages/LogsPage"));
const SettingsPage = lazy(() => import("../pages/SettingsPage"));
const ErrorPage = lazy(() => import("../pages/ErrorPage/ErrorPage"));
// #endregion Lazy Pages

const withSuspense = (Component: React.LazyExoticComponent<React.FC>) => (
  <Suspense fallback={<LoadingSpinner />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: withSuspense(DashboardPage) },
      { path: "team", element: withSuspense(TeamPage) },
      { path: "calendar", element: withSuspense(CalendarPage) },
      { path: "blocks", element: withSuspense(BlocksPage) },
      { path: "documents", element: withSuspense(DocumentsPage) },
      { path: "analytics", element: withSuspense(AnalyticsPage) },
      { path: "logs", element: withSuspense(LogsPage) },
      { path: "settings", element: withSuspense(SettingsPage) },
      { path: "*", element: withSuspense(ErrorPage) },
    ],
  },
]);
