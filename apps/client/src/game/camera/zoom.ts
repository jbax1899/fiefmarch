const MIN_ZOOM = 0.25;
const MAX_ZOOM = 2;

export function zoom(
  camera: Phaser.Cameras.Scene2D.Camera,
  screenX: number,
  screenY: number,
  zoomFactor: number,
): void {
  const worldPoint = camera.getWorldPoint(screenX, screenY);
  const newZoom = Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, camera.zoom * zoomFactor));
  camera.setZoom(newZoom);
  camera.preRender();
  const newWorldPoint = camera.getWorldPoint(screenX, screenY);
  camera.scrollX -= newWorldPoint.x - worldPoint.x;
  camera.scrollY -= newWorldPoint.y - worldPoint.y;
}
