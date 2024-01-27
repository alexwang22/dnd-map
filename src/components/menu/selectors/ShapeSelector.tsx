import { ToggleButton, ToggleButtonGroup } from "@suid/material";
import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { body } from "~/components/Body";
import { mapState, setMapState } from "~/components/State";
import Token, { selected, setSelected } from "~/components/token/Token";
import { movingBg } from "~/components/menu/BackgroundSection";
import { setMenuChange } from "~/components/menu/Menu";
import { Shape } from "~/components/types/Shape";
import "./ShapeSelector.scss";

export const [shape, setShape] = createStore<{
  [key in Token.Type]: Shape | null;
}>({
  character: null,
  object: null,
  obstacle: null,
});

declare namespace ShapeSelector {
  type Props = {
    type: Token.Type;
    create: (e: MouseEvent) => void;
    shapes: readonly Shape[];
  };
}

function ShapeSelector(props: ShapeSelector.Props) {
  const [creating, setCreating] = createSignal(false);

  createEffect(() => {
    if (selected() !== "") {
      requestAnimationFrame(() => {
        const token = mapState.tokens[selected()];
        if (token.type === props.type) {
          setShape(props.type, token.shape);
        } else {
          setShape(props.type, null);
        }
      });
    } else {
      if (creating()) {
        onCleanup(() => setCreating(false));
      } else {
        setShape(props.type, null);
      }
    }
  });

  createEffect(() => {
    if (movingBg()) {
      setShape({
        character: null,
        object: null,
        obstacle: null,
      });
    }
  });

  createEffect(() => {
    if (selected() === "" && shape[props.type]) {
      body.addEventListener("mousedown", props.create);
      onCleanup(() => body.removeEventListener("mousedown", props.create));
    }
  });

  return (
    <ToggleButtonGroup
      class="shape-selector"
      value={shape[props.type]}
      disabled={movingBg()}
      exclusive
      onChange={(_, newShape) => {
        if (
          selected() === "" ||
          mapState.tokens[selected()].type !== props.type
        ) {
          setShape(props.type, newShape);
          setCreating(true);
          setSelected("");
        } else {
          if (newShape) {
            setShape(props.type, newShape);
            setMapState("tokens", selected(), "shape", newShape);
          } else {
            setCreating(true);
            setSelected("");
            setMenuChange((prev) => !prev);
          }
        }
      }}
    >
      <For each={props.shapes}>
        {(shape, _) => {
          return (
            <ToggleButton value={shape}>
              <div class={`icon ${shape}`} />
            </ToggleButton>
          );
        }}
      </For>
    </ToggleButtonGroup>
  );
}

export default ShapeSelector;
