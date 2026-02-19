import type { ReactNode } from "react"
import { clearToken, getToken, setToken } from "./tokenStorage";
import { useState } from "react";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
}

export default function AuthProvider ({ children }: AuthProviderProps) {
  const [token, setTokenState] = useState<string | null>(() => getToken());

  const isAuthenticated = Boolean(token);

  function login(newToken: string) {
    setToken(newToken);
    setTokenState(newToken);
  }

  function logout() {
    clearToken();
    setTokenState(null);
  }

  return (
    <AuthContext.Provider value={{token, isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
}
