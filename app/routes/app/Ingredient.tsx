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
      const { intent, id, ...bodyData } = data   // exlude id and intent from return so request does not fail when it reaches backend
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
  const [color, setColor] = useState("#ffffff");
  const iconComponents: Record<string, React.ComponentType> = {
    Leaf,
    Sprout,
    Candy,
    Citrus,
    PillBottle,
    Nut,
    CircleOff,
  };
  const [selectedType, setSelectedType] = useState(IngredientType.Other);
  const IconComponent = iconComponents[INGREDIENT_TYPE_ICONS[selectedType]];

  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }
  return (
    <section className="w-full">
      <header>
        <h2>Ingredient</h2>
        {/* <Button>Add ingredient</Button> */}
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
                  <select name="type" defaultValue={ingredient.type} title="edit_type">
                    {Object.entries(IngredientType).map(([key, value]) => (
                      <option key={value} value={value}>
                        {key}
                      </option>
                    ))}
                  </select>
                  <input
                    type="color"
                    name="color"
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
      <Form
        method="post"
        className="flex 
          flex-col gap-4"
      >
        <header>
          <h1>New Ingredient</h1>{" "}
          {/* <button type="button" onClick={close}>X</button> */}
        </header>
        <Input name="name" className="" placeholder="Name" />
        <div className="flex px-4 py-2.5 bg-transparent text-primary-dark border-2 border-primary-dark rounded-full gap-4 items-center">
          <IconComponent />
          <select
            defaultValue={IngredientType.Other}
            name="type"
            title="type"
            onChange={(e) => setSelectedType(e.target.value as IngredientType)}
            className="px-4 py-2.5 bg-transparent text-primary-dark outline-none rounded-full w-full"
          >
            {Object.entries(IngredientType).map(([key, value]) => (
              <option key={value} value={value}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <label
          htmlFor="color-input"
          className="flex px-4 py-2.5 bg-transparent text-primary-dark border-2 border-primary-dark rounded-full gap-4"
        >
          <span
            style={{ backgroundColor: color }}
            className="flex items-center rounded-full p-1 min-w-6 aspect-square"
          >
            <PaletteIcon />
          </span>
          <p className="self-center">Color</p>
        </label>
        <input
          id="color-input"
          type="color"
          name="color"
          className="hidden"
          onChange={(e) => setColor(e.target.value)}
        />
        {actionData?.error && <p>{actionData.error}</p>}
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </Form>
    </section>
  );
}
