export function mousePan(
  velocityVector: Phaser.Math.Vector2,
  camera: Phaser.Cameras.Scene2D.Camera,
  scrollSpeed: number,
): void {
  camera.scrollX -= (velocityVector.x / camera.zoom) * scrollSpeed;
  camera.scrollY -= (velocityVector.y / camera.zoom) * scrollSpeed;
}
