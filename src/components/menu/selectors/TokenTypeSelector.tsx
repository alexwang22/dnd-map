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
import { setMenuChange } from "~/components/menu/Menu";
import Token, { selected } from "~/components/token/Token";
import "./TokenTypeSelector.scss";

export const [tokenType, setTokenType] = createSignal<Token.Type>("character");

export default function TokenTypeSelector() {
  createEffect(() => {
    if (selected() !== "") {
      requestAnimationFrame(() => {
        setTokenType(mapState.tokens[selected()].type);
        setMenuChange((prev) => !prev);
      });
    }
  });

  return (
    <div>
      <Typography variant="button" fontSize={"12px"} color="primary">
        Type:
      </Typography>
      <Box class="token-type-selector-box">
        <List>
          <For each={Token.Types}>
            {(type, _) => {
              return (
                <ListItemButton
                  selected={tokenType() === type}
                  onClick={() => {
                    setTokenType(type);
                    setMenuChange((prev) => !prev);
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
