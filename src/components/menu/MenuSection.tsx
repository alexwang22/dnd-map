import { JSX, Show } from "solid-js";
import "./MenuSection.scss";
import { Stack, Typography } from "@suid/material";

declare namespace MenuSection {
  type Props = {
    children: JSX.Element;
    label?: string;
  };
}

function MenuSection(props: MenuSection.Props) {
  return (
    <Stack class="menu-section">
      {props.children}
      <Show when={props.label && props.label !== ""}>
        <div class="label">
          <Typography align="center" variant="button">
            {props.label}
          </Typography>
        </div>
      </Show>
    </Stack>
  );
}

export default MenuSection;
