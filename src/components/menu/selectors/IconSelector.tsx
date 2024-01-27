import { Box, ToggleButton, Typography } from "@suid/material";
import { For, createEffect, createSignal } from "solid-js";
import { Dynamic } from "solid-js/web";
import { mapState, setMapState } from "~/components/State";
import { selected } from "~/components/token/Token";
import { Icon, Icons, getIcon } from "~/components/types/Icon";
import ToggleButtonGrid from "~/components/menu/selectors/ToggleButtonGrid";
import "./IconSelector.scss";

export const [icon, setIcon] = createSignal<Icon | null>(null);

export default function IconSelector() {
  createEffect(() => {
    if (selected() !== "") {
      requestAnimationFrame(() => setIcon(mapState.tokens[selected()].icon));
    } else {
      setIcon(null);
    }
  });

  return (
    <div>
      <Typography variant="button" fontSize={"12px"} color="primary">
        Icon:
      </Typography>
      <Box class="icon-selector-box box-selector">
        <ToggleButtonGrid columnCount={7}>
          <For each={Icons}>
            {(_icon, _) => {
              return (
                <ToggleButton
                  value={_icon}
                  selected={_icon === icon()}
                  onClick={(_, newIcon) => {
                    if (newIcon === icon()) newIcon = null;
                    setIcon(newIcon);
                    if (selected() !== "") {
                      setMapState("tokens", selected(), "icon", newIcon);
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
    </div>
  );
}
