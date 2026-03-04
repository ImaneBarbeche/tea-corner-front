import type { Route } from "./+types/EmailVerify";
import { CONFIG } from "../../config";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const token = new URL(request.url).searchParams.get("token");

  if (!token) {
    return { error: "Missing verification token." };
  }
  try {
    const res = await fetch(
      `${CONFIG.API_URL}/auth/verify-email?token=${token}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!res.ok) {
      const message = "something went wrong";
      return { error: message };
    }

    const data = await res.json();

    return {
      message: data.message,
    };
  } catch (err) {
    return { error: "Network error." };
  }
}

export default function EmailVerify({ loaderData }: Route.ComponentProps) {
  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }

  const message = loaderData.message;
  if (!message) {
    return <p>Something didn't go as planned</p>;
  }

  return <p>{message}</p>;
}
