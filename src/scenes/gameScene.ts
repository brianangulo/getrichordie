import Phaser from 'phaser';

export default class Game extends Phaser.Scene {
  constructor() {
    super('game');
  }

  private centerX: number;
  private centerY: number;

  init() {
    this.centerX = Number(this.sys.game.config.width) / 2;
    this.centerY = Number(this.sys.game.config.height) / 2;
  }

  preload() {}

  create() {
    let placeholder = this.add.text(
      this.centerX,
      this.centerY,
      'This is a game',
      { fontSize: '22px' }
    );
    placeholder.setInteractive();
    placeholder.on('pointerdown', () => this.scene.start('menu'));
  }
}
