import type { Route } from "./+types/Home";
import { CONFIG } from "../../config";
import type { Tea } from "~/types/tea";
import { TeaCard } from "~/components/TeaCard";
import { useState } from "react";

export async function clientLoader() {
  try {
    const res = await fetch(`${CONFIG.API_URL}/tea/system`);

    if (res.status === 401) {
      return { error: "Unauthorized" };
    }

    const data = await res.json();
    console.log(data);

    return {
      teas: data ? (data as Tea[]) : [],
      error: null,
    };
  } catch (err) {
    return { error: "Network error." };
  }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }
  return (
    <section className="w-full">
      <header>
        <h2>Tea</h2>
      </header>
      <div className="flex gap-4 flex-wrap justify-betweenNOT md:gap-8">
        {loaderData.teas?.map((tea: Tea) => (
          <TeaCard tea={tea} key={tea.id} />
        ))}
      </div>
    </section>
  );
}
