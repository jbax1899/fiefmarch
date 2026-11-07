import Phaser from "phaser";
import { EmptyScene } from "./scenes/EmptyScene";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: 960,
    height: 640,
  },
  scene: [EmptyScene],
};

export default gameConfig;
