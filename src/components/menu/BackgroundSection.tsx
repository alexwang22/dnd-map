import { OpenWith } from "@suid/icons-material";
import { Button, InputAdornment, Stack } from "@suid/material";
import { createSignal } from "solid-js";
import { mapState, setMapState } from "~/components/State";
import { setMenuChange } from "~/components/menu/Menu";
import MenuSection from "~/components/menu/MenuSection";
import SliderWithText from "~/components/menu/SliderWithText";
import SetBackgroundButton from "~/components/menu/buttons/SetBackgroundButton";
import { setSelected } from "~/components/token/Token";

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
              setSelected("");
              setMenuChange((prev) => !prev);
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
