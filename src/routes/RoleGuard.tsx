import type { ReactNode } from "react";
import useAuth from "../auth/useAuth";

type Role = "client" | "agent" | "admin";

type RoleGuardProps = {
  allowedRoles: Role[];
  children: ReactNode;
}

export default function RoleGuard ({ allowedRoles, children }: RoleGuardProps) {
  const { user } = useAuth();
  const role = user?.role;

  if(!role || !allowedRoles.includes(role)) {
    return <h1>403 - NÃO AUTORIZADO</h1>
  } 

  return <>{children}</>
  
}