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

// Fallback UI while lazy pages load
const LoadingFallback = () => <div className="loading">Loading...</div>;

export default function App(): JSX.Element {
  return <AnimatedRoutes />;
}

function AnimatedRoutes(): JSX.Element {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          {/* Base path redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Login - only accessible with ?allowLogin=true */}
          <Route
            path="/login"
            element={
              (() => {
                const searchParams = new URLSearchParams(location.search);
                const allowLogin = searchParams.get("allowLogin") === "true";

                // Already logged in → redirect to /home
                if (isAuthenticated) return <Navigate to="/home" replace />;

                // Only allow login if ?allowLogin=true
                if (allowLogin) return <Login />;

                // Everyone else → redirect to /home
                return <Navigate to="/home" replace />;
              })()
            }
          />

          {/* Home - public */}
          <Route path="/home" element={<Home />} />

          {/* Admin-only routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute adminOnly>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute adminOnly>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoute adminOnly>
                <Analytics />
              </PrivateRoute>
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
