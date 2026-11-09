import Phaser from "phaser";
import { BoardScene } from "./scenes/BoardScene";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: 960,
    height: 640,
  },
  scene: [BoardScene],
};

export default gameConfig;
