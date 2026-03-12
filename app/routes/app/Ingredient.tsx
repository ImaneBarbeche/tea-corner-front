import type { Route } from "./+types/Ingredient";
import { CONFIG } from "../../config";
import type { Ingredient } from "~/types/ingredient";
import { Tag } from "~/components/Tag";
import { Button } from "~/components/Button";
import {
  Form,
  redirect,
  useActionData,
  type ActionFunctionArgs,
} from "react-router";
import { Input } from "~/components/Input";
import {
  IngredientType,
  INGREDIENT_TYPE_ICONS,
} from "./enums/ingredientType.enum";
import {
  Leaf,
  Sprout,
  Candy,
  Citrus,
  PillBottle,
  Nut,
  CircleOff,
} from "lucide-react";
import { PaletteIcon } from "lucide-react";
import { useState } from "react";
import { Modal } from "~/components/Modal";
import { IngredientForm } from "~/components/IngredientForm";

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

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const intent = data.intent;

  if (intent === "delete") {
    try {
      const response = await fetch(`${CONFIG.API_URL}/ingredient/${data.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const resData = await response.json().catch(() => ({}));
      if (!response.ok) {
        // Handle both single errors and arrays of errors
        const errorMessage = Array.isArray(resData.message)
          ? resData.message.join(", ")
          : resData.message || "Something went wrong on the server.";
        console.log(resData);

        return {
          error: errorMessage,
        };
      }
      return redirect("/app/ingredient");
    } catch (err) {
      // Handle network failures (server is down)
      return { error: "Network error." };
    }
  }

  if (intent === "update") {
    const { intent, id, ...bodyData } = data; // exlude id and intent from return so request does not fail when it reaches backend
    try {
      const response = await fetch(`${CONFIG.API_URL}/ingredient/${data.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
        credentials: "include",
      });
      const resData = await response.json().catch(() => ({}));
      if (!response.ok) {
        // Handle both single errors and arrays of errors
        const errorMessage = Array.isArray(resData.message)
          ? resData.message.join(", ")
          : resData.message || "Something went wrong on the server.";
        console.log(resData);

        return {
          error: errorMessage,
        };
      }
      return redirect("/app/ingredient");
    } catch (err) {
      // Handle network failures (server is down)
      return { error: "Network error." };
    }
  }
  try {
    const response = await fetch(`${CONFIG.API_URL}/ingredient/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const resData = await response.json().catch(() => ({}));
    if (!response.ok) {
      // Handle both single errors and arrays of errors
      const errorMessage = Array.isArray(resData.message)
        ? resData.message.join(", ")
        : resData.message || "Something went wrong on the server.";
      console.log(resData);

      return {
        error: errorMessage,
      };
    }
    return redirect("/app/ingredient");
  } catch (err) {
    // Handle network failures (server is down)
    return { error: "Network error." };
  }
}

export default function Ingredient({ loaderData }: Route.ComponentProps) {
  const actionData = useActionData();
  const [open, setOpen] = useState(false);

  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }
  return (
    <section className="w-full">
      <header>
        <h2>Ingredient</h2>
        <Button onClick={() => setOpen(true)} variant="secondary">Add ingredient</Button>
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
                <Form method="post">
                  <input type="hidden" name="id" value={ingredient.id} />
                  <button name="intent" value="delete" type="submit">
                    X
                  </button>
                </Form>
                <Form method="post">
                  <input type="hidden" name="id" value={ingredient.id} />
                  <Input name="name" defaultValue={ingredient.name} />
                  <select
                    name="type"
                    defaultValue={ingredient.type}
                    title="edit_type"
                  >
                    {Object.entries(IngredientType).map(([key, value]) => (
                      <option key={value} value={value}>
                        {key}
                      </option>
                    ))}
                  </select>
                  <input
                    type="color"
                    name="color"
                    title="update"
                    defaultValue={ingredient.color}
                  />
                  <button name="intent" value="update" type="submit">
                    Save
                  </button>
                </Form>
              </li>
            ))}
          </ul>
        ) : (
          <p>No ingredients found.</p>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="New ingredient">
        <IngredientForm onClose={() => setOpen(false)} />
      </Modal>
    </section>
  );
}
