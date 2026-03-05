const baseUrl = import.meta.env.VITE_API_URL as string;

type ApiError = Error & { status?: number; data?: any };

async function apiRequest(method: "GET" | "PATCH", path: string, token: string | null, body?: any) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message = 
    data?.message || 
    data?.error ||
    (res.status === 400 ? "Bad Request (400)" :
    res.status === 401 ? "Unauthorized (401)" :
    res.status === 403 ? "Forbidden (403)" :
    res.status === 404 ? "Not Found (404)" :
    `Request failed (${res.status})`);

    const err: ApiError = new Error(message);

    err.status = res.status;
    err.data = data;
    
    throw err;
  }

  return data;
}

export function apiGet(path: string, token: string | null) {
  return apiRequest("GET", path, token);
}

export function apiPatch(path: string, token: string | null, body: any) {
  return apiRequest("PATCH", path, token, body);
}