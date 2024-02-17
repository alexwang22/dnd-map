import { Drawer } from "@suid/material";
import { createSignal } from "solid-js";
import Menu from "~/components/menu/Menu";

export const [menuOpen, setMenuOpen] = createSignal(true);

export default function MenuDrawer() {
  return (
    <Drawer class="menu-drawer" variant="permanent" open={menuOpen()}>
      <Menu />
    </Drawer>
  );
}
