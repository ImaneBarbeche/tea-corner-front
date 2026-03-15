import type { Ingredient } from "./ingredient";

export interface TeaIngredient {
  id: string;
  ingredient: Ingredient;
  quantity: number | null;
  optional: boolean | null;
}
