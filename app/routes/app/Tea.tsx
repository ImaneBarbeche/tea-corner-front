import type { Route } from "./+types/Tea";
import { CONFIG } from "../../config";
import { apiFetch } from "~/lib/api";
import { TeaHeader } from "~/components/TeaHeader";
import { TEA_TYPE_COLORS } from "./enums/teaType.enum";
import type { Tea } from "~/types/tea";
import type { Ingredient } from "~/types/ingredient";
import { Tag } from "~/components/Tag";
import type { TeaIngredient } from "~/types/TeaIngredient";
import {
  formatBrewTime,
  formatLeafAmount,
  getTeaColor,
} from "~/lib/teaFormatters";
import { TeaInfoCol } from "~/components/TeaInfoCol";

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
  const color = getTeaColor(tea);

  return (
    <section
      className=""
      style={{ "--tea-color": color } as React.CSSProperties}
    >
      <TeaInfoCol tea={tea} />
      <div></div>
    </section>
    // <section
    //   className=""
    //   style={{ "--tea-color": color } as React.CSSProperties}
    // >
    //   <div className="flex flex-col gap-4">
    //     <TeaHeader tea={tea} />
    //     {tea.description && (
    //       <p className="max-w-80 text-justify">{tea.description}</p>
    //     )}
    //     {tea.ingredients.length > 0 && (
    //       <div className="flex flex-col gap-2">
    //         <p>Ingredients</p>
    //         <div className="flex gap-2 flex-wrap">
    //           {tea.ingredients.map(
    //             ({ ingredient, quantity, optional }: TeaIngredient) => (
    //               <Tag
    //                 key={ingredient.id}
    //                 content={`${ingredient.name} (${quantity}g)`}
    //                 icon={ingredient.type}
    //                 color={ingredient.color}
    //               />
    //             ),
    //           )}
    //         </div>
    //       </div>
    //     )}
    //     <div className="flex flex-col gap-2">
    //       <p>Caffeine</p>
    //       <div className="flex gap-2 flex-wrap">
    //         <p>{tea.caffeine_level}</p>
    //       </div>
    //     </div>
    //     <div className="flex flex-col gap-2">
    //       <p>Preparation</p>
    //       <div className="flex gap-2 flex-wrap">
    //         <p>{tea.brewing_temperature}°C</p>
    //         <p>{formatBrewTime(tea.brewing_time)}</p>
    //         <p>{tea.water_amount}ml</p>
    //         {tea.leaf_amount && <p>{formatLeafAmount(tea.leaf_amount)}</p>}
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}
