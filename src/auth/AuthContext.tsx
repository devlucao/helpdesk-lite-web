import { createContext } from "react";
import type { JwtPayload } from "./jwt";

export type AuthContextValue = {
  token: string | null,
  user: JwtPayload | null,
  isAuthenticated: boolean,
  login: (token: string) => void,
  logout: () => void
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
