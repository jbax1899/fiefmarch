import "./style.css";
import { game } from "./game/main";

const shutdown = (): void => game.destroy(true);

window.addEventListener("pagehide", shutdown, { once: true });

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    window.removeEventListener("pagehide", shutdown);
    shutdown();
  });
}
