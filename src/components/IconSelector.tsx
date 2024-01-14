import { Box, ToggleButton, ToggleButtonGroup } from "@suid/material";
import "./IconSelector.scss";
import { For, createSignal } from "solid-js";
import { Icon, getIcon } from "./enums/Icon";
import { mapState, setMapState } from "./State";
import { Dynamic } from "solid-js/web";

export const [icon, setIcon] = createSignal<Icon | null>(null);

export default function IconSelector() {
  return (
    <Box class="icon-selector-box box-selector">
      <ToggleButtonGroup
        value={icon()}
        exclusive
        onChange={(_, newIcon) => {
          setIcon(newIcon);
          if (mapState.selected !== -1) {
            setMapState("markers", mapState.selected, "icon", newIcon);
          }
        }}
      >
        <For
          each={Object.values(Icon).filter(
            (value): value is Icon => typeof value === "number",
          )}
        >
          {(icon, _) => {
            return (
              <ToggleButton value={icon}>
                <Dynamic component={getIcon(icon)} />
              </ToggleButton>
            );
          }}
        </For>
      </ToggleButtonGroup>
    </Box>
  );
}
