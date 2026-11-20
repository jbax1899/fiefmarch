import Phaser from "phaser";

const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game-container",
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
};

export default gameConfig;
