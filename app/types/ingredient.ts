import type { IngredientType } from "~/routes/app/enums/ingredientType.enum";

export interface Ingredient {
  id: string;
  user: { id: string } | null;
  name: string;
  type: IngredientType;
  color: string;
}
