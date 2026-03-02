import type { Key } from "react";
import type { Route } from "./+types/Home";
import { CONFIG } from "../../config";

export async function clientLoader() {
  const token = localStorage.getItem(CONFIG.TOKEN_KEY);

  try {
    const res = await fetch(`${CONFIG.API_URL}/tea/system`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   "Content-type": "application/json",
      // },
      // credentials: "include",
    });

    if (res.status === 401) {
      return { error: "Unauthorized" };
    }

    const data = await res.json();

    return {
      teas: data ? data : [],
      error: null,
    };
  } catch (err) {
    return { error: "Network error." };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }
  return (
    <ul>
      {loaderData.teas?.map((tea: any) => (
        <li key={tea.id}>
          <p>
            <strong>{tea.name}</strong> ({tea.type})
          </p>
        </li>
      ))}
    </ul>
  );
}
