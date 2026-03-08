export enum TeaType {
  Green = "green",
  Black = "black",
  White = "white",
  Yellow = "yellow",
  Oolong = "oolong",
  Dark = "dark",
  Herbal = "herbal",
}

export const TEA_TYPE_COLORS: Record<TeaType, string> = {
  [TeaType.Green]: "#ADC2A2",
  [TeaType.Black]: "#A67560",
  [TeaType.White]: "#FDF5DA",
  [TeaType.Yellow]: "#EBD489",
  [TeaType.Oolong]: "#F8EBC1",
  [TeaType.Dark]: "#BC8372",
  [TeaType.Herbal]: "#D68A68",
};
