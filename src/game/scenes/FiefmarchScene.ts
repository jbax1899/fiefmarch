import Phaser from "phaser";

const COLUMNS = 10;
const ROWS = 8;

type SelectedField = {
  column: number;
  row: number;
};

export class FiefmarchScene extends Phaser.Scene {
  private layoutContainer?: Phaser.GameObjects.Container;
  private boardX = 0;
  private boardY = 0;
  private cellSize = 0;
  private selectedField: SelectedField | null = null;

  constructor() {
    super("FiefmarchScene");
  }

  create(): void {
    this.layoutContainer = this.add.container(0, 0);
    this.layoutScene();
    this.scale.on(Phaser.Scale.Events.RESIZE, this.layoutScene, this);
    this.input.on("pointerdown", this.handlePointerDown, this);
  }

  private layoutScene(): void {
    if (!this.layoutContainer) {
      return;
    }

    this.layoutContainer.removeAll(true);

    const { width, height } = this.scale;
    const horizontalPadding = width < 480 ? 16 : 40;
    const availableHeight = Math.max(144, height - 176);
    this.cellSize = Math.floor(
      Math.min(56, (width - horizontalPadding * 2) / COLUMNS, availableHeight / ROWS),
    );

    const boardWidth = this.cellSize * COLUMNS;
    const boardHeight = this.cellSize * ROWS;
    this.boardX = Math.round((width - boardWidth) / 2);
    this.boardY = Math.round(height * 0.55 - boardHeight / 2);

    const titleSize = Math.min(48, Math.max(30, Math.round(width * 0.075)));
    this.layoutContainer.add(
      this.add
        .text(width / 2, height * 0.105, "Fiefmarch", {
          color: "#f3ead5",
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: titleSize,
          fontStyle: "bold",
        })
        .setOrigin(0.5),
    );

    this.layoutContainer.add(
      this.add
        .text(
          width / 2,
          height * 0.105 + titleSize * 0.9,
          "A medieval strategy game in the making",
          {
            color: "#a9b5aa",
            fontFamily: "Arial, sans-serif",
            fontSize: 14,
          },
        )
        .setOrigin(0.5),
    );

    this.drawBattlefield(boardWidth, boardHeight);

    const footer = this.selectedField
      ? `Field highlighted · column ${this.selectedField.column + 1}, row ${this.selectedField.row + 1}`
      : "Tap or click a field to highlight it";

    this.layoutContainer.add(
      this.add
        .text(width / 2, height - 30, footer, {
          color: "#a9b5aa",
          fontFamily: "Arial, sans-serif",
          fontSize: 13,
        })
        .setOrigin(0.5),
    );
  }

  private drawBattlefield(boardWidth: number, boardHeight: number): void {
    const graphics = this.add.graphics();
    this.layoutContainer?.add(graphics);

    graphics
      .fillStyle(0x1b2923, 1)
      .fillRect(this.boardX - 6, this.boardY - 6, boardWidth + 12, boardHeight + 12);

    for (let row = 0; row < ROWS; row += 1) {
      for (let column = 0; column < COLUMNS; column += 1) {
        const x = this.boardX + column * this.cellSize;
        const y = this.boardY + row * this.cellSize;
        const color = (row + column) % 2 === 0 ? 0x34483d : 0x293b32;

        graphics.fillStyle(color, 1).fillRect(x, y, this.cellSize, this.cellSize);
        graphics.lineStyle(1, 0x19271f, 0.65).strokeRect(x, y, this.cellSize, this.cellSize);
      }
    }

    if (this.selectedField) {
      const x = this.boardX + this.selectedField.column * this.cellSize;
      const y = this.boardY + this.selectedField.row * this.cellSize;

      graphics.fillStyle(0xc6a86e, 0.2).fillRect(x, y, this.cellSize, this.cellSize);
      graphics
        .lineStyle(3, 0xe4c783, 1)
        .strokeRect(x + 1, y + 1, this.cellSize - 2, this.cellSize - 2);
    }

    graphics
      .lineStyle(2, 0x9c8151, 1)
      .strokeRect(this.boardX - 6, this.boardY - 6, boardWidth + 12, boardHeight + 12);
  }

  private handlePointerDown(pointer: Phaser.Input.Pointer): void {
    const column = Math.floor((pointer.x - this.boardX) / this.cellSize);
    const row = Math.floor((pointer.y - this.boardY) / this.cellSize);

    if (
      pointer.x < this.boardX ||
      pointer.x >= this.boardX + COLUMNS * this.cellSize ||
      pointer.y < this.boardY ||
      pointer.y >= this.boardY + ROWS * this.cellSize
    ) {
      return;
    }

    this.selectedField = { column, row };
    this.layoutScene();
  }
}
