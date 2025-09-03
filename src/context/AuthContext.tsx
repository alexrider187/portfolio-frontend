import { createContext } from "react";

export interface AuthContextType {
  token: string | null;
  role: string | null; // ✅ added role
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
