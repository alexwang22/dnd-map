import { Box, ToggleButton, ToggleButtonGroup } from "@suid/material";
import { For, createSignal } from "solid-js";
import "./ColorSelector.scss";
import { mapState, setMapState } from "./State";
import { Color } from "./enums/Color";

export const [color, setColor] = createSignal(Color.black);

export default function ColorSelector() {
  return (
    <Box class="color-selector-box box-selector">
      <ToggleButtonGroup
        value={color()}
        exclusive
        onChange={(_, newColor) => {
          if (newColor) {
            setColor(newColor);
            if (mapState.selected !== -1) {
              setMapState("markers", mapState.selected, "color", newColor);
            }
          }
        }}
      >
        <For each={Object.values(Color)}>
          {(color, _) => {
            return (
              <ToggleButton value={color}>
                <div
                  class="color-button"
                  style={{ "background-color": color }}
                />
              </ToggleButton>
            );
          }}
        </For>
      </ToggleButtonGroup>
    </Box>
  );
}
