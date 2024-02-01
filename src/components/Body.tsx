import { For } from "solid-js";
import Grid from "~/components/Grid";
import SizeIndicator from "~/components/SizeIndicator";
import { mapState } from "~/components/State";
import { movingBg } from "~/components/menu/BackgroundSection";
import { setMenuChange } from "~/components/menu/Menu";
import Token, { selected, setSelected } from "~/components/token/Token";
import { handleDragStart } from "~/components/utils/Drag";
import "./Body.scss";

export let body: HTMLDivElement;

export default function Body() {
  const handleMouseDown = (e: MouseEvent) => {
    if (selected() !== "" && !inToken(e.clientX, e.clientY)) {
      setSelected("");
      setMenuChange((prev) => !prev);
    }
  };

  return (
    <div class="body" id="body" ref={body} onMouseDown={handleMouseDown}>
      <Grid />
      <img
        class="background"
        src={mapState.background.src}
        draggable={false}
        onMouseDown={(e) => {
          if (movingBg()) handleDragStart(e, "background");
        }}
        width={mapState.background.width * (mapState.background.scale / 100)}
        height={mapState.background.height * (mapState.background.scale / 100)}
        style={{
          left: `${mapState.background.x}px`,
          top: `${mapState.background.y}px`,
        }}
      />
      <For each={Object.values(mapState.tokens)}>
        {(token, _) => {
          return <Token {...token} />;
        }}
      </For>
      <SizeIndicator />
    </div>
  );
}

export const inToken = (mouseX: number, mouseY: number) => {
  mouseX += body.scrollLeft;
  mouseY += body.scrollTop;
  const bodyY = body.getBoundingClientRect().y;
  for (const token of Object.values(mapState.tokens)) {
    if (
      mouseX >= token.x &&
      mouseY >= token.y + bodyY &&
      mouseX <= token.x + token.width &&
      mouseY <= token.y + bodyY + token.height
    ) {
      return true;
    }
  }
  return false;
};
