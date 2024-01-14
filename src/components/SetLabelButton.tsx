import Label from "@suid/icons-material/Label";
import { Button, Popover, TextField } from "@suid/material";
import { mapState, setMapState } from "./State";
import { createSignal, onMount } from "solid-js";
import "./SetLabelButton.scss";

export default function SetLabelButton() {
  const [anchor, setAnchor] = createSignal<HTMLButtonElement | null>(null);
  const handleClick = (
    e: MouseEvent & { currentTarget: HTMLButtonElement },
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
              value={mapState.markers[mapState.selected].label}
              onChange={(_, newLabel) =>
                setMapState("markers", mapState.selected, "label", newLabel)
              }
            />
          );
        })()}
      </Popover>
    </div>
  );
}
