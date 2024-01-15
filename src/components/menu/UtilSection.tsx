import { Stack } from "@suid/material";
import SaveButton from "./buttons/SaveButton";
import LoadButton from "./buttons/LoadButton";
import MenuSection from "./MenuSection";

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
