import type { Route } from "./+types/EmailVerify";
import { CONFIG } from "../../config";
import { redirect } from "react-router";

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

    return redirect("/signin?verified=true")
    
  } catch (err) {
    return { error: "Network error." };
  }
}

export default function EmailVerify({ loaderData }: Route.ComponentProps) {
  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }
}
