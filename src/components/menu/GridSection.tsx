import { CheckBox, CheckBoxOutlineBlank } from "@suid/icons-material";
import { Button, InputAdornment, Stack } from "@suid/material";
import { mapState, setMapState } from "~/components/State";
import MenuSection from "~/components/menu/MenuSection";
import SliderWithText from "~/components/menu/SliderWithText";

export default function GridSection() {
  return (
    <MenuSection label="Grid">
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Button
            variant="text"
            onClick={() => setMapState("showGrid", (prev) => !prev)}
            startIcon={
              mapState.showGrid ? <CheckBox /> : <CheckBoxOutlineBlank />
            }
          >
            Show Grid
          </Button>
          <Button
            disabled
            variant="text"
            onClick={() => setMapState("snapToGrid", (prev) => !prev)}
            startIcon={
              mapState.snapToGrid ? <CheckBox /> : <CheckBoxOutlineBlank />
            }
          >
            Snap to Grid
          </Button>
        </Stack>
        <SliderWithText
          min={8}
          max={100}
          default={32}
          interval={4}
          value={mapState.gridSize}
          setValue={(value) => setMapState("gridSize", value)}
          endAdornment={{
            endAdornment: <InputAdornment position="end">px</InputAdornment>,
          }}
        />
      </Stack>
    </MenuSection>
  );
}
