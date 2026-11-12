export function fitBoard(
  camera: Phaser.Cameras.Scene2D.Camera,
  viewportWidth: number,
  viewportHeight: number,
  boardWidth: number,
  boardHeight: number,
  padding: number = 0,
) {
  // TODO: sets zoom without the limits used by zoom.ts.
  // On a sufficiently large viewport, fit zoom can exceed 2;
  // the next wheel input then clamps it, causing a jump.
  const scaleX = (viewportWidth - padding * 2) / boardWidth;
  const scaleY = (viewportHeight - padding * 2) / boardHeight;
  const scale = Math.min(scaleX, scaleY);
  camera.setZoom(scale);
  camera.centerOn(boardWidth / 2, boardHeight / 2);
}
