import "./style.css";
import { game } from "./game/main";

const shutdown = (): void => game.destroy(true);
const handlePageHide = (event: PageTransitionEvent): void => {
  if (!event.persisted) {
    shutdown();
  }
};

window.addEventListener("pagehide", handlePageHide);

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    window.removeEventListener("pagehide", handlePageHide);
    shutdown();
  });
}
