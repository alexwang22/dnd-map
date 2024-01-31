import { Stack } from "@suid/material";
import { Show, createSignal } from "solid-js";
import { body, inToken } from "~/components/Body";
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
            <MoveTokenButton />
          </Stack>
        </Show>
      </Stack>
    </MenuSection>
  );
}
