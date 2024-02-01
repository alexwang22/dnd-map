import { Typography } from "@suid/material";
import Token from "~/components/token/Token";
import "./Token.scss";

export default function TokenRight(props: Token.Props) {
  return (
    <div class="label">
      <Typography variant="body1">{props.label}</Typography>
    </div>
  );
}
