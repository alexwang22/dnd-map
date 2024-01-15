import { OpenWith } from "@suid/icons-material";
import { Button, InputAdornment, Stack } from "@suid/material";
import { setMapState, mapState } from "../State";
import SliderWithText from "./SliderWithText";
import SetBackgroundButton from "./buttons/SetBackgroundButton";
import { setIcon } from "./selectors/IconSelector";
import { setShape } from "./selectors/ShapeSelector";
import MenuSection from "./MenuSection";
import { createSignal } from "solid-js";

export const [movingBg, setMovingBg] = createSignal(false);

export default function BackgroundSection() {
  return (
    <MenuSection label="Background">
      <Stack direction="row" spacing={2}>
        <div>
          <SetBackgroundButton />
        </div>
        <Stack spacing={2}>
          <Button
            variant={movingBg() ? "contained" : "outlined"}
            onClick={() => {
              setMovingBg((prev) => !prev);
              setMapState("selected", -1);
              setShape(null);
              setIcon(null);
            }}
            startIcon={<OpenWith />}
          >
            Move Background
          </Button>
          <SliderWithText
            min={1}
            max={1000}
            default={100}
            value={mapState.background.scale}
            setValue={(value) => setMapState("background", "scale", value)}
            endAdornment={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
          />
        </Stack>
      </Stack>
    </MenuSection>
  );
}
