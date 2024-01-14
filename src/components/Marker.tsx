import { Dynamic, Show } from "solid-js/web";
import { color, setColor } from "./ColorSelector";
import { handleDragStart } from "./Drag";
import { icon, setIcon } from "./IconSelector";
import "./Marker.scss";
import { setShape, shape } from "./ShapeSelector";
import { mapState, setMapState } from "./State";
import { Icon, getIcon } from "./enums/Icon";
import { colorToRgb, rgbToHighContrast } from "./enums/Color";
import { movingBg, setMenuChange } from "./Menu";
import { produce } from "solid-js/store";
import { Stack, Typography } from "@suid/material";

declare namespace Marker {
  type Props = {
    id: number;
    x: number;
    y: number;
    color: string;
    shape: string;
    icon: Icon | null;
    size: number;
    label: string;
  };
}

function Marker(props: Marker.Props) {
  return (
    <Stack
      class="marker-stack"
      direction="row"
      spacing={1}
      style={{
        left: `${props.x}px`,
        top: `${props.y}px`,
      }}
    >
      <div
        id="marker"
        class={`${props.shape}${props.id === mapState.selected ? " selected" : ""}`}
        style={{
          "background-color": props.color,
          width: `${props.size - 2}px`,
          height: `${props.size - 2}px`,
          "outline-offset": `${props.size * 0.1}px`,
        }}
        draggable={false}
        onMouseDown={(e: MouseEvent) => {
          if (!movingBg()) {
            setMapState("selected", props.id);
            setShape(props.shape);
            setColor(props.color);
            setIcon(props.icon);
            setMenuChange((prev) => !prev);
            handleDragStart(e, props.id);
            e.stopPropagation();
          }
        }}
      >
        <Show when={props.icon !== null}>
          <Dynamic
            class="icon"
            style={{
              width: `${props.size * 0.7}px`,
              height: `${props.size * 0.7}px`,
              color: rgbToHighContrast(colorToRgb(props.color)),
            }}
            component={getIcon(props.icon!)}
          />
        </Show>
      </div>
      <div class="label">
        <Typography variant="body1">{props.label}</Typography>
      </div>
    </Stack>
  );
}

export function createMarker(x: number, y: number) {
  setMapState("markers", mapState.nextId, {
    id: mapState.nextId,
    x: x,
    y: y,
    color: color(),
    shape: shape()!,
    icon: icon(),
    size: mapState.gridSize,
    label: "",
  });
  setMapState("nextId", (id) => ++id);
}

export function deleteMarker(id: number) {
  setMapState(
    produce((s) => {
      delete s.markers[id];
    }),
  );
}

export default Marker;
