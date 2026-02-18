import { Navigate } from "react-router-dom";
import { getToken } from "../auth/tokenStorage";
import type React from "react";

type AuthGuardProps = {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />
  }
  return (
    <>{children}</>
  )

}