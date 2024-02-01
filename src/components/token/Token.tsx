import { Stack } from "@suid/material";
import c from "class-c";
import { createSignal } from "solid-js";
import { produce } from "solid-js/store";
import { mapState, setMapState } from "~/components/State";
import TokenCenter from "~/components/token/TokenCenter";
import TokenRight from "~/components/token/TokenRight";
import { Color } from "~/components/types/Color";
import { Icon } from "~/components/types/Icon";
import { Shape } from "~/components/types/Shape";
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
    obstacleProps?: ObstacleProps;
  };

  type ObstacleProps = {
    movable: boolean;
  };
}

export const [selected, setSelected] = createSignal("");

function Token(props: Token.Props) {
  return (
    <Stack
      class={`${c`
        token-stack 
        ${props.type} 
        ${{
          selected: props.id === selected(),
        }}
      `}`}
      direction="row"
      spacing={1}
      style={{
        left: `${props.x}px`,
        top: `${props.y}px`,
      }}
    >
      <TokenCenter {...props} />
      <TokenRight {...props} />
    </Stack>
  );
}

namespace Token {
  export const Types = ["character", "object", "obstacle"] as const;

  export type Type = (typeof Types)[number];
}

export function createToken(
  x: number,
  y: number,
  type: Token.Type,
  shape: Shape,
  color: Color,
  {
    icon = null as Icon | null,
    width = mapState.gridSize,
    height = mapState.gridSize,
    label = "",
    obstacleProps = undefined as Token.ObstacleProps | undefined,
  } = {}
) {
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
    obstacleProps: obstacleProps,
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
