import type { Route } from "./+types/Tea";
import { CONFIG } from "../../config";
import { apiFetch } from "~/lib/api";
import { TeaHeader } from "~/components/TeaHeader";
import { TEA_TYPE_COLORS } from "./enums/teaType.enum";
import type { Tea } from "~/types/tea";

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

  const color =
    tea.custom_color || tea.style?.color || TEA_TYPE_COLORS[tea.type];

  return (
    <section style={{ "--tea-color": color } as React.CSSProperties}>
      <TeaHeader tea={tea} />
    </section>
  );
}
