import BaseScene from './BaseScene';
import { ImageAsset } from './types';

enum AssetKeys {
  GameBg = 'game-bg',
  Floor = 'floor',
}

export default class Game extends BaseScene {
  constructor() {
    super('game');
  }

  private imgAssets: ImageAsset[] = [
    {
      key: AssetKeys.GameBg,
      url: 'Background.png',
    },
    {
      key: AssetKeys.Floor,
      url: 'tile.png',
    }
  ]

  init() {
    this.loadWindowDimensions();
  }

  preload() {
    this.loadPath();
    this.load.image(this.imgAssets);
  }

  create() {
    // background image
    const background = this.add.image(this.centerX, this.centerY, AssetKeys.GameBg);
    background.scaleX = 1.5;
    background.scaleY = 2.0;
    // spreads out the ground
    this.createGround();
  }

  private createGround = () => {
    // in pixels
    const groundTileSize = 32;
    const tilesQuantity: number = Math.ceil(this.windowWidth / groundTileSize);
    // looping till outside the screen
    for (let index = 0; index <= tilesQuantity; index++) {
      // where to place the tile
      const tileXPos = index === 0 ? index : groundTileSize * index;
      this.add.image(tileXPos, this.windowHeight - 15, AssetKeys.Floor);
      this.add.image(tileXPos, this.windowHeight - 47, AssetKeys.Floor);
    }
  }
}
