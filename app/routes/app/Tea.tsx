import type { Route } from "./+types/Tea";
import { CONFIG } from "../../config";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const res = await fetch(`${CONFIG.API_URL}/tea/${params.teaId}`, {
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    const test = `${CONFIG.API_URL}/tea/${params.teaId}`;
    console.log(test);
    if (!res.ok) {
      const message = res.status === 404 ? "Tea not found" : "Unauthorized";
      return { error: message };
    }

    const data = await res.json();

    return {
      tea: data ? data : {},
      error: null,
    };
  } catch (err) {
    return { tea: null, error: "Network error." };
  }
}

export default function Tea({ loaderData }: Route.ComponentProps) {
  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }

  const tea = loaderData.tea;
  if (!tea) {
    return <p>Tea not available.</p>;
  }

  return (
    <p>
      <strong>{tea.name}</strong> ({tea.type})
    </p>
  );
}
