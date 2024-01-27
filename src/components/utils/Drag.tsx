import { createEffect, createSignal, onCleanup } from "solid-js";
import { body } from "~/components/Body";
import { mapState, setMapState } from "~/components/State";

const [origPos, setOrigPos] = createSignal([0, 0]);
const [origMousePos, setOrigMousePos] = createSignal([0, 0]);
const [id, setId] = createSignal("");

createEffect(() => {
  if (id() !== "") {
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleDragEnd);
    onCleanup(() => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
    });
  }
});

export const handleDragStart = (e: MouseEvent, id: string) => {
  const getPos =
    id === "background"
      ? () => [mapState.background.x, mapState.background.y]
      : () => [mapState.tokens[id].x, mapState.tokens[id].y];
  setId(id);
  setOrigPos(getPos());
  setOrigMousePos([e.clientX + body.scrollLeft, e.clientY + body.scrollTop]);
};

const handleDrag = (e: MouseEvent) => {
  const setPos =
    id() === "background"
      ? (x: number, y: number) => setMapState("background", { x: x, y: y })
      : (x: number, y: number) => setMapState("tokens", id(), { x: x, y: y });
  const dx = e.clientX + body.scrollLeft - origMousePos()[0],
    dy = e.clientY + body.scrollTop - origMousePos()[1];
  setPos(origPos()[0] + dx, origPos()[1] + dy);
};

const handleDragEnd = () => setId("");
