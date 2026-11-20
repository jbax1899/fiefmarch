import type { MatchState } from "@fiefmarch/game";
import Phaser from "phaser";
import keepUrl from "../../../resources/pieces/keep.png";
import { renderBoard } from "../board/renderBoard";
import { fitBoard } from "../camera/fitBoard";
import { MIN_ZOOM, zoom } from "../camera/zoom";
import { mousePan } from "../camera/mousePan";
import { KEEP_TEXTURE, renderPieces } from "../pieces/renderPieces";

export class BoardScene extends Phaser.Scene {
  constructor(private readonly snapshot: MatchState) {
    super("BoardScene");
  }

  preload() {
    this.load.image(KEEP_TEXTURE, keepUrl);
  }

  create() {
    const { terrain } = this.snapshot.board;
    const tileSize = 64;
    const columns = Math.max(0, ...terrain.map((row) => row.length));
    const rows = terrain.length;
    renderBoard(this, terrain, tileSize);
    renderPieces(this, this.snapshot.pieces.pieces, this.snapshot.players, tileSize);

    let dragPointer: Phaser.Input.Pointer | undefined;
    let panTween: Phaser.Tweens.Tween | undefined;
    let isPanning: boolean = false;
    let minZoom = MIN_ZOOM;
    const scrollSpeed = 0.15;
    const releasePanningDelay = 300;
    const decayRate = 0.95;
    const glideDistanceFactor = (1 - decayRate ** (releasePanningDelay / 16)) / (1 - decayRate);

    const fitBoardToCamera = () => {
      if (panTween) panTween.stop();
      if (columns === 0) return;
      minZoom = Math.min(
        MIN_ZOOM,
        fitBoard(
          this.cameras.main,
          this.scale.width,
          this.scale.height,
          columns * tileSize,
          rows * tileSize,
          20,
        ),
      );
    };

    fitBoardToCamera(); // fit on scene start

    this.scale.on("resize", fitBoardToCamera);

    this.events.once("shutdown", () => {
      this.scale.off("resize", fitBoardToCamera);
    });

    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      panTween?.stop();
      isPanning = true;
      dragPointer = pointer;
    });

    this.input.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      if (isPanning && pointer === dragPointer)
        mousePan(
          new Phaser.Math.Vector2(pointer.velocity.x, pointer.velocity.y),
          this.cameras.main,
          scrollSpeed,
        );
    });

    this.input.on("pointerup", (pointer: Phaser.Input.Pointer) => {
      if (!isPanning || pointer !== dragPointer) return;
      isPanning = false;
      dragPointer = undefined;
      const releaseVelocity = new Phaser.Math.Vector2(pointer.velocity.x, pointer.velocity.y);
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
      dragPointer = undefined;
    });

    // on spacebar: center camera on board
    this.input.keyboard?.on("keydown-SPACE", () => {
      fitBoardToCamera();
    });

    const zoomSpeed: number = 0.1;
    this.input.on(
      "wheel",
      (
        pointer: Phaser.Input.Pointer,
        _gameObjects: Phaser.GameObjects.GameObject[],
        _deltaX: number,
        deltaY: number,
      ) => {
        if (deltaY === 0) return;
        if (panTween) panTween.stop();
        const zoomFactor: number = deltaY > 0 ? 1 - zoomSpeed : 1 + zoomSpeed;
        zoom(this.cameras.main, pointer.x, pointer.y, zoomFactor, minZoom);
      },
    );
  }
}
