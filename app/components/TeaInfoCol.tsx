import {
  formatBrewTime,
  formatLeafAmount,
  getTeaColor,
} from "~/lib/teaFormatters";
import type { Tea } from "~/types/tea";
import { TeaHeader } from "./TeaHeader";
import type { TeaIngredient } from "~/types/TeaIngredient";
import { Tag } from "./Tag";
import { Droplet, Droplets, Leaf, Thermometer, Timer } from "lucide-react";

export function TeaInfoCol({ tea }: { tea: Tea }) {
  const color = getTeaColor(tea);
  return (
    <div className="flex flex-col gap-4 mb-auto">
      <TeaHeader tea={tea} />
      <div className="flex flex-col gap-4 md:max-w-80">
        {tea.description && <p className=" text-justify">{tea.description}</p>}
        {tea.ingredients.length > 0 && (
          <div className="flex flex-col gap-2">
            <p>Ingredients</p>
            <div className="flex gap-2 flex-wrap">
              {tea.ingredients.map(
                ({ ingredient, quantity, optional }: TeaIngredient) => (
                  <Tag
                    key={ingredient.id}
                    content={`${ingredient.name} (${quantity}g)`}
                    icon={ingredient.type}
                    color={ingredient.color}
                  />
                ),
              )}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <p>Caffeine</p>
          <div className="flex gap-2 flex-wrap">
            <p>{tea.caffeine_level}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p>Preparation</p>
          {/* TODO: modify the tag component to reuse it here */}
          <div className="grid grid-cols-2 gap-2">
            <p className="flex items-center gap-2">
              <Thermometer
                color="var(--color-secondary-dark)"
                strokeWidth={2}
                size={16}
              />
              {tea.brewing_temperature}°C
            </p>
            <p className="flex items-center gap-2">
              <Timer
                color="var(--color-secondary-dark)"
                strokeWidth={2}
                size={16}
              />
              {formatBrewTime(tea.brewing_time)}
            </p>
            {tea.leaf_amount && (
              <p className="flex items-center gap-2">
                <Leaf
                  color="var(--color-secondary-dark)"
                  strokeWidth={2}
                  size={16}
                />
                {formatLeafAmount(tea.leaf_amount)}
              </p>
            )}
            {tea.water_amount && (
              <p className="flex items-center gap-2">
                <Droplets
                  color="var(--color-secondary-dark)"
                  strokeWidth={2}
                  size={16}
                />
                {tea.water_amount}ml
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
