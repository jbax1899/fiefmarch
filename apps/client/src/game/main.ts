import { createMatch } from "@fiefmarch/game";
import testMap from "@fiefmarch/game/maps/test-1v1.json" with { type: "json" };
import Phaser from "phaser";
import gameConfig from "./config";
import { BoardScene } from "./scenes/BoardScene";

const snapshot = createMatch([{ id: "1" }, { id: "2" }], testMap);

export const game = new Phaser.Game({
  ...gameConfig,
  scene: [new BoardScene(snapshot)],
});
