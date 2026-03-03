import type { TeaType } from "~/routes/app/enums/teaType.enum";
import type { caffeineLevel } from "~/routes/app/enums/caffeineLevel.enum";

export interface Tea {
  id: string;
  author: { id: string; name: string } | null;
  //   ingredients: TeaIngredient[];
  name: string;
  type: TeaType;
  style: { id: string; name: string } | null;
  description: string | null;
  custom_color: string | null;
  custom_brew_color: string | null;
  instructions: string | null;
  brewing_time: number;
  brewing_temperature: number;
  leaf_amount: number | null;
  water_amount: number | null;
  caffeine_level: caffeineLevel;
  source: string | null;
  is_public: boolean;
  created_at: string;
  modified_at: string;
}
