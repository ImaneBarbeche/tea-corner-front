import { redirect } from "react-router";
import { CONFIG } from "~/config";
// import { getCsrfToken } from "~/lib/csrf";

let accessToken: string | null = null;

export const setAccessToken = (t: string) => {
  accessToken = t;
};
export const clearAccessToken = () => {
  accessToken = null;
};

export async function refreshAccessToken(): Promise<boolean> {
  const res = await fetch(`${CONFIG.API_URL}/auth/refresh-tokens`, {
    method: "POST",
    // headers: { "X-CSRF-Token": getCsrfToken() ?? "" },
    credentials: "include",
  });
  if (!res.ok) return false;
  const { access_token } = await res.json();
  accessToken = access_token;
  return true;
}

export async function apiFetch(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { ...options.headers, Authorization: `Bearer ${accessToken}` },
    credentials: "include",
  });

  if (res.status === 401) {
    const ok = await refreshAccessToken();
    if (!ok) {
      clearAccessToken();
      //   window.location.href = "/signin";
      redirect("/signin");
      return res;
    }
    // rejoue la requête avec le nouveau token
    return fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${accessToken}` },
      credentials: "include",
    });
  }

  return res;
}
