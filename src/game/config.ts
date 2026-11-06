import Phaser from "phaser";
import { FiefmarchScene } from "./scenes/FiefmarchScene";

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  backgroundColor: "#111a18",
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: 960,
    height: 640,
  },
  scene: [FiefmarchScene],
  input: {
    activePointers: 1,
  },
  render: {
    antialias: true,
    roundPixels: true,
  },
};
