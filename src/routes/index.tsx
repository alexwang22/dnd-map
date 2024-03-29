import Body from "~/components/Body";
import Menu from "~/components/menu/Menu";

import "./index.scss";

export default function Home() {
  return (
    <main class="home" onContextMenu={(e) => e.preventDefault()}>
      <Menu />
      <Body />
    </main>
  );
}
