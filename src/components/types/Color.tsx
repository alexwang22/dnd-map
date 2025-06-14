import { getLuminance, hexToRgb, hslToRgb } from "@suid/material";

export const Colors = [
  "black",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "purple",
  "gray",
  "pink",
  "maroon",
  "white",
  "lime",
  "aquamarine",
  "aqua",
  "lavender",
] as const;

export type Color = (typeof Colors)[number];

export function colorToRgb(color: string) {
  if (color.startsWith("rgb") || color === "transparent") return color;
  const ctx = document.createElement("canvas").getContext("2d");
  ctx!.fillStyle = color;
  color = ctx!.fillStyle;
  if (color.startsWith("#")) {
    return hexToRgb(color);
  } else if (color.startsWith("hsl")) {
    return hslToRgb(color);
  } else if (color.startsWith("rgb")) {
    return color;
  } else {
    console.error("error getting color rgb");
    return color;
  }
}

export function rgbToHighContrast(rgb: string) {
  if (rgb === "transparent") return "black";
  const lum = getLuminance(rgb);
  // Maximize contrast in W3 G17 contrast test:
  // https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
  return Math.log(lum + 0.05) > (Math.log(1.05) + Math.log(0.05)) / 2
    ? "black"
    : "white";
}
