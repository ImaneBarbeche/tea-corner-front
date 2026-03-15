import type { Route } from "./+types/Library";
import { CONFIG } from "../../config";
import type { Ingredient } from "~/types/ingredient";
import { Tag } from "~/components/Tag";
import { Button } from "~/components/Button";
import { redirect, useSubmit, type ActionFunctionArgs } from "react-router";
import { useState } from "react";
import { Modal } from "~/components/Modal";
import { IngredientForm } from "~/components/IngredientForm";
import { DropDownButton } from "~/components/DropDownButton";
import { PlusIcon } from "lucide-react";
import { TeaCard } from "~/components/TeaCard";
import type { UserTea } from "~/types/userTea";

export async function clientLoader() {
  try {
    const [ingredientRes, teaRes] = await Promise.all([
      fetch(`${CONFIG.API_URL}/ingredient/all`, { credentials: "include" }),
      fetch(`${CONFIG.API_URL}/user-tea/library`, { credentials: "include" }),
    ]);

    if (ingredientRes.status === 401 || teaRes.status === 401) {
      return { error: "Unauthorized" };
    }

    const ingredients = await ingredientRes.json();
    const teas = await teaRes.json();

    return { ingredients: ingredients ?? [], teas: teas ?? [], error: null };
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
      return redirect("/app/library");
    } catch (err) {
      // Handle network failures (server is down)
      return { error: "Network error." };
    }
  }
  return null;
}

export default function Library({ loaderData }: Route.ComponentProps) {
  const [open, setOpen] = useState(false);
  const submit = useSubmit();
  const [editOpen, setEditOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] =
    useState<Ingredient | null>(null);

  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }
  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Ingredients</h2>
          <Button
            onClick={() => setOpen(true)}
            variant="secondary"
            icon={PlusIcon}
          >
            Add
          </Button>
        </div>
        {loaderData.ingredients && loaderData.ingredients.length > 0 ? (
          <ul className="flex gap-2 flex-wrap">
            {loaderData.ingredients.map((ingredient: Ingredient) => (
              <li key={ingredient.id}>
                <Tag
                  content={ingredient.name}
                  icon={ingredient.type}
                  color={ingredient.color}
                >
                  <DropDownButton
                    className="p-1"
                    items={[
                      {
                        label: "Edit",
                        onClick: () => {
                          setSelectedIngredient(ingredient);
                          setEditOpen(true);
                        },
                      },
                      {
                        label: "Delete",
                        onClick: () =>
                          submit(
                            { intent: "delete", id: ingredient.id },
                            { method: "delete" },
                          ),
                      },
                    ]}
                  />
                </Tag>
              </li>
            ))}
          </ul>
        ) : (
          <p>No ingredients found.</p>
        )}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="New ingredient">
        <IngredientForm onClose={() => setOpen(false)} method="post" />
      </Modal>
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit ingredient"
      >
        <IngredientForm
          key={selectedIngredient?.id}
          onClose={() => setEditOpen(false)}
          method="patch"
          ingredient={selectedIngredient}
        />
      </Modal>
      <div className="flex flex-col gap-3">
        <h2 className="text-lg">Teas</h2>
        {loaderData.teas && loaderData.teas.length > 0 ? (
          <div className="flex gap-4 flex-wrap">
            {loaderData.teas.map((userTea: UserTea) => (
              <TeaCard tea={userTea.tea} key={userTea.id} />
            ))}
          </div>
        ) : (
          <p>No teas found.</p>
        )}
      </div>
    </section>
  );
}
