let csrfToken: string | null = null;

export async function fetchCsrfToken(): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/auth/csrf-token`, {
    credentials: "include",
  });
  const data = await response.json();
  csrfToken = data.csrfToken;
}

export function getCsrfToken(): string | null {
  return csrfToken;
}