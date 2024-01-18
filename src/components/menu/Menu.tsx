import { Divider, Stack } from "@suid/material";
import { Match, Switch, createEffect, createSignal } from "solid-js";
import BackgroundSection from "~/components/menu/BackgroundSection";
import CharacterSection from "~/components/menu/CharacterSection";
import GridSection from "~/components/menu/GridSection";
import UtilSection from "~/components/menu/UtilSection";
import "./Menu.scss";
import TokenTypeSelector, {
  tokenType,
} from "~/components/menu/selectors/TokenTypeSelector";
import ObjectSection from "~/components/menu/ObjectSection";

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
      <Stack direction="row" spacing={1}>
        <UtilSection />
        <Divider orientation="vertical" flexItem />
        <BackgroundSection />
        <Divider orientation="vertical" flexItem />
        <GridSection />
        <Divider orientation="vertical" flexItem />
        <TokenTypeSelector />
        <Switch>
          <Match when={tokenType() === "character"}>
            <CharacterSection />
          </Match>
          <Match when={tokenType() === "object"}>
            <ObjectSection />
          </Match>
        </Switch>
        <Divider orientation="vertical" flexItem />
      </Stack>
    </div>
  );
}
