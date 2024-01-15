import { Index, createEffect, onCleanup } from "solid-js";
import "./Body.scss";
import { handleDragStart } from "./Drag";
import Grid from "./Grid";
import Marker from "./Marker";
import { setMenuChange } from "./menu/Menu";
import { movingBg } from "./menu/BackgroundSection";
import { mapState, setMapState } from "./State";
import { setShape } from "./menu/selectors/ShapeSelector";
import { setIcon } from "./menu/selectors/IconSelector";

export let body: HTMLDivElement;

export default function Body() {
  const handleMouseDown = (e: MouseEvent) => {
    if (mapState.selected !== -1 && !inMarker(e.clientX, e.clientY)) {
      setMapState("selected", -1);
      setShape(null);
      setIcon(null);
      setMenuChange((prev) => !prev);
    }
  };

  return (
    <div
      class="body"
      id="body"
      ref={body}
      onMouseDown={(e) => handleMouseDown(e)}
    >
      <Grid />
      <img
        class="background"
        src={mapState.background.src}
        draggable={false}
        onMouseDown={(e) => {
          if (movingBg()) handleDragStart(e, 0);
        }}
        width={(mapState.background.width * mapState.background.scale) / 100}
        height={(mapState.background.height * mapState.background.scale) / 100}
        style={{
          left: `${mapState.background.x}px`,
          top: `${mapState.background.y}px`,
        }}
      />
      <Index each={Object.values(mapState.markers)}>
        {(marker, _) => {
          return <Marker {...marker()} />;
        }}
      </Index>
    </div>
  );
}

export const inMarker = (mouseX: number, mouseY: number) => {
  mouseX += body.scrollLeft;
  mouseY += body.scrollTop;
  const bodyY = body.getBoundingClientRect().y;
  for (const marker of Object.values(mapState.markers)) {
    if (
      !(
        mouseX < marker.x ||
        mouseY < marker.y + bodyY ||
        mouseX > marker.x + marker.size ||
        mouseY > marker.y + bodyY + marker.size
      )
    ) {
      return true;
    }
  }
  return false;
};
