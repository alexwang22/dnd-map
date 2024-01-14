import { createStore } from "solid-js/store";
import Marker from "./Marker";

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
  nextId: 1,
  markers: {} as Record<number, Marker.Props>,
  selected: -1,
  listOrder: [] as number[],
  presentMode: false,
});
