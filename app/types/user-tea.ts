import type { Tea } from "./tea"; // Assuming the file name

export interface UserTea {
  id: string;
  tea: Tea;

  inventory_amount: number | null;
  notes: string | null;

  custom_brewing_time: number | null;
  custom_brewing_temperature: number | null;
  custom_leaf_amount: number | null;
  custom_water_amount: number | null;

  created_at: string;
  modified_at: string;
  deleted_at: string | null;
}
