import {
  Candy,
  CircleOff,
  Citrus,
  Leaf,
  Nut,
  PaletteIcon,
  PillBottle,
  Sprout,
} from "lucide-react";
import React, { useState } from "react";
import {
  INGREDIENT_TYPE_ICONS,
  IngredientType,
} from "~/routes/app/enums/ingredientType.enum";
import { Input } from "./Input";
import { Button } from "./Button";
import { CONFIG } from "~/config";
import type { Ingredient } from "~/types/ingredient";

interface IngredientFormProps {
  onClose?: () => void;
  method: "post" | "patch";
  ingredient?: Ingredient | null;
}

export function IngredientForm({
  onClose,
  method,
  ingredient,
}: IngredientFormProps) {
  const [color, setColor] = useState(ingredient?.color ?? "#ffffff");
  const iconComponents: Record<string, React.ComponentType> = {
    Leaf,
    Sprout,
    Candy,
    Citrus,
    PillBottle,
    Nut,
    CircleOff,
  };

  const [selectedType, setSelectedType] = useState(
    ingredient ? ingredient.type : IngredientType.Other,
  );
  const IconComponent = iconComponents[INGREDIENT_TYPE_ICONS[selectedType]];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const requestMethod = method;

    if (requestMethod === "patch" && ingredient?.id) {
      const { intent, id, ...bodyData } = data; // exlude id and intent from return so request does not fail when it reaches backend
      try {
        const response = await fetch(
          `${CONFIG.API_URL}/ingredient/${ingredient.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
            credentials: "include",
          },
        );
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
        onClose?.();
        return;
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
      onClose?.();
    } catch (err) {
      // Handle network failures (server is down)
      return { error: "Network error." };
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex 
          flex-col gap-4"
    >
      {method}
      <Input
        name="name"
        className=""
        placeholder="Name"
        defaultValue={ingredient?.name}
      />
      <div className="flex px-4 py-2.5 bg-transparent text-primary-dark border-2 border-primary-dark rounded-full gap-4 items-center">
        <IconComponent />
        <select
          value={selectedType}
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
        className="flex px-4 py-2.5 bg-transparent text-primary-dark border-2 border-primary-dark rounded-full gap-4"
      >
        <span
          style={{ backgroundColor: color }}
          className="flex items-center rounded-full p-1 min-w-6 aspect-square"
        >
          <PaletteIcon />
        </span>
        <p className="self-center">{color}</p>
      <input
        type="color"
        name="color"
        className="opcacity-0 inset-0 w-0 h-0"
        onChange={(e) => setColor(e.target.value)}
        value={color}
      />
      </label>
      <Button type="submit">Save</Button>
      <Button type="button" variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </form>
  );
}
