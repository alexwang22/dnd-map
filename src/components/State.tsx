import { createStore } from "solid-js/store";
import Token from "./Token";

export const [mapState, setMapState] = createStore({
  name: "Untitled",
  background: {
    src: "",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scale: 100,
  },
  gridSize: 32,
  showGrid: true,
  snapToGrid: false,
  nextId: {
    character: 1,
    object: 1,
    obstacle: 1,
  },
  tokens: {} as Record<string, Token.Props>,
  initiativeOrder: [] as string[],
  presentMode: false,
});
