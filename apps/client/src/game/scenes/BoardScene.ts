import Phaser from 'phaser';

export class BoardScene extends Phaser.Scene {
    constructor() {
        super('BoardScene');
    }
    create() {
        this.add.rectangle(400, 300, 800, 600, 0xff0000);
    }
}
