import { JSX } from "solid-js";
import "./ToggleButtonGrid.scss";

declare namespace ToggleButtonGrid {
  type Props = {
    children: JSX.Element;
    columnCount: number;
  };
}

function ToggleButtonGrid(props: ToggleButtonGrid.Props) {
  return (
    <div
      class="toggle-button-grid"
      style={{ "--column-count": props.columnCount }}
    >
      {props.children}
    </div>
  );
}

export default ToggleButtonGrid;
