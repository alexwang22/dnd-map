import { Stack } from "@suid/material";
import MenuSection from "~/components/menu/MenuSection";
import LoadButton from "~/components/menu/buttons/LoadButton";
import SaveButton from "~/components/menu/buttons/SaveButton";

export default function UtilSection() {
  return (
    <MenuSection>
      <Stack spacing={1}>
        <SaveButton />
        <LoadButton />
      </Stack>
    </MenuSection>
  );
}
