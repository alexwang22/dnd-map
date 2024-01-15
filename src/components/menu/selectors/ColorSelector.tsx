import { Box, ToggleButton, ToggleButtonGroup } from "@suid/material";
import { For, createSignal } from "solid-js";
import "./ColorSelector.scss";
import { mapState, setMapState } from "../../State";
import { Color } from "../../enums/Color";
import ToggleButtonGrid from "./ToggleButtonGrid";

export const [color, setColor] = createSignal(Color.black);

export default function ColorSelector() {
  return (
    <Box class="color-selector-box box-selector">
      <ToggleButtonGrid columnCount={8}>
        <For each={Object.values(Color)}>
          {(_color, _) => {
            return (
              <ToggleButton
                value={_color}
                selected={_color === color()}
                onClick={(_, newColor) => {
                  if (newColor) {
                    setColor(newColor);
                    if (mapState.selected !== -1) {
                      setMapState(
                        "markers",
                        mapState.selected,
                        "color",
                        newColor
                      );
                    }
                  }
                }}
              >
                <div
                  class="color-button"
                  style={{ "background-color": _color }}
                />
              </ToggleButton>
            );
          }}
        </For>
      </ToggleButtonGrid>
    </Box>
  );
}
