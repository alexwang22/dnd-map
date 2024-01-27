import { Match, Show, Switch } from "solid-js";
import { Dynamic } from "solid-js/web";
import { movingBg } from "~/components/menu/BackgroundSection";
import { setMenuChange } from "~/components/menu/Menu";
import Token, { selected, setSelected } from "~/components/token/Token";
import { colorToRgb, rgbToHighContrast } from "~/components/types/Color";
import { getIcon } from "~/components/types/Icon";
import { handleDragStart } from "~/components/utils/Drag";
import "./Token.scss";

export default function TokenCenter(props: Token.Props) {
  const handleMouseDown = (e: MouseEvent) => {
    if (!movingBg()) {
      setSelected(props.id);
      setMenuChange((prev) => !prev);
      handleDragStart(e, props.id);
      e.stopPropagation();
    }
  };

  return (
    <Switch>
      <Match when={props.type === "character"}>
        <div
          classList={{ selected: props.id === selected() }}
          class={`token ${props.shape}`}
          style={{
            "background-color": props.color,
            width: `${props.width - 2}px`,
            height: `${props.height - 2}px`,
            "outline-offset": `${Math.min(
              Math.max(Math.min(props.width, props.height) * 0.1, 2),
              8
            )}px`,
          }}
          draggable={false}
          onMouseDown={handleMouseDown}
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
      </Match>
      <Match when={props.type === "object"}>
        <div
          classList={{ selected: props.id === selected() }}
          class={`token ${props.shape}`}
          style={{
            "background-color": props.color,
            width: `${props.width - 2}px`,
            height: `${props.height - 2}px`,
            "outline-offset": `${Math.min(
              Math.max(Math.min(props.width, props.height) * 0.1, 2),
              8
            )}px`,
          }}
          draggable={false}
          onMouseDown={handleMouseDown}
        />
      </Match>
      <Match when={props.type === "obstacle"}>
        <div
          classList={{ selected: props.id === selected() }}
          class={`token ${props.shape}`}
          style={{
            "background-color": props.color,
            width: `${props.width - 2}px`,
            height: `${props.height - 2}px`,
            "outline-offset": `${Math.min(
              Math.max(Math.min(props.width, props.height) * 0.1, 2),
              8
            )}px`,
          }}
          draggable={false}
          onMouseDown={handleMouseDown}
        ></div>
      </Match>
    </Switch>
  );
}
