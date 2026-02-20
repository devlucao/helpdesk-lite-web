type LoginResponse = { token: string };

export default async function login(email: string, password: string): Promise<string> {
  const baseUrl = import.meta.env.VITE_API_URL as string;

  const res = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = (await res.json()) as LoginResponse;

  if(!res.ok) {
    throw new Error("Invalid credentials");
  }

  return data.token;

}