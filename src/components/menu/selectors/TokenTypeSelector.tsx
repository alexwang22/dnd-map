import ArrowRight from "@suid/icons-material/ArrowRight";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@suid/material";
import { For, Show, createEffect, createSignal } from "solid-js";
import { mapState } from "~/components/State";
import Token, { selected } from "~/components/Token";
import "./TokenTypeSelector.scss";
import { setMenuChange } from "~/components/menu/Menu";

export const [tokenType, setTokenType] = createSignal<Token.Type>("character");

export default function TokenTypeSelector() {
  createEffect(() => {
    if (selected() !== "") {
      requestAnimationFrame(() =>
        setTokenType(mapState.tokens[selected()].type)
      );
    }
  });

  return (
    <div>
      <Typography variant="button" fontSize={"12px"} color="primary">
        Type:
      </Typography>
      <Box class="token-type-selector-box">
        <List>
          <For each={["character", "object", "obstacle"] as Token.Type[]}>
            {(type, _) => {
              return (
                <ListItemButton
                  selected={tokenType() === type}
                  onClick={() => {
                    setMenuChange((prev) => !prev);
                    setTokenType(type);
                  }}
                >
                  <Show when={tokenType() === type}>
                    <ListItemIcon>
                      <ArrowRight color="primary" fontSize="small" />
                    </ListItemIcon>
                  </Show>
                  <ListItemText
                    primary={type}
                    primaryTypographyProps={{
                      variant: "button",
                    }}
                    style={{
                      "padding-left": tokenType() === type ? "0" : "24px",
                    }}
                  />
                </ListItemButton>
              );
            }}
          </For>
        </List>
      </Box>
    </div>
  );
}
