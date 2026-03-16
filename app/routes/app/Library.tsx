import type { Route } from "./+types/Library";
import { CONFIG } from "../../config";
import { TeaCard } from "~/components/TeaCard";
import type { UserTea } from "~/types/user-tea";
import { PlusIcon } from "lucide-react";
import { Button } from "~/components/Button";
import { useState } from "react";
import { Modal } from "~/components/Modal";
import { TeaForm } from "~/components/TeaForm";
import { redirect, useRevalidator, useSubmit, type ActionFunctionArgs } from "react-router";
import { DropDownButton } from "~/components/DropDownButton";
import type { Ingredient } from "~/types/ingredient";
import { Tag } from "~/components/Tag";
import { IngredientForm } from "~/components/IngredientForm";

export async function clientLoader() {
  try {
    const [teaRes, ingredientRes] = await Promise.all([
      fetch(`${CONFIG.API_URL}/user-tea/library`, {
        headers: { "Content-type": "application/json" },
        credentials: "include",
      }),
      fetch(`${CONFIG.API_URL}/ingredient/all`, { credentials: "include" }),
    ]);

    if (teaRes.status === 401 || ingredientRes.status === 401) {
      return { error: "Unauthorized" };
    }

    const userTeas = await teaRes.json();
    const ingredients = await ingredientRes.json();

    return {
      userTeas: userTeas ? (userTeas as UserTea[]) : [],
      ingredients: ingredients ?? [],
      error: null,
    };
  } catch (err) {
    return { error: "Network error." };
  }
}

export async function clientAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.intent === "delete") {
    try {
      const response = await fetch(`${CONFIG.API_URL}/ingredient/${data.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const resData = await response.json().catch(() => ({}));
      if (!response.ok) {
        const errorMessage = Array.isArray(resData.message)
          ? resData.message.join(", ")
          : resData.message || "Something went wrong on the server.";
        return { error: errorMessage };
      }
      return redirect("/app/library");
    } catch (err) {
      return { error: "Network error." };
    }
  }
  return null;
}

export default function Library({ loaderData }: Route.ComponentProps) {
  const revalidator = useRevalidator();
  const submit = useSubmit();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedUserTea, setSelectedUserTea] = useState<UserTea | null>(null);
  const [ingredientOpen, setIngredientOpen] = useState(false);
  const [ingredientEditOpen, setIngredientEditOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  // Function to refresh the list
  const refresh = () => revalidator.revalidate();

  if (loaderData.error) {
    return <p>Error: {loaderData.error}</p>;
  }
  return (
    <section className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Ingredients</h2>
          <Button
            onClick={() => setIngredientOpen(true)}
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
                          setIngredientEditOpen(true);
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
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h2 className="text-lg">Teas</h2>
          <Button
            onClick={() => setOpen(true)}
            variant="secondary"
            icon={PlusIcon}
          >
            Add
          </Button>
        </div>
        <div className="flex gap-4 flex-wrap md:gap-8">
          {loaderData.userTeas?.map((userTea: UserTea) => {
            // If the relation is missing for some reason, don't crash
            if (!userTea.tea) return null;

            return (
              <div
                key={userTea.id}
                style={
                  { "--anchor-element": `--${userTea.id}` } as React.CSSProperties
                }
                className="[anchor-name:var(--anchor-element)] flex-1 md:max-w-64"
              >
                <TeaCard tea={userTea.tea} />
                <DropDownButton
                  useAnchor={true}
                  className="p-1"
                  items={[
                    {
                      label: "Edit",
                      onClick: () => {
                        setSelectedUserTea(userTea);
                        setEditOpen(true);
                      },
                    },
                  ]}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Modal open={ingredientOpen} onClose={() => setIngredientOpen(false)} title="New ingredient">
        <IngredientForm
          key={ingredientOpen ? "new-ingredient-form" : "closed"}
          onClose={() => { setIngredientOpen(false); refresh(); }}
          method="post"
        />
      </Modal>
      <Modal
        open={ingredientEditOpen}
        onClose={() => setIngredientEditOpen(false)}
        title="Edit ingredient"
      >
        <IngredientForm
          key={selectedIngredient?.id}
          onClose={() => { setIngredientEditOpen(false); refresh(); }}
          method="patch"
          ingredient={selectedIngredient}
        />
      </Modal>
      <Modal open={open} onClose={() => setOpen(false)} title="New tea">
        <TeaForm
          key={open ? "new-tea-form" : "closed"}
          onClose={() => setOpen(false)}
          method="post"
          onRefresh={refresh}
        />
      </Modal>
      <Modal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Edit tea"
      >
        <TeaForm
          key={selectedUserTea?.id ?? "new"}
          onClose={() => setEditOpen(false)}
          method="patch"
          onRefresh={refresh}
          tea={selectedUserTea?.tea}
        />
      </Modal>
    </section>
  );
}
