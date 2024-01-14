// @refresh reload
import "./app.scss";
import Body from "./components/Body";
import Menu from "./components/Menu";

export default function App() {
  return (
    <main class="app">
      <Menu />
      <Body />
    </main>
  );
}
