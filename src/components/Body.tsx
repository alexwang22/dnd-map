import { Index } from "solid-js";
import { handleDragStart } from "~/components/Drag";
import Grid from "~/components/Grid";
import { mapState } from "~/components/State";
import Token, { selected, setSelected } from "~/components/Token";
import { movingBg } from "~/components/menu/BackgroundSection";
import { setMenuChange } from "~/components/menu/Menu";
import { setIcon } from "~/components/menu/selectors/IconSelector";
import { setShape } from "~/components/menu/selectors/ShapeSelector";
import "./Body.scss";

export let body: HTMLDivElement;

export default function Body() {
  const handleMouseDown = (e: MouseEvent) => {
    if (selected() !== "" && !inToken(e.clientX, e.clientY)) {
      setShape(mapState.tokens[selected()].type, null);
      setSelected("");
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
          if (movingBg()) handleDragStart(e, "background");
        }}
        width={mapState.background.width * (mapState.background.scale / 100)}
        height={mapState.background.height * (mapState.background.scale / 100)}
        style={{
          left: `${mapState.background.x}px`,
          top: `${mapState.background.y}px`,
        }}
      />
      <Index each={Object.values(mapState.tokens)}>
        {(token, _) => {
          return <Token {...token()} />;
        }}
      </Index>
    </div>
  );
}

export const inToken = (mouseX: number, mouseY: number) => {
  mouseX += body.scrollLeft;
  mouseY += body.scrollTop;
  const bodyY = body.getBoundingClientRect().y;
  for (const token of Object.values(mapState.tokens)) {
    if (
      !(
        mouseX < token.x ||
        mouseY < token.y + bodyY ||
        mouseX > token.x + token.width ||
        mouseY > token.y + bodyY + token.height
      )
    ) {
      return true;
    }
  }
  return false;
};
