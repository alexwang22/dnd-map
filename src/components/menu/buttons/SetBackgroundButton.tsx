import { Button } from "@suid/material";
import { setMapState } from "../../State";
import "./SetBackgroundButton.scss";

export default function SetBackgroundButton() {
  const handleFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => {
      const file = input.files?.item(0);
      if (!file) {
        console.error("error selecting file");
        return;
      }
      if (!file.type.match("image/*")) {
        console.error("not an image");
        //TODO: show message to user
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = () => {
        if (!fr.result) {
          console.error("no result");
          return;
        }
        if (fr.result instanceof ArrayBuffer) {
          console.error("wrong result type");
          return;
        }
        const img = new Image();
        img.onload = () => {
          setMapState("background", {
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
        };
        img.src = fr.result;
        setMapState("background", {
          src: fr.result,
          x: 0,
          y: 0,
          scale: 100,
        });
        console.log("successfully set background");
      };
      fr.onerror = () => {
        console.error("error reading file");
      };
    };
    input.click();
  };

  return (
    <Button variant="contained" onClick={handleFile} class="background-button">
      Set
      <br />
      Background
    </Button>
  );
}
