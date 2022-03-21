import BaseScene from './BaseScene';
import { Asset } from './types';

// Add asset keys here
enum AssetKeys {
  LoseBtn = 'lose',
  BGImage = 'bgImage',
}

export default class GameOver extends BaseScene {
  constructor() {
    super('gameOver');
  }

  // image assets
  private imgAssets: Asset[] = [
    {
      key: AssetKeys.LoseBtn,
      url: 'lose.png',
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
      .image(this.centerX, this.centerY, AssetKeys.LoseBtn)
      .setInteractive();
    startBtn.scale = 0.5;
    startBtn.on('pointerdown', this.reStartGame);
  }

  reStartGame = () => {
    location.reload();
  }
}
