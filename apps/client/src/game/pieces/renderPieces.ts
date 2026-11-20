import type { Piece, PlayerState } from "@fiefmarch/game";
import type Phaser from "phaser";

export const pieceTextures = {
  keep: "keep",
  worker: "worker",
  infantry: "infantry",
} as const;

type PieceVisual = { texture: string; x: number; y: number };

const pieceVisuals: Partial<Record<Piece["kind"], PieceVisual>> = {
  Keep: { texture: pieceTextures.keep, x: 0.25, y: 0.25 },
  Worker: { texture: pieceTextures.worker, x: 0.25, y: 0.75 },
  infantry: { texture: pieceTextures.infantry, x: 0.75, y: 0.75 },
};

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
  const piecesByTile = new Map<string, { piece: Piece; visual: PieceVisual }[]>();

  for (const piece of pieces) {
    const visual = pieceVisuals[piece.kind];
    if (!visual) continue;

    const tileKey = `${piece.position.x},${piece.position.y}`;
    const tilePieces = piecesByTile.get(tileKey);
    if (tilePieces) {
      tilePieces.push({ piece, visual });
    } else {
      piecesByTile.set(tileKey, [{ piece, visual }]);
    }
  }

  for (const tilePieces of piecesByTile.values()) {
    const shared = tilePieces.length > 1;
    const size = tileSize * (shared ? 0.5 : 1);

    for (const { piece, visual } of tilePieces) {
      const { x, y } = piece.position;
      const centerX = (x + (shared ? visual.x : 0.5)) * tileSize;
      const centerY = (y + (shared ? visual.y : 0.5)) * tileSize;
      scene.add
        .image(centerX, centerY, visual.texture)
        .setDisplaySize(size, size)
        .setTint(ownerColors.get(piece.ownerId) ?? 0xffffff);
    }
  }
}
