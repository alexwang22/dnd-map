import { Box, ToggleButton, ToggleButtonGroup } from "@suid/material";
import "./IconSelector.scss";
import { For, createSignal } from "solid-js";
import { Icon, getIcon } from "../../enums/Icon";
import { mapState, setMapState } from "../../State";
import { Dynamic } from "solid-js/web";
import ToggleButtonGrid from "./ToggleButtonGrid";

export const [icon, setIcon] = createSignal<Icon | null>(null);

export default function IconSelector() {
  return (
    <Box class="icon-selector-box box-selector">
      <ToggleButtonGrid columnCount={7}>
        <For
          each={Object.values(Icon).filter(
            (value): value is Icon => typeof value === "number"
          )}
        >
          {(_icon, _) => {
            return (
              <ToggleButton
                value={_icon}
                selected={_icon === icon()}
                onClick={(_, newIcon) => {
                  if (newIcon === icon()) newIcon = null;
                  setIcon(newIcon);
                  if (mapState.selected !== -1) {
                    setMapState("markers", mapState.selected, "icon", newIcon);
                  }
                }}
              >
                <Dynamic component={getIcon(_icon)} />
              </ToggleButton>
            );
          }}
        </For>
      </ToggleButtonGrid>
    </Box>
  );
}
