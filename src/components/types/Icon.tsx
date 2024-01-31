import Adjust from "@suid/icons-material/Adjust";
import Bedtime from "@suid/icons-material/Bedtime";
import Bolt from "@suid/icons-material/Bolt";
import BrightnessHigh from "@suid/icons-material/BrightnessHigh";
import Camera from "@suid/icons-material/Camera";
import Cancel from "@suid/icons-material/Cancel";
import Casino from "@suid/icons-material/Casino";
import CatchingPokemon from "@suid/icons-material/CatchingPokemon";
import Circle from "@suid/icons-material/Circle";
import Cloud from "@suid/icons-material/Cloud";
import Elderly from "@suid/icons-material/Elderly";
import Error from "@suid/icons-material/Error";
import Face from "@suid/icons-material/Face";
import Flag from "@suid/icons-material/Flag";
import Man from "@suid/icons-material/Man";
import Park from "@suid/icons-material/Park";
import RunCircle from "@suid/icons-material/RunCircle";
import Square from "@suid/icons-material/Square";
import Star from "@suid/icons-material/Star";
import Storm from "@suid/icons-material/Storm";
import Style from "@suid/icons-material/Style";
import Woman from "@suid/icons-material/Woman";

export const Icons = [
  "Star",
  "Elderly",
  "RunCircle",
  "CatchingPokemon",
  "Style",
  "Face",
  "Man",
  "Woman",
  "Bedtime",
  "Bolt",
  "BrightnessHigh",
  "Camera",
  "Cancel",
  "Error",
  "Casino",
  "Cloud",
  "Adjust",
  "Park",
  "Storm",
  "Square",
  "Circle",
  "Flag",
] as const;

export type Icon = (typeof Icons)[number];

export function getIcon(icon: Icon) {
  switch (icon) {
    case "Square":
      return Square;
    case "Circle":
      return Circle;
    case "Star":
      return Star;
    case "Elderly":
      return Elderly;
    case "Style":
      return Style;
    case "RunCircle":
      return RunCircle;
    case "Adjust":
      return Adjust;
    case "Bedtime":
      return Bedtime;
    case "Bolt":
      return Bolt;
    case "BrightnessHigh":
      return BrightnessHigh;
    case "CatchingPokemon":
      return CatchingPokemon;
    case "Camera":
      return Camera;
    case "Cancel":
      return Cancel;
    case "Casino":
      return Casino;
    case "Cloud":
      return Cloud;
    case "Error":
      return Error;
    case "Face":
      return Face;
    case "Man":
      return Man;
    case "Woman":
      return Woman;
    case "Park":
      return Park;
    case "Storm":
      return Storm;
    case "Flag":
      return Flag;
  }
}
