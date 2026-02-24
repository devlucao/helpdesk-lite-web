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

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = data?.message || res.status === 404 ? "Not Found" : "Request failed.";

    const err: any = new Error(message);
    err.status = res.status;
    err.data = data;
    
    throw err;
  }

  return data;
}