import { InputAdornment, Stack } from "@suid/material";
import { Show } from "solid-js";
import { body, inToken } from "~/components/Body";
import { mapState, setMapState } from "~/components/State";
import { createToken, selected } from "~/components/token/Token";
import MenuSection from "~/components/menu/MenuSection";
import SliderWithText from "~/components/menu/SliderWithText";
import DeleteTokenButton from "~/components/menu/buttons/DeleteTokenButton";
import MoveTokenButton from "~/components/menu/buttons/MoveTokenButton";
import SetLabelButton from "~/components/menu/buttons/SetLabelButton";
import ColorSelector, {
  color,
} from "~/components/menu/selectors/ColorSelector";
import IconSelector, { icon } from "~/components/menu/selectors/IconSelector";
import ShapeSelector, {
  shape,
} from "~/components/menu/selectors/ShapeSelector";
import { CharacterShapes } from "~/components/types/Shape";

export default function CharacterSection() {
  const createCharacter = (e: MouseEvent) => {
    if (!inToken(e.clientX, e.clientY)) {
      const bodyY = body.getBoundingClientRect().y;
      createToken(
        e.clientX + body.scrollLeft - mapState.gridSize / 2,
        e.clientY + body.scrollTop - bodyY - mapState.gridSize / 2,
        "character",
        shape.character!,
        color(),
        { icon: icon() }
      );
    }
  };

  return (
    <MenuSection
      label={
        selected().startsWith("character") ? "Edit Character" : "Add Character"
      }
    >
      <Stack direction="row" spacing={1} alignItems="stretch">
        <Stack spacing={1}>
          <ShapeSelector
            type="character"
            create={createCharacter}
            shapes={CharacterShapes}
          />
          <ColorSelector />
        </Stack>
        <IconSelector />

        {/* Edit */}
        <Show when={selected().startsWith("character")}>
          <Stack spacing={0}>
            <Stack direction="row" spacing={1}>
              <SetLabelButton />
              <DeleteTokenButton />
            </Stack>
            <SliderWithText
              min={8}
              max={100}
              value={
                mapState.tokens[selected()]
                  ? mapState.tokens[selected()].width
                  : 0
              }
              setValue={(value) => {
                setMapState("tokens", selected(), "width", value);
                setMapState("tokens", selected(), "height", value);
              }}
              endAdornment={{
                endAdornment: (
                  <InputAdornment position="end">px</InputAdornment>
                ),
              }}
            />
            <MoveTokenButton />
          </Stack>
        </Show>
      </Stack>
    </MenuSection>
  );
}
