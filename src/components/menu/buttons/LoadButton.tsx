import FileOpen from "@suid/icons-material/FileOpen";
import { Button } from "@suid/material";
import { setMapState } from "~/components/State";

export default function LoadButton() {
  const handleLoad = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = () => {
      const file = input.files?.item(0);
      if (!file) {
        console.error("error selecting file");
        return;
      }
      if (!file.type.match("application/json")) {
        console.error("not a json file");
        //TODO: show message to user
        return;
      }
      const fr = new FileReader();
      fr.readAsText(file);
      fr.onload = () => {
        if (!fr.result) {
          console.error("no result");
          return;
        }
        if (fr.result instanceof ArrayBuffer) {
          console.error("wrong result type");
          return;
        }
        setMapState(JSON.parse(fr.result));
        console.log("successfully loaded save");
      };
      fr.onerror = () => {
        console.error("error reading file");
      };
    };
    input.click();
  };

  return (
    <div>
      <Button
        size="small"
        variant="text"
        onClick={handleLoad}
        startIcon={<FileOpen />}
      >
        Load
      </Button>
    </div>
  );
}
