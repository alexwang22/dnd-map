import { Stack, TextField, Typography } from "@suid/material";
import { createComputed, createSignal } from "solid-js";
import { mapState, setMapState } from "~/components/State";
import { selected } from "~/components/token/Token";
import "./ObstacleDimensions.scss";

export default function ObstacleDimensions() {
  const [width, setWidth] = createSignal("");
  const [height, setHeight] = createSignal("");
  const validWidth = () => width() !== "" && +width() >= 2;
  const validHeight = () => height() !== "" && +height() >= 2;
  const sanitize = (str: string) => str.replace(/\D/g, "");

  createComputed(() => {
    if (mapState.tokens[selected()] !== undefined) {
      setWidth(`${mapState.tokens[selected()].width}`);
    }
  });

  createComputed(() => {
    if (mapState.tokens[selected()] !== undefined) {
      setHeight(`${mapState.tokens[selected()].height}`);
    }
  });

  createComputed(() => {
    if (validWidth()) {
      requestAnimationFrame(() =>
        setMapState("tokens", selected(), "width", +width())
      );
    }
  });

  createComputed(() => {
    if (validHeight()) {
      requestAnimationFrame(() =>
        setMapState("tokens", selected(), "height", +height())
      );
    }
  });

  return (
    <Stack class="obstacle-dimensions" direction="row" spacing={0.5}>
      <div class="label menu-item">
        <Typography variant="button">Width: </Typography>
      </div>
      <TextField
        size="small"
        error={!validWidth()}
        value={width()}
        helperText={validWidth() ? "" : "Invalid"}
        onChange={(_, value) => setWidth(sanitize(value))}
      />
      <div class="label menu-item">
        <Typography variant="button">Height: </Typography>
      </div>
      <TextField
        size="small"
        error={height() === ""}
        value={height()}
        helperText={validHeight() ? "" : "Invalid"}
        onChange={(_, value) => setHeight(sanitize(value))}
      />
    </Stack>
  );
}
