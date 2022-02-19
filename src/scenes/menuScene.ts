import Phaser from 'phaser';

interface Asset {
  key: string;
  asset: string;
}

// Add asset keys here
enum AssetKeys {
  StartBtn = 'startBtn',
}

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  // image assets
  private imgAssets: Asset[] = [
    {
      key: AssetKeys.StartBtn,
      asset: 'assets/Start_BTN.png',
    },
  ];

  // easier finding the center
  private centerX: number;
  private centerY: number;

  init() {
    // finding the center at runtime
    this.centerX = Number(this.sys.game.config.width) / 2;
    this.centerY = Number(this.sys.game.config.height) / 2;
  }

  preload() {
    // loading image assets dynamically
    this.imgAssets.map(({ key, asset }) => this.load.image(key, asset));
  }

  create() {
    const startBtn = this.add
      .image(this.centerX, this.centerY, AssetKeys.StartBtn)
      .setInteractive();
    startBtn.scale = 0.5;
    startBtn.on('pointerdown', () => this.scene.start('game'));
  }
}
