import { jwtDecode } from "jwt-decode";

export type Role = "client" | "agent" | "admin";

export type JwtPayload = {
  userId: string;
  role: Role;
};

export function getUserFromToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}