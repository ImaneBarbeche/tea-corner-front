import type { TeaType } from "~/routes/app/enums/teaType.enum";

export interface TeaStyle {
  id: string;
  name: string;
  description: string;
  color: string;
  type: TeaType; // Or use an Enum if these are fixed categories
}
