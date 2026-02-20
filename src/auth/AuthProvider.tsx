import type { ReactNode } from "react"
import { clearToken, getToken, setToken } from "./tokenStorage";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { getUserFromToken, type JwtPayload } from "./jwt";

type AuthProviderProps = {
  children: ReactNode;
}

export default function AuthProvider ({ children }: AuthProviderProps) {
  const storedToken = getToken();
  const [token, setTokenState] = useState<string | null>(() => storedToken);
  const [user, setUser] = useState<JwtPayload | null>(storedToken ? getUserFromToken(storedToken) : null);

  const isAuthenticated = Boolean(token);

  function login(newToken: string) {
    setToken(newToken);
    setTokenState(newToken);
    setUser(getUserFromToken(newToken))
  }

  function logout() {
    clearToken();
    setTokenState(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{token, user, isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
