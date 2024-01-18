import { Show, createEffect, createSignal } from "solid-js";
import { body } from "~/components/Body";
import { mapState } from "~/components/State";
import "./Grid.scss";

export const [updateGrid, setUpdateGrid] = createSignal(false);

export default function Grid() {
  const [dim, setDim] = createSignal([body.clientWidth, body.clientHeight]);
  createEffect(() => {
    updateGrid();
    let bottomRight = [
      mapState.background.x +
        (mapState.background.width * mapState.background.scale) / 100,
      mapState.background.y +
        (mapState.background.height * mapState.background.scale) / 100,
    ];
    for (const token of Object.values(mapState.tokens)) {
      bottomRight = [
        Math.max(token.x + token.width, bottomRight[0]),
        Math.max(token.y + token.height, bottomRight[1]),
      ];
    }
    bottomRight[0] += mapState.gridSize * 2;
    bottomRight[1] += mapState.gridSize * 2;
    let bodyWidth = body.clientWidth;
    let bodyHeight = body.clientHeight;
    if (bodyWidth === 0 || bodyHeight === 0) {
      bodyWidth = window.innerWidth;
      bodyHeight = window.innerHeight;
    }
    bottomRight = [
      Math.floor(Math.max(bodyWidth, bottomRight[0])),
      Math.floor(Math.max(bodyHeight, bottomRight[1])),
    ];
    setDim(bottomRight);
  });
  const resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(() => setUpdateGrid((prev) => !prev));
  });
  resizeObserver.observe(body);

  return (
    <Show when={mapState.showGrid}>
      <svg class="grid" width={dim()[0]} height={dim()[1]}>
        <defs>
          <pattern
            id="smallGrid"
            width={mapState.gridSize}
            height={mapState.gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${mapState.gridSize} 0 L 0 0 0 ${mapState.gridSize}`}
              fill="none"
              stroke="gray"
              stroke-width="0.5"
            />
          </pattern>
          <pattern
            id="grid"
            width={mapState.gridSize * 5}
            height={mapState.gridSize * 5}
            patternUnits="userSpaceOnUse"
          >
            <rect
              width={mapState.gridSize * 5}
              height={mapState.gridSize * 5}
              fill="url(#smallGrid)"
            />
            <path
              d={`M ${mapState.gridSize * 5} 0 L 0 0 0 ${
                mapState.gridSize * 5
              }`}
              fill="none"
              stroke="gray"
              stroke-width="1"
            />
          </pattern>
        </defs>
        <rect
          width={dim()[0]}
          height={dim()[1]}
          fill="url(#grid)"
          shape-rendering="crispEdges"
        />
      </svg>
    </Show>
  );
}
