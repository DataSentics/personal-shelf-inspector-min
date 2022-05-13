// import { Dimensions, PixelRatio } from "react-native";
import colorLib from "color";

import { normalize } from "./sizes";

export const giveAlpha = (color: string, alpha: number): string =>
  colorLib(color).alpha(alpha).rgb().string();

interface DimensionsType {
  [propertyName: string]: number;
}

function dimensions(
  top: number,
  right = top,
  bottom = top,
  left = right,
  property: "padding" | "margin",
) {
  const styles: DimensionsType = {};

  styles[`${property}Top`] = normalize(top);
  styles[`${property}Right`] = normalize(right);
  styles[`${property}Bottom`] = normalize(bottom);
  styles[`${property}Left`] = normalize(left);

  return styles;
}

export function margin(top: number, right?: number, bottom?: number, left?: number) {
  return dimensions(top, right, bottom, left, "margin");
}

export function padding(top: number, right?: number, bottom?: number, left?: number) {
  return dimensions(top, right, bottom, left, "padding");
}

export function boxShadow(
  color: string,
  offset = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
