export enum IngredientType {
  TeaLeaf = "tea_leaf",
  Herb = "herb",
  Sweetener = "sweetener",
  Fruit = "fruit",
  Spice = "spice",
  Nut = "nut",
  Other = "other",
}

export const INGREDIENT_TYPE_ICONS: Record<IngredientType, string> = {
  [IngredientType.TeaLeaf]: "Leaf",
  [IngredientType.Herb]: "Sprout",
  [IngredientType.Sweetener]: "Candy",
  [IngredientType.Fruit]: "Citrus",
  [IngredientType.Spice]: "PillBottle",
  [IngredientType.Nut]: "Nut",
  [IngredientType.Other]: "CircleOff",
};
