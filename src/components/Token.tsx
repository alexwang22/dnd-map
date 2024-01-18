import { Stack, Typography } from "@suid/material";
import { Show, createSignal } from "solid-js";
import { produce } from "solid-js/store";
import { Dynamic } from "solid-js/web";
import { handleDragStart } from "~/components/Drag";
import { mapState, setMapState } from "~/components/State";
import { Color, colorToRgb, rgbToHighContrast } from "~/components/types/Color";
import { Icon, getIcon } from "~/components/types/Icon";
import { Shape } from "~/components/types/Shape";
import { movingBg } from "~/components/menu/BackgroundSection";
import { setMenuChange } from "~/components/menu/Menu";
import "./Token.scss";

declare namespace Token {
  type Props = {
    id: string;
    type: Type;
    x: number;
    y: number;
    color: Color;
    shape: Shape;
    icon: Icon | null;
    width: number;
    height: number;
    label: string;
  };
  type Type = "character" | "object" | "obstacle";
}

export const [selected, setSelected] = createSignal("");

function Token(props: Token.Props) {
  return (
    <Stack
      class={`token-stack${props.id === selected() ? " selected" : ""}`}
      direction="row"
      spacing={1}
      style={{
        left: `${props.x}px`,
        top: `${props.y}px`,
      }}
    >
      <div
        id="token"
        class={`${props.shape}${props.id === selected() ? " selected" : ""}`}
        style={{
          "background-color": props.color,
          width: `${props.width - 2}px`,
          height: `${props.height - 2}px`,
          "outline-offset": `${Math.min(props.width, props.height) * 0.1}px`,
        }}
        draggable={false}
        onMouseDown={(e: MouseEvent) => {
          if (!movingBg()) {
            setSelected(props.id);
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
              width: `${props.width * 0.7}px`,
              height: `${props.height * 0.7}px`,
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

export function createToken(
  x: number,
  y: number,
  type: Token.Type,
  shape: Shape,
  color: Color,
  icon?: Icon | null,
  width = mapState.gridSize,
  height = mapState.gridSize,
  label = ""
) {
  if (icon === undefined) icon = null;
  const id = `${type}-${mapState.nextId[type]}`;
  if (type === "character") {
    setMapState(
      produce((s) => {
        s.initiativeOrder.push(id);
      })
    );
  }
  setMapState("tokens", id, {
    id: id,
    type: type,
    x: x,
    y: y,
    shape: shape,
    color: color,
    icon: icon,
    width: width,
    height: height,
    label: label,
  });
  setMapState("nextId", type, (id) => ++id);
}

export function deleteToken(id: string) {
  setMapState(
    produce((s) => {
      delete s.tokens[id];
      if (id.startsWith("character")) {
        s.initiativeOrder.splice(s.initiativeOrder.indexOf(id), 1);
      }
    })
  );
}

export default Token;
