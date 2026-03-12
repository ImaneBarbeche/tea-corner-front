import type { Route } from "./+types/Ingredient";
import { CONFIG } from "../../config";
import type { Ingredient } from "~/types/ingredient";
import { Tag } from "~/components/Tag";

export async function clientLoader() {

  try {
    const res = await fetch(`${CONFIG.API_URL}/ingredient/all`, {
      headers: {
        "Content-type": "application/json",
      },
      credentials: "include",
    });

    if (res.status === 401) {
      return { error: "Unauthorized" };
    }

    const data = await res.json();
    console.log(data);

    return {
      ingredients: data ? (data as Ingredient[]) : [],
      error: null,
    };
  } catch (err) {
    return { error: "Network error." };
  }
}

export default function Ingredient({ loaderData }: Route.ComponentProps) {

  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }
  return (
    <section className="w-full">
      <header>
        <h2>Ingredient</h2>
      </header>
      <div className="">
        {loaderData.ingredients && loaderData.ingredients.length > 0 ? (
          <ul className="flex gap-4 flex-wrap md:gap-8">
            {loaderData.ingredients.map((ingredient: Ingredient) => (
              <li key={ingredient.id}>
                <Tag 
                content={ingredient.name}
                icon={ingredient.type}
                color={ingredient.color}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No ingredients found.</p>
        )}
      </div>
    </section>
  );
}
