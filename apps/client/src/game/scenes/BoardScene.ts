import Phaser from 'phaser';
import mapJson from "@fiefmarch/game/maps/test-1v1.json" with { type: "json" };

export class BoardScene extends Phaser.Scene {
    constructor() {
        super('BoardScene');
    }
    create() {
        const tileSize: number = 32; //px
        const map = mapJson.terrain;

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
                case '.': return 0xA2D149; // Plains
                case 'f': return 0x228B22; // Forest
                case 'd': return 0xEDC9AF; // Desert
                case 'm': return 0x808080; // Mountain
                case '~': return 0x1E90FF; // Water
                case 'F': return 0x8B4513; // Food
                case 'G': return 0xFFD700; // Gold
                case 'H': return 0x008080; // Fish
                case '1': return 0xFF0000; // Player 1 keep (red 1)
                case '2': return 0x0000FF; // Player 2 keep (blue 2)
                default: return 0xFF00FF; // unknown tile type (magenta)
            }
        }

        // draw map
        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                const tile: string = map[y][x];
                const color: number = getTileColor(tile);
                this.add.rectangle(x * tileSize, y * tileSize, tileSize, tileSize, color).setOrigin(0);
                this.add.rectangle(x * tileSize, y * tileSize, tileSize, tileSize).setOrigin(0).setStrokeStyle(1, 0x000000);
                if (tile === '1' || tile === '2') {
                    this.add.text(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2, tile, { fontSize: '16px', color: '#0000000' }).setOrigin(0.5);
                }
            }
        }
    }
}
