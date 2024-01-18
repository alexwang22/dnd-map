import { Delete } from "@suid/icons-material";
import { Button } from "@suid/material";
import { deleteToken, selected, setSelected } from "~/components/Token";
import { setMenuChange } from "~/components/menu/Menu";

export default function DeleteTokenButton() {
  return (
    <div>
      <Button
        variant="text"
        size="small"
        onClick={() => {
          deleteToken(selected());
          setSelected("");
          setMenuChange((prev) => !prev);
        }}
        startIcon={<Delete />}
      >
        Delete
      </Button>
    </div>
  );
}
