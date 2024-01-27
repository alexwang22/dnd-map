import East from "@suid/icons-material/East";
import North from "@suid/icons-material/North";
import NorthEast from "@suid/icons-material/NorthEast";
import NorthWest from "@suid/icons-material/NorthWest";
import South from "@suid/icons-material/South";
import SouthEast from "@suid/icons-material/SouthEast";
import SouthWest from "@suid/icons-material/SouthWest";
import West from "@suid/icons-material/West";
import ZoomOutMap from "@suid/icons-material/ZoomOutMap";
import { Button, Grid, IconButton, Popover, TextField } from "@suid/material";
import { createSignal, onMount } from "solid-js";
import { mapState, setMapState } from "~/components/State";
import { selected } from "~/components/token/Token";
import "./MoveTokenButton.scss";

export default function MoveTokenButton() {
  const [anchor, setAnchor] = createSignal<HTMLButtonElement | null>(null);
  const [value, setValue] = createSignal("");
  const sanitize = (str: string) => str.replace(/\D/g, "");
  const handleClick = (
    e: MouseEvent & { currentTarget: HTMLButtonElement }
  ) => {
    setAnchor(e.currentTarget);
    setValue("");
  };
  const handleClose = () => setAnchor(null);
  const open = () => Boolean(anchor());
  const handleMove = (dir: string) => {
    if (value() === "") return;
    const px = +value() * mapState.gridSize;
    switch (dir) {
      case "nw": {
        setMapState(
          "tokens",
          selected(),
          "x",
          (prev) => prev - px / Math.SQRT2
        );
        setMapState(
          "tokens",
          selected(),
          "y",
          (prev) => prev - px / Math.SQRT2
        );
        break;
      }
      case "n": {
        setMapState("tokens", selected(), "y", (prev) => prev - px);
        break;
      }
      case "ne": {
        setMapState(
          "tokens",
          selected(),
          "x",
          (prev) => prev + px / Math.SQRT2
        );
        setMapState(
          "tokens",
          selected(),
          "y",
          (prev) => prev - px / Math.SQRT2
        );
        break;
      }
      case "w": {
        setMapState("tokens", selected(), "x", (prev) => prev - px);
        break;
      }
      case "e": {
        setMapState("tokens", selected(), "x", (prev) => prev + px);
        break;
      }
      case "sw": {
        setMapState(
          "tokens",
          selected(),
          "x",
          (prev) => prev - px / Math.SQRT2
        );
        setMapState(
          "tokens",
          selected(),
          "y",
          (prev) => prev + px / Math.SQRT2
        );
        break;
      }
      case "s": {
        setMapState("tokens", selected(), "y", (prev) => prev + px);
        break;
      }
      case "se": {
        setMapState(
          "tokens",
          selected(),
          "x",
          (prev) => prev + px / Math.SQRT2
        );
        setMapState(
          "tokens",
          selected(),
          "y",
          (prev) => prev + px / Math.SQRT2
        );
        break;
      }
    }
  };

  return (
    <div>
      <Button
        variant="text"
        size="small"
        onClick={handleClick}
        startIcon={<ZoomOutMap />}
      >
        Move
      </Button>
      <Popover
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
            display: "flex",
          },
        }}
      >
        <Grid class="button-grid" container spacing={1}>
          <Grid xs={4}>
            <IconButton size="small" onClick={() => handleMove("nw")}>
              <NorthWest />
            </IconButton>
          </Grid>
          <Grid xs={4}>
            <IconButton size="small" onClick={() => handleMove("n")}>
              <North />
            </IconButton>
          </Grid>
          <Grid xs={4}>
            <IconButton size="small" onClick={() => handleMove("ne")}>
              <NorthEast />
            </IconButton>
          </Grid>
          <Grid xs={4}>
            <IconButton size="small" onClick={() => handleMove("w")}>
              <West />
            </IconButton>
          </Grid>
          <Grid xs={4}>
            {(() => {
              let ref: HTMLDivElement;
              onMount(() => ref.querySelector("input")!.focus());
              return (
                <TextField
                  size="small"
                  ref={ref!}
                  value={value()}
                  onChange={(_, newValue) => {
                    setValue(sanitize(newValue));
                  }}
                />
              );
            })()}
          </Grid>
          <Grid xs={4}>
            <IconButton size="small" onClick={() => handleMove("e")}>
              <East />
            </IconButton>
          </Grid>
          <Grid xs={4}>
            <IconButton size="small" onClick={() => handleMove("sw")}>
              <SouthWest />
            </IconButton>
          </Grid>
          <Grid xs={4}>
            <IconButton size="small" onClick={() => handleMove("s")}>
              <South />
            </IconButton>
          </Grid>
          <Grid xs={4}>
            <IconButton size="small" onClick={() => handleMove("se")}>
              <SouthEast />
            </IconButton>
          </Grid>
        </Grid>
      </Popover>
    </div>
  );
}
