import { Navigate } from "react-router-dom";
import type React from "react";
import useAuth from "../auth/useAuth";

type AuthGuardProps = {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return (
    <>{children}</>
  )

}