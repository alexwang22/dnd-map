import { createEffect, createSignal, onCleanup } from "solid-js";
import { mapState, setMapState } from "./State";
import { body } from "./Body";

const [origPos, setOrigPos] = createSignal([0, 0]);
const [origMousePos, setOrigMousePos] = createSignal([0, 0]);
const [id, setId] = createSignal(-1);

createEffect(() => {
  if (id() !== -1) {
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleDragEnd);
    onCleanup(() => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
    });
  }
});

export const handleDragStart = (e: MouseEvent, id: number) => {
  const getPos =
    id === 0
      ? () => [mapState.background.x, mapState.background.y]
      : () => [mapState.markers[id].x, mapState.markers[id].y];
  setId(id);
  setOrigPos(getPos());
  setOrigMousePos([e.clientX + body.scrollLeft, e.clientY + body.scrollTop]);
};
const handleDrag = (e: MouseEvent) => {
  const setPos =
    id() === 0
      ? (x: number, y: number) => setMapState("background", { x: x, y: y })
      : (x: number, y: number) => setMapState("markers", id(), { x: x, y: y });
  const dx = e.clientX + body.scrollLeft - origMousePos()[0];
  const dy = e.clientY + body.scrollTop - origMousePos()[1];
  setPos(origPos()[0] + dx, origPos()[1] + dy);
};

const handleDragEnd = () => setId(-1);
