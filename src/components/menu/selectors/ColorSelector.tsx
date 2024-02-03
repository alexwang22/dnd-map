import { Box, ToggleButton } from "@suid/material";
import { For, createEffect, createSignal } from "solid-js";
import { mapState, setMapState } from "~/components/State";
import ToggleButtonGrid from "~/components/menu/selectors/ToggleButtonGrid";
import { selected } from "~/components/token/Token";
import { Color, Colors } from "~/components/types/Color";
import "./ColorSelector.scss";

export const [color, setColor] = createSignal<Color>("black");

export default function ColorSelector() {
  createEffect(() => {
    if (selected() !== "") {
      requestAnimationFrame(() => setColor(mapState.tokens[selected()].color));
    }
  });

  return (
    <Box class="color-selector-box box-selector">
      <ToggleButtonGrid columnCount={8}>
        <For each={Colors}>
          {(_color, _) => {
            return (
              <ToggleButton
                value={_color}
                selected={_color === color()}
                onClick={(_, newColor) => {
                  if (newColor) {
                    setColor(newColor);
                    if (selected() !== "") {
                      setMapState("tokens", selected(), "color", newColor);
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
