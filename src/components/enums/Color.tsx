import {
  decomposeColor,
  getLuminance,
  hexToRgb,
  hslToRgb,
  recomposeColor,
} from "@suid/material";

export const Color = {
  black: "black",
  red: "red",
  orange: "orange",
  yellow: "yellow",
  green: "green",
  blue: "blue",
  indigo: "indigo",
  purple: "purple",
  gray: "gray",
  brown: "brown",
  maroon: "maroon",
  beige: "beige",
  lime: "lime",
  aquamarine: "aquamarine",
  aqua: "aqua",
  lavender: "lavender",
};

export function colorToRgb(color: string) {
  if (color.startsWith("rgb")) return color;
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
  const lum = getLuminance(rgb);
  // Maximize contrast in W3 G17 contrast test:
  // https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
  const res =
    Math.log(lum + 0.05) > (Math.log(1.05) + Math.log(0.05)) / 2 ? 0 : 255;
  return recomposeColor({
    type: "rgb",
    values: [res, res, res],
  });
}
