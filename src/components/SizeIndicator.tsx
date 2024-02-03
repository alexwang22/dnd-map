import { Typography } from "@suid/material";
import { Show, createEffect, createSignal, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import { body } from "~/components/Body";
import { mapState } from "~/components/State";
import { setStartMouse, startMouse } from "~/components/menu/ObstacleSection";
import { color } from "~/components/menu/selectors/ColorSelector";
import { shape } from "~/components/menu/selectors/ShapeSelector";
import { createToken } from "~/components/token/Token";
import "./SizeIndicator.scss";

export default function SizeIndicator() {
  let numbers: HTMLDivElement;
  const [mouse, setMouse] = createSignal<number[]>([0, 0]);
  const [pos, setPos] = createStore<number[]>([0, 0]);

  const handleMouseMove = (e: MouseEvent) => {
    const mousePos = [
      e.clientX + body.scrollLeft,
      e.clientY + body.scrollTop - body.getBoundingClientRect().y,
    ];

    if (mousePos[0] < startMouse()![0]) {
      if (mapState.snapToGrid) {
        if (startMouse()![0] - mousePos[0] < mapState.gridSize) {
          mousePos[0] =
            Math.floor(mousePos[0] / mapState.gridSize) * mapState.gridSize;
        } else {
          mousePos[0] =
            Math.round(mousePos[0] / mapState.gridSize) * mapState.gridSize;
        }
      }
      setPos(0, mousePos[0]);
    } else {
      if (mapState.snapToGrid) {
        if (mousePos[0] - startMouse()![0] < mapState.gridSize) {
          mousePos[0] =
            Math.ceil(mousePos[0] / mapState.gridSize) * mapState.gridSize;
        } else {
          mousePos[0] =
            Math.round(mousePos[0] / mapState.gridSize) * mapState.gridSize;
        }
      }
      setPos(0, startMouse()![0]);
    }

    if (mousePos[1] < startMouse()![1]) {
      if (mapState.snapToGrid) {
        if (startMouse()![1] - mousePos[1] < mapState.gridSize) {
          mousePos[1] =
            Math.floor(mousePos[1] / mapState.gridSize) * mapState.gridSize;
        } else {
          mousePos[1] =
            Math.round(mousePos[1] / mapState.gridSize) * mapState.gridSize;
        }
      }
      setPos(1, mousePos[1]);
    } else {
      if (mapState.snapToGrid) {
        if (mousePos[1] - startMouse()![1] < mapState.gridSize) {
          mousePos[1] =
            Math.ceil(mousePos[1] / mapState.gridSize) * mapState.gridSize;
        } else {
          mousePos[1] =
            Math.round(mousePos[1] / mapState.gridSize) * mapState.gridSize;
        }
      }
      setPos(1, startMouse()![1]);
    }

    setMouse(mousePos);
  };

  const handleMouseUp = () => {
    const width = Math.abs(mouse()[0] - startMouse()![0]),
      height = Math.abs(mouse()[1] - startMouse()![1]);
    setStartMouse(null);
    if (width < 4 && height < 4) return;
    createToken(pos[0], pos[1], "obstacle", shape.obstacle!, color(), {
      width: width,
      height: height,
      obstacleProps: { movable: true },
    });
  };

  createEffect(() => {
    if (startMouse() !== null) {
      setMouse(startMouse()!);
      setPos(startMouse()!);
      body.addEventListener("mousemove", handleMouseMove);
      body.addEventListener("mouseup", handleMouseUp);
      onCleanup(() => {
        body.removeEventListener("mousemove", handleMouseMove);
        body.removeEventListener("mouseup", handleMouseUp);
      });
    }
  });

  return (
    <Show when={startMouse() !== null}>
      <div class="size-indicator">
        <div
          class="dashed-box"
          style={{
            left: `${pos[0]}px`,
            top: `${pos[1]}px`,
            width: `${Math.max(
              Math.abs(mouse()[0] - startMouse()![0]) - 2,
              0
            )}px`,
            height: `${Math.max(
              Math.abs(mouse()[1] - startMouse()![1]) - 2,
              0
            )}px`,
          }}
          draggable={false}
        />
        <div
          class="numbers"
          ref={numbers!}
          style={{
            left: `${
              mouse()[0] > startMouse()![0]
                ? mouse()[0]
                : mouse()[0] - numbers!.clientWidth
            }px`,
            top: `${mouse()[1] - numbers!.clientHeight}px`,
          }}
        >
          <Typography variant="body1">
            {`${Math.abs(mouse()[0] - startMouse()![0])} x
              ${Math.abs(mouse()[1] - startMouse()![1])}`}
          </Typography>
        </div>
      </div>
    </Show>
  );
}
