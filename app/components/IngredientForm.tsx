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
import { Form } from "react-router";
import {
  INGREDIENT_TYPE_ICONS,
  IngredientType,
} from "~/routes/app/enums/ingredientType.enum";
import { Input } from "./Input";
import { Button } from "./Button";

interface IngredientFormProps {
  onClose?: () => void;
}

export function IngredientForm({ onClose }: IngredientFormProps) {
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

  return (
    <Form
      method="post"
      className="flex 
          flex-col gap-4"
    >
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
      <Button>Save</Button>
      <Button type="button" variant="secondary" onClick={onClose}>
        Cancel
      </Button>
    </Form>
  );
}
