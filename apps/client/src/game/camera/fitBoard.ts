export function fitBoard(
  camera: Phaser.Cameras.Scene2D.Camera,
  viewportWidth: number,
  viewportHeight: number,
  boardWidth: number,
  boardHeight: number,
  padding: number = 0,
) {
  const scaleX = (viewportWidth - padding * 2) / boardWidth;
  const scaleY = (viewportHeight - padding * 2) / boardHeight;
  const scale = Math.min(scaleX, scaleY);
  camera.setZoom(scale);
  camera.centerOn(boardWidth / 2, boardHeight / 2);
}
