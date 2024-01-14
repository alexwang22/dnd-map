import { Button, Stack, TextField } from "@suid/material";
import { Show, createComputed, createSignal, mergeProps } from "solid-js";
import "./SliderWithText.scss";

declare namespace SliderWithText {
  type Props = {
    min: number;
    max: number;
    value: number;
    interval?: number;
    default?: number;
    endAdornment?: object;
    setValue(value: number): void;
  };
}

function SliderWithText(props_: SliderWithText.Props) {
  const props = mergeProps({ interval: 1 }, props_);
  const [value, setValue] = createSignal(`${props.value}`);
  const valid = () =>
    value() !== "" &&
    +value() >= props.min &&
    +value() <= props.max &&
    +value() % props.interval === props.min % props.interval;
  const sanitize = (str: string) => str.replace(/\D/g, "");

  createComputed(() => {
    setValue(`${props.value}`);
  });

  createComputed(() => {
    if (valid()) {
      props.setValue(+value());
    }
  });

  return (
    <Stack class="slider-with-text" direction="row" spacing={0}>
      <input
        type="range"
        min={props.min}
        max={props.max}
        value={value()}
        step={props.interval}
        onInput={(e) => setValue(e.currentTarget.value)}
      />
      <TextField
        size="small"
        error={!valid()}
        value={value()}
        helperText={valid() ? "" : "Invalid"}
        onChange={(_, value) => setValue(sanitize(value))}
        onBlur={() => setValue(`${props.value}`)}
        InputProps={props.endAdornment}
      />
      <Show when={props.default}>
        <Button
          size="small"
          onClick={() => {
            if (props.default) setValue(`${props.default}`);
          }}
        >
          Reset
        </Button>
      </Show>
    </Stack>
  );
}

export default SliderWithText;
