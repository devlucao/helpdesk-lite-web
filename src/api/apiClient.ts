export async function apiGet(path: string, token: string | null) {
  const baseUrl = import.meta.env.VITE_API_URL as string;

  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const res = await fetch(`${baseUrl}${path}`, {
    method: "GET",
    headers,
  })

  const data = await res.json();

  if (!res.ok) {
    const message = data?.message || "Request failed."

    throw new Error(message);
  }

  return data;

}