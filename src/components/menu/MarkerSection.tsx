import { Delete } from "@suid/icons-material";
import { Button, InputAdornment, Stack } from "@suid/material";
import { Show } from "solid-js";
import { deleteMarker } from "../Marker";
import { mapState, setMapState } from "../State";
import { setMenuChange } from "./Menu";
import SliderWithText from "./SliderWithText";
import MoveMarkerButton from "./buttons/MoveMarkerButton";
import SetLabelButton from "./buttons/SetLabelButton";
import ColorSelector from "./selectors/ColorSelector";
import IconSelector, { setIcon } from "./selectors/IconSelector";
import ShapeSelector, { setShape } from "./selectors/ShapeSelector";
import MenuSection from "./MenuSection";

export default function MarkerSection() {
  return (
    <MenuSection
      label={mapState.selected === -1 ? "Create Marker" : "Edit Marker"}
    >
      <Stack direction="row" spacing={1} alignItems="stretch">
        <Stack spacing={1}>
          <ShapeSelector />
          <ColorSelector />
        </Stack>
        <IconSelector />

        {/* Edit */}
        <Show when={mapState.selected !== -1}>
          <Stack spacing={0}>
            <Stack direction="row" spacing={1}>
              <SetLabelButton />
              <div>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => {
                    deleteMarker(mapState.selected);
                    setMapState("selected", -1);
                    setShape(null);
                    setIcon(null);
                    setMenuChange((prev) => !prev);
                  }}
                  startIcon={<Delete />}
                >
                  Delete
                </Button>
              </div>
            </Stack>
            <SliderWithText
              min={8}
              max={100}
              value={
                mapState.markers[mapState.selected]
                  ? mapState.markers[mapState.selected].size
                  : 0
              }
              setValue={(value) =>
                setMapState("markers", mapState.selected, "size", value)
              }
              endAdornment={{
                endAdornment: (
                  <InputAdornment position="end">px</InputAdornment>
                ),
              }}
            />
            <MoveMarkerButton />
          </Stack>
        </Show>
      </Stack>
    </MenuSection>
  );
}
