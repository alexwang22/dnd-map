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
import { selected } from "~/components/token/Token";
import { ObstacleShapes } from "~/components/types/Shape";

export const [startMouse, setStartMouse] = createSignal<number[] | null>(null);

export default function ObstacleSection() {
  const createObstacle = (e: MouseEvent) => {
    if (!inToken(e.clientX, e.clientY)) {
      setStartMouse([
        e.clientX + body.scrollLeft,
        e.clientY + body.scrollTop - body.getBoundingClientRect().y,
      ]);
    }
  };

  const [movable, setMovable] = createSignal(true);
  createEffect(() => {
    setMovable(
      mapState.tokens[selected()] === undefined ||
        mapState.tokens[selected()].obstacleProps === undefined
        ? true
        : mapState.tokens[selected()].obstacleProps!.movable
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
                startIcon={movable() ? <CheckBox /> : <CheckBoxOutlineBlank />}
              >
                Movable
              </Button>
              <MoveTokenButton disabled={!movable()} />
            </Stack>
          </Stack>
        </Show>
      </Stack>
    </MenuSection>
  );
}
