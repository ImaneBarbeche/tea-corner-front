import { TEA_TYPE_COLORS } from "~/routes/app/enums/teaType.enum";
import type { Tea } from "~/types/tea";

export const formatBrewTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  // PadStart ensures we always have 2 digits (e.g., "5" becomes "05")
  const formattedMins = String(mins).padStart(2, "0");
  const formattedSecs = String(secs).padStart(2, "0");

  return `${formattedMins}:${formattedSecs}`;
};

export const formatLeafAmount = (grams: number) => {
  const teaspoons = grams / 2;

  // Clean up decimals: 1.5 stays 1.5, 2.0 becomes 2
  const tspFormatted = Number.isInteger(teaspoons)
    ? teaspoons
    : teaspoons.toFixed(1);

  return `${tspFormatted} tsp / ${grams}g`;
};

export const getTeaColor = (tea: Tea): string => {
  return tea.custom_color || tea.style?.color || TEA_TYPE_COLORS[tea.type];
};

// export const showType = (tea: Tea): string => {
//   return (
//     tea.name.toLowerCase() !== tea.type.toLowerCase()
//   )
// }
