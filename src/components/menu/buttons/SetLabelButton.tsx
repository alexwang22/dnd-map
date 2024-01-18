import Label from "@suid/icons-material/Label";
import { Button, Popover, TextField } from "@suid/material";
import { createSignal, onMount } from "solid-js";
import { mapState, setMapState } from "~/components/State";
import { selected } from "~/components/Token";
import "./SetLabelButton.scss";

export default function SetLabelButton() {
  const [anchor, setAnchor] = createSignal<HTMLButtonElement | null>(null);
  const handleClick = (
    e: MouseEvent & { currentTarget: HTMLButtonElement }
  ) => {
    setAnchor(e.currentTarget);
  };
  const handleClose = () => setAnchor(null);
  const open = () => Boolean(anchor());

  return (
    <div id="set-label">
      <Button
        variant="text"
        size="small"
        onClick={handleClick}
        startIcon={<Label />}
      >
        Label
      </Button>
      <Popover
        class="label-popover"
        open={open()}
        anchorEl={anchor()}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            padding: "8px",
          },
        }}
      >
        {(() => {
          let ref: HTMLDivElement;
          onMount(() => ref.querySelector("input")!.focus());
          return (
            <TextField
              class="label-text"
              size="small"
              label="Label"
              ref={ref!}
              value={mapState.tokens[selected()].label}
              onChange={(_, newLabel) =>
                setMapState("tokens", selected(), "label", newLabel)
              }
            />
          );
        })()}
      </Popover>
    </div>
  );
}
