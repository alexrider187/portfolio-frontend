import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { type ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

export default function PrivateRoute({ children, adminOnly = false }: PrivateRouteProps) {
  const { isAuthenticated, role } = useAuth();

  // Not logged in → send to /home instead of /login
  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // Admin-only route check
  if (adminOnly && role !== "admin") {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
}
