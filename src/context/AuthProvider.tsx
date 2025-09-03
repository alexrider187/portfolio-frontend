import { type ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import api from "../api/axios";
import { AuthContext } from "./AuthContext";

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  exp: number;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("adminToken");
  const [token, setToken] = useState<string | null>(storedToken);
  const [role, setRole] = useState<string | null>(() => {
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        return decoded.role || null;
      } catch {
        return null;
      }
    }
    return null;
  });

  const isAuthenticated = !!token && role === "admin";

  const login = async (email: string, password: string) => {
    const res = await api.post("/users/login", { email, password });

    const newToken = res.data.token;
    setToken(newToken);
    localStorage.setItem("adminToken", newToken);

    try {
      const decoded = jwtDecode<DecodedToken>(newToken);
      setRole(decoded.role || null);
    } catch {
      setRole(null);
    }

    navigate("/dashboard");
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
