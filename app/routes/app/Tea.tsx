import type { Route } from "./+types/Tea";
import { CONFIG } from "../../config";
import { apiFetch } from "~/lib/api";

import {
  formatBrewTime,
  formatLeafAmount,
  getTeaColor,
} from "~/lib/teaFormatters";
import { TeaInfoCol } from "~/components/TeaInfoCol";
import type { Tea } from "~/types/tea";
import { TeaTimer } from "~/components/TeaTimer";
import { TeaTimerCup } from "~/components/TeaTimerCup";
import { useState } from "react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  try {
    const res = await apiFetch(`${CONFIG.API_URL}/tea/${params.teaId}`, {
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
    console.log(data);

    return {
      tea: data ? (data as Tea) : ({} as Tea),
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

  const [isSteeping, setIsSteeping] = useState(false);
  const color = getTeaColor(tea);

  return (
    <section
      className="flex flex-col md:flex-row items-center md:items-end md:justify-around w-full"
      style={{ "--tea-color": color } as React.CSSProperties}
    >
      <TeaInfoCol tea={tea} />
      <div className="mt-8 md:mt-0 flex flex-col items-center gap-4">
        <TeaTimerCup isSteeping={isSteeping} brewingTime={tea.brewing_time} />
        <TeaTimer seconds={tea.brewing_time} onStatusChange={setIsSteeping} />
      </div>
    </section>
  );
}
