import CheckBox from "@suid/icons-material/CheckBox";
import CheckBoxOutlineBlank from "@suid/icons-material/CheckBoxOutlineBlank";
import Delete from "@suid/icons-material/Delete";
import OpenWith from "@suid/icons-material/OpenWith";
import {
  Button,
  Divider,
  InputAdornment,
  Stack,
  Typography,
} from "@suid/material";
import { Show, createEffect, createSignal } from "solid-js";
import ColorSelector from "./ColorSelector";
import IconSelector, { setIcon } from "./IconSelector";
import { deleteMarker } from "./Marker";
import "./Menu.scss";
import MoveMarkerButton from "./MoveMarkerButton";
import SetBackgroundButton from "./SetBackgroundButton";
import SetLabelButton from "./SetLabelButton";
import ShapeSelector, { setShape } from "./ShapeSelector";
import SliderWithText from "./SliderWithText";
import { mapState, setMapState } from "./State";
import SaveButton from "./SaveButton";
import LoadButton from "./LoadButton";

export const [movingBg, setMovingBg] = createSignal(false);
export const [menuChange, setMenuChange] = createSignal(false);

export default function Menu() {
  let menu: HTMLDivElement;
  const [scrollbarHeight, setScrollbarHeight] = createSignal(0);
  const [basePadding, setBasePadding] = createSignal(8);
  // Effect to handle changing padding when scrollbar appears
  createEffect(() => {
    menuChange();
    const scrollbarHeight = menu.offsetHeight - menu.clientHeight;
    if (basePadding() < scrollbarHeight + 4)
      setBasePadding(scrollbarHeight + 4);
    setScrollbarHeight(scrollbarHeight);
  });

  return (
    <div
      class="menu"
      ref={menu!}
      style={{
        "--scrollbar-height": `${scrollbarHeight()}px`,
        "--base-padding": `${basePadding()}px`,
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
      >
        {/* Section 0: Util */}
        <Stack spacing={1}>
          <SaveButton />
          <LoadButton />
        </Stack>

        {/* Section 1: Background Settings */}
        <Stack>
          <Stack direction="row" spacing={2}>
            <div>
              <SetBackgroundButton />
            </div>
            <Stack spacing={2}>
              <Button
                variant={movingBg() ? "contained" : "outlined"}
                onClick={() => {
                  setMovingBg((prev) => !prev);
                  setMapState("selected", -1);
                  setShape(null);
                  setIcon(null);
                }}
                startIcon={<OpenWith />}
              >
                Move Background
              </Button>
              <SliderWithText
                min={1}
                max={1000}
                default={100}
                value={mapState.background.scale}
                setValue={(value) => setMapState("background", "scale", value)}
                endAdornment={{
                  endAdornment: (
                    <InputAdornment position="end">%</InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Stack>
          <div class="label">
            <Typography align="center" variant="button">
              Background
            </Typography>
          </div>
        </Stack>

        {/* Section 2: Grid Settings */}
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Button
              variant="text"
              onClick={() => setMapState("showGrid", (prev) => !prev)}
              startIcon={
                mapState.showGrid ? <CheckBox /> : <CheckBoxOutlineBlank />
              }
            >
              Show Grid
            </Button>
            <Button
              disabled
              variant="text"
              onClick={() => setMapState("snapToGrid", (prev) => !prev)}
              startIcon={
                mapState.snapToGrid ? <CheckBox /> : <CheckBoxOutlineBlank />
              }
            >
              Snap to Grid
            </Button>
          </Stack>
          <SliderWithText
            min={8}
            max={100}
            default={32}
            interval={4}
            value={mapState.gridSize}
            setValue={(value) => setMapState("gridSize", value)}
            endAdornment={{
              endAdornment: <InputAdornment position="end">px</InputAdornment>,
            }}
          />
          <div class="label">
            <Typography align="center" variant="button">
              Grid
            </Typography>
          </div>
        </Stack>

        {/* Section 3: Marker Settings */}
        <Stack class="marker-section">
          <Stack direction="row" spacing={1} alignItems="stretch">
            <Stack spacing={1}>
              <ShapeSelector />
              <ColorSelector />
            </Stack>
            <IconSelector />

            {/* Edit */}
            <Show when={mapState.selected !== -1}>
              <Stack spacing={0}>
                <Stack direction="row" spacing={1}>
                  <SetLabelButton />
                  <div>
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => {
                        deleteMarker(mapState.selected);
                        setMapState("selected", -1);
                        setShape(null);
                        setIcon(null);
                        setMenuChange((prev) => !prev);
                      }}
                      startIcon={<Delete />}
                    >
                      Delete
                    </Button>
                  </div>
                </Stack>
                <SliderWithText
                  min={8}
                  max={100}
                  value={
                    mapState.markers[mapState.selected]
                      ? mapState.markers[mapState.selected].size
                      : 0
                  }
                  setValue={(value) =>
                    setMapState("markers", mapState.selected, "size", value)
                  }
                  endAdornment={{
                    endAdornment: (
                      <InputAdornment position="end">px</InputAdornment>
                    ),
                  }}
                />
                <MoveMarkerButton />
              </Stack>
            </Show>
          </Stack>
          <div class="label">
            <Typography align="center" variant="button">
              {mapState.selected === -1 ? "Create Marker" : "Edit Marker"}
            </Typography>
          </div>
        </Stack>
        <div />
      </Stack>
    </div>
  );
}
