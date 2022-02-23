import BaseScene from './BaseScene';
import { ImageAsset } from './types';

// Add asset keys here
enum AssetKeys {
  StartBtn = 'startBtn',
  BGImage = 'bgImage',
}

export default class MenuScene extends BaseScene {
  constructor() {
    super('menu');
  }

  // image assets
  private imgAssets: ImageAsset[] = [
    {
      key: AssetKeys.StartBtn,
      url: 'Start_BTN.png',
    },
    {
      key: AssetKeys.BGImage,
      url: 'BG.png',
    },
  ];

  init() {
    this.loadWindowDimensions();
  }

  preload() {
    // loading path
    this.loadPath();
    // loading image assets dynamically
    this.load.image(this.imgAssets);
  }

  create() {
    this.add.image(this.centerX, this.centerY, AssetKeys.BGImage);

    const startBtn = this.add
      .image(this.centerX, this.centerY, AssetKeys.StartBtn)
      .setInteractive();
    startBtn.scale = 0.5;
    startBtn.on('pointerdown', this.startGame);
  }

  startGame = () => {
    this.scene.start('game');
  }
}
