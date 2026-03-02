// route("products/:pid", "./product.tsx");
import type { Key } from "react";
import type { Route } from "./+types/Home";

export async function clientLoader() {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    const res = await fetch(`${apiUrl}/tea/system`);
    const teas = await res.json();

    return teas;
  } catch (err) {
    return { error: "Network error." };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  console.log("What is my data?", loaderData);
  const listItems = loaderData.map(
    (tea: { id: Key; name: string; type: string }) => (
      <li key={tea.id}>
        <p>{tea.name}</p>
        <p>{tea.type}</p>
      </li>
    ),
  );
  return <ul>{listItems}</ul>;
}
