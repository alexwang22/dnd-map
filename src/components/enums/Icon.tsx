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
import Man from "@suid/icons-material/Man";
import Park from "@suid/icons-material/Park";
import RunCircle from "@suid/icons-material/RunCircle";
import Square from "@suid/icons-material/Square";
import Star from "@suid/icons-material/Star";
import Storm from "@suid/icons-material/Storm";
import Style from "@suid/icons-material/Style";
import Woman from "@suid/icons-material/Woman";

export enum Icon {
  STAR,
  ELDERLY,
  RUNCIRCLE,
  CATCHINGPOKEMON,
  STYLE,
  FACE,
  MAN,
  WOMAN,
  BEDTIME,
  BOLT,
  BRIGHTNESSHIGH,
  CAMERA,
  CANCEL,
  ERROR,
  CASINO,
  CLOUD,
  ADJUST,
  PARK,
  STORM,
  SQUARE,
  CIRCLE,
}

export function getIcon(icon: Icon) {
  switch (icon) {
    case Icon.SQUARE:
      return Square;
    case Icon.CIRCLE:
      return Circle;
    case Icon.STAR:
      return Star;
    case Icon.ELDERLY:
      return Elderly;
    case Icon.STYLE:
      return Style;
    case Icon.RUNCIRCLE:
      return RunCircle;
    case Icon.ADJUST:
      return Adjust;
    case Icon.BEDTIME:
      return Bedtime;
    case Icon.BOLT:
      return Bolt;
    case Icon.BRIGHTNESSHIGH:
      return BrightnessHigh;
    case Icon.CATCHINGPOKEMON:
      return CatchingPokemon;
    case Icon.CAMERA:
      return Camera;
    case Icon.CANCEL:
      return Cancel;
    case Icon.CASINO:
      return Casino;
    case Icon.CLOUD:
      return Cloud;
    case Icon.ERROR:
      return Error;
    case Icon.FACE:
      return Face;
    case Icon.MAN:
      return Man;
    case Icon.WOMAN:
      return Woman;
    case Icon.PARK:
      return Park;
    case Icon.STORM:
      return Storm;
  }
}
