import Phaser from "phaser";
import mapJson from "@fiefmarch/game/maps/test-1v1.json" with { type: "json" };
import { fitBoard } from "../camera/fitBoard";
import { zoom } from "../camera/zoom";
import { mousePan } from "../camera/mousePan";

export class BoardScene extends Phaser.Scene {
  constructor() {
    super("BoardScene");
  }
  create() {
    const tileSize: number = 64; //px
    const map = mapJson.terrain;
    let scenePointer: Phaser.Input.Pointer = this.input.activePointer;

    const fitBoardToCamera = () => {
      fitBoard(
        this.cameras.main,
        this.scale.width,
        this.scale.height,
        map[0].length * tileSize,
        map.length * tileSize,
        20,
      );
    };

    fitBoardToCamera();

    this.scale.on("resize", fitBoardToCamera);

    this.events.once("shutdown", () => {
      this.scale.off("resize", fitBoardToCamera);
    });

    const zoomSpeed: number = 0.1;
    this.input.on(
      "wheel",
      (pointer: Phaser.Input.Pointer, _gameObjects: any[], _deltaX: number, deltaY: number) => {
        const zoomFactor: number = deltaY > 0 ? 1 - zoomSpeed : 1 + zoomSpeed;
        zoom(this.cameras.main, pointer.x, pointer.y, zoomFactor);
      },
    );

    let isPanning: boolean = false;
    const scrollSpeed = 0.15;
    let panTween: Phaser.Tweens.Tween | undefined;
    const releasePanningDelay = 300;
    const decayRate = 0.95;
    const glideDistanceFactor = (1 - decayRate ** (releasePanningDelay / 16)) / (1 - decayRate);

    this.input.on("pointerdown", () => {
      panTween?.stop();
      isPanning = true;
    });

    this.input.on("pointermove", () => {
      if (isPanning)
        mousePan(
          new Phaser.Math.Vector2(scenePointer.velocity.x, scenePointer.velocity.y),
          this.cameras.main,
          scrollSpeed,
        );
    });

    this.input.on("pointerup", () => {
      isPanning = false;
      const releaseVelocity = new Phaser.Math.Vector2(
        scenePointer.velocity.x,
        scenePointer.velocity.y,
      );
      const camera = this.cameras.main;

      panTween = this.tweens.add({
        targets: camera,
        scrollX:
          camera.scrollX - (releaseVelocity.x / camera.zoom) * scrollSpeed * glideDistanceFactor,
        scrollY:
          camera.scrollY - (releaseVelocity.y / camera.zoom) * scrollSpeed * glideDistanceFactor,
        duration: releasePanningDelay,
        ease: "Cubic",
      });
    });

    this.events.once("shutdown", () => panTween?.stop());

    // if mouse leaves the viewport, stop panning
    this.input.on("gameout", () => {
      isPanning = false;
    });

    // on spacebar: center camera on board
    this.input.keyboard?.on("keydown-SPACE", () => {
      fitBoardToCamera();
    });

    // get tile type/color from map data
    /**
     * . = Plains = #A2D149
     * f = Forest = #228B22
     * d = Desert = #EDC9AF
     * m = Mountain = #808080
     * ~ = Water = #1E90FF
     * F = Food = #8B4513
     * G = Gold = #FFD700
     * H = Fish = #008080
     * 1 = Player 1 keep (red 1) = #FF0000
     * 2 = Player 2 keep (blue 2) = #0000FF
     * unknown = #FF00FF (magenta)
     */
    function getTileColor(tile: string): number {
      switch (tile) {
        case ".":
          return 0xa2d149; // Plains
        case "f":
          return 0x228b22; // Forest
        case "d":
          return 0xedc9af; // Desert
        case "m":
          return 0x808080; // Mountain
        case "~":
          return 0x1e90ff; // Water
        case "F":
          return 0x8b4513; // Food
        case "G":
          return 0xffd700; // Gold
        case "H":
          return 0x008080; // Fish
        case "1":
          return 0xff0000; // Player 1 keep (red 1)
        case "2":
          return 0x0000ff; // Player 2 keep (blue 2)
        default:
          return 0xff00ff; // unknown tile type (magenta)
      }
    }

    // draw map
    for (let y = 0; y < map.length; y++) {
      for (let x = 0; x < map[y].length; x++) {
        const tile: string = map[y][x];
        const color: number = getTileColor(tile);
        this.add.rectangle(x * tileSize, y * tileSize, tileSize, tileSize, color).setOrigin(0);
        this.add
          .rectangle(x * tileSize, y * tileSize, tileSize, tileSize)
          .setOrigin(0)
          .setStrokeStyle(1, 0x000000);
        if (tile === "1" || tile === "2") {
          this.add
            .text(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, tile, {
              fontSize: "16px",
              color: "#0000000",
            })
            .setOrigin(0.5);
        }
      }
    }
  }
}
