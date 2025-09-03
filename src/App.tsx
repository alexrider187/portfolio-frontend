import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { lazy, Suspense } from "react";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./hooks/useAuth";
import type { JSX } from "react";

// Lazy load pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Projects = lazy(() => import("./pages/Projects"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));

// Optional: fallback UI while page is loading
const LoadingFallback = () => <div className="loading">Loading...</div>;

export default function App(): JSX.Element {
  return <AnimatedRoutes />;
}

function AnimatedRoutes(): JSX.Element {
  const location = useLocation();
  const { isAuthenticated, role } = useAuth(); // role: 'admin' | 'client'

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          {/* Base path redirect */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={
              (() => {
                const searchParams = new URLSearchParams(location.search);
                const allowLogin = searchParams.get("allowLogin") === "true";

                // Redirect all logged-in users except admins with ?allowLogin=true
                if (isAuthenticated && !(role === "admin" && allowLogin)) {
                  return <Navigate to="/home" replace />;
                }
                return <Login />;
              })()
            }
          />

          {/* Home - accessible to all logged-in users */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          {/* Admin-only routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute adminOnly>
                {role === "admin" ? <Dashboard /> : <Navigate to="/home" replace />}
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute adminOnly>
                {role === "admin" ? <Projects /> : <Navigate to="/home" replace />}
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute adminOnly>
                {role === "admin" ? <Analytics /> : <Navigate to="/home" replace />}
              </PrivateRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
