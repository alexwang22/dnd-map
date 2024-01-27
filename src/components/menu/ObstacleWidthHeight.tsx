import { Typography, TextField, Stack } from "@suid/material";
import { mapState } from "~/components/State";
import { selected } from "~/components/token/Token";

export default function ObstacleWidthHeight() {
  return (
    <Stack direction="row" spacing={0.5}>
      <div class="label menu-item">
        <Typography variant="button">Width: </Typography>
      </div>
      <TextField size="small" />
      <div class="label menu-item">
        <Typography variant="button">Height: </Typography>
      </div>
      <TextField size="small" />
    </Stack>
  );
}
