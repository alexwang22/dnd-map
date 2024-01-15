import Save from "@suid/icons-material/Save";
import { Button } from "@suid/material";
import { mapState } from "../../State";

export default function SaveButton() {
  const handleSave = () => {
    const file = new Blob([JSON.stringify(mapState)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = mapState.name;
    document.body.appendChild(a);
    a.click();
    console.log("successfully saved");
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  };

  return (
    <div>
      <Button
        size="small"
        variant="text"
        onClick={handleSave}
        startIcon={<Save />}
      >
        Save
      </Button>
    </div>
  );
}
