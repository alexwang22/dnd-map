import CheckBox from "@suid/icons-material/CheckBox";
import CheckBoxOutlineBlank from "@suid/icons-material/CheckBoxOutlineBlank";
import { Button, Stack } from "@suid/material";
import { Show, createEffect, createSignal } from "solid-js";
import { body, inToken } from "~/components/Body";
import { mapState, setMapState } from "~/components/State";
import MenuSection from "~/components/menu/MenuSection";
import ObstacleDimensions from "~/components/menu/ObstacleDimensions";
import DeleteTokenButton from "~/components/menu/buttons/DeleteTokenButton";
import MoveTokenButton from "~/components/menu/buttons/MoveTokenButton";
import SetLabelButton from "~/components/menu/buttons/SetLabelButton";
import ColorSelector from "~/components/menu/selectors/ColorSelector";
import ShapeSelector from "~/components/menu/selectors/ShapeSelector";
import Token, { selected } from "~/components/token/Token";
import { ObstacleShapes } from "~/components/types/Shape";

export const [startMouse, setStartMouse] = createSignal<number[] | null>(null);

export default function ObstacleSection() {
  const createObstacle = (e: MouseEvent) => {
    if (!inToken(e.clientX, e.clientY)) {
      let mousePos = [
        e.clientX + body.scrollLeft,
        e.clientY + body.scrollTop - body.getBoundingClientRect().y,
      ];
      if (mapState.snapToGrid) {
        mousePos = [
          Math.round(mousePos[0] / mapState.gridSize) * mapState.gridSize,
          Math.round(mousePos[1] / mapState.gridSize) * mapState.gridSize,
        ];
      }
      setStartMouse(mousePos);
    }
  };

  const [obstacleProps, setObstacleProps] = createSignal<Token.ObstacleProps>({
    movable: true,
    border: false,
  });
  createEffect(() => {
    setObstacleProps(
      mapState.tokens[selected()] === undefined ||
        mapState.tokens[selected()].obstacleProps === undefined
        ? { movable: true, border: false }
        : {
            movable: mapState.tokens[selected()].obstacleProps!.movable,
            border: mapState.tokens[selected()].obstacleProps!.border,
          }
    );
  });

  return (
    <MenuSection
      label={
        selected().startsWith("obstacle") ? "Edit Obstacle" : "Add Obstacle"
      }
    >
      <Stack direction="row" spacing={1}>
        <Stack spacing={1}>
          <ShapeSelector
            type="obstacle"
            create={createObstacle}
            shapes={ObstacleShapes}
          />
          <ColorSelector />
        </Stack>

        {/* Edit */}
        <Show when={selected().startsWith("obstacle")}>
          <Stack spacing={0}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="text"
                size="small"
                onClick={() =>
                  setMapState(
                    "tokens",
                    selected(),
                    "obstacleProps",
                    "border",
                    (prev) => !prev
                  )
                }
                startIcon={
                  obstacleProps().border ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlank />
                  )
                }
              >
                Border
              </Button>
              <SetLabelButton />
              <DeleteTokenButton />
            </Stack>
            <ObstacleDimensions />
            <Stack direction="row" spacing={1}>
              <Button
                variant="text"
                size="small"
                onClick={() =>
                  setMapState(
                    "tokens",
                    selected(),
                    "obstacleProps",
                    "movable",
                    (prev) => !prev
                  )
                }
                startIcon={
                  obstacleProps().movable ? (
                    <CheckBox />
                  ) : (
                    <CheckBoxOutlineBlank />
                  )
                }
              >
                Movable
              </Button>
              <MoveTokenButton disabled={!obstacleProps()} />
            </Stack>
          </Stack>
        </Show>
      </Stack>
    </MenuSection>
  );
}
