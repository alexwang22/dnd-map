import { Divider, Stack } from "@suid/material";
import { createEffect, createSignal } from "solid-js";
import "./Menu.scss";
import UtilSection from "./UtilSection";
import BackgroundSection from "./BackgroundSection";
import GridSection from "./GridSection";
import MarkerSection from "./MarkerSection";

export const [menuChange, setMenuChange] = createSignal(false);

export default function Menu() {
  let menu: HTMLDivElement;
  const [scrollbarHeight, setScrollbarHeight] = createSignal(0);
  const [basePadding, setBasePadding] = createSignal(8);
  // Effect to handle changing padding when scrollbar appears
  createEffect(() => {
    menuChange();
    const scrollbarHeight = menu.offsetHeight - menu.clientHeight;
    if (basePadding() < scrollbarHeight + 4) {
      setBasePadding(scrollbarHeight + 4);
    }
    setScrollbarHeight(scrollbarHeight);
  });

  return (
    <div
      class="menu"
      ref={menu!}
      style={{
        "--scrollbar-height": `${scrollbarHeight()}px`,
        "--base-padding": `${basePadding()}px`,
      }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={1}
      >
        <UtilSection />
        <BackgroundSection />
        <GridSection />
        <MarkerSection />

        <div />
      </Stack>
    </div>
  );
}
