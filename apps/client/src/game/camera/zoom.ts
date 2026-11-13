export const MIN_ZOOM = 0.25;
export const MAX_ZOOM = 2;

export function zoom(
  camera: Phaser.Cameras.Scene2D.Camera,
  screenX: number,
  screenY: number,
  zoomFactor: number,
  minZoom: number = MIN_ZOOM,
): void {
  camera.preRender();
  const worldPoint = camera.getWorldPoint(screenX, screenY);
  const newZoom = Math.max(
    zoomFactor > 1 ? camera.zoom : minZoom,
    Math.min(MAX_ZOOM, camera.zoom * zoomFactor),
  );
  camera.setZoom(newZoom);
  camera.preRender();
  const newWorldPoint = camera.getWorldPoint(screenX, screenY);
  camera.scrollX -= newWorldPoint.x - worldPoint.x;
  camera.scrollY -= newWorldPoint.y - worldPoint.y;
}
