import Phaser from "phaser";
import { BoardScene } from "./scenes/BoardScene";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  scene: [BoardScene],
};

export default gameConfig;
