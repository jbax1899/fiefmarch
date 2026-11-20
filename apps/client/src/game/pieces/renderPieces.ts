import type { Piece, PlayerState } from "@fiefmarch/game";
import type Phaser from "phaser";

export const KEEP_TEXTURE = "keep";

const playerColors = [0xff6b6b, 0x6ba8ff, 0x69d385, 0xffd166];

export function renderPieces(
  scene: Phaser.Scene,
  pieces: readonly Piece[],
  players: readonly PlayerState[],
  tileSize: number,
): void {
  const ownerColors = new Map(
    players.map((player, playerIndex) => [player.id, playerColors[playerIndex]]),
  );
  const size = tileSize * 0.85;

  for (const piece of pieces) {
    if (piece.kind !== "Keep") continue;

    const { x, y } = piece.position;
    scene.add
      .image((x + 0.5) * tileSize, (y + 0.5) * tileSize, KEEP_TEXTURE)
      .setDisplaySize(size, size)
      .setTint(ownerColors.get(piece.ownerId) ?? 0xffffff);
  }
}
