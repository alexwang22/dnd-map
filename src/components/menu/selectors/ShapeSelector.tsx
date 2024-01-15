import { ToggleButton, ToggleButtonGroup } from "@suid/material";
import { For, createEffect, createSignal, onCleanup } from "solid-js";
import { createMarker } from "../../Marker";
import "./ShapeSelector.scss";
import { mapState, setMapState } from "../../State";
import { Shape } from "../../enums/Shape";
import { body, inMarker } from "../../Body";
import { setMenuChange } from "../Menu";

export const [shape, setShape] = createSignal<string | null>(null);

export default function ShapeSelector() {
  const create = (e: MouseEvent) => {
    if (!inMarker(e.clientX, e.clientY)) {
      const bodyY = body.getBoundingClientRect().y;
      createMarker(
        e.clientX + body.scrollLeft - mapState.gridSize / 2,
        e.clientY + body.scrollTop - bodyY - mapState.gridSize / 2
      );
    }
  };

  createEffect(() => {
    if (mapState.selected === -1 && shape()) {
      body.addEventListener("mousedown", create);
      onCleanup(() => body.removeEventListener("mousedown", create));
    }
  });

  return (
    <ToggleButtonGroup
      id="shape-selector"
      value={shape()}
      exclusive
      onChange={(_, newShape) => {
        if (mapState.selected === -1) {
          setShape(newShape);
        } else {
          if (newShape) {
            setShape(newShape);
            setMapState("markers", mapState.selected, "shape", newShape);
          } else {
            setMapState("selected", -1);
            setMenuChange((prev) => !prev);
          }
        }
      }}
    >
      <For each={Object.values(Shape)}>
        {(shape, _) => {
          return (
            <ToggleButton value={shape}>
              <div id="icon" class={shape} />
            </ToggleButton>
          );
        }}
      </For>
    </ToggleButtonGroup>
  );
}
