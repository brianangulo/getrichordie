import BaseScene from './BaseScene';
import { ImageAsset, Cursors, StaticGround } from './types';
import Player from '../game_objects/Player';

enum AssetKeys {
  GameBg = 'game-bg',
  Floor = 'floor',
}

export default class Game extends BaseScene {
  constructor() {
    super('game');
    this.playerInstance = new Player(this);
  }
  private playerInstance: Player;
  private cursors: Cursors;
  private ground: StaticGround;

  private imgAssets: ImageAsset[] = [
    {
      key: AssetKeys.GameBg,
      url: 'Background.png',
    },
    {
      key: AssetKeys.Floor,
      url: 'tile.png',
    },
  ];

  private createBackground = () => {
    // background image
    const background = this.add.image(
      this.centerX,
      this.centerY,
      AssetKeys.GameBg
    );
    background.scaleX = 1.5;
    background.scaleY = 2.0;
  };

  private createGround = () => {
    // in pixels
    const groundTileSize = 32;
    const tilesQuantity: number = Math.ceil(this.windowWidth / groundTileSize);
    this.ground = this.physics.add.staticGroup();
    let tileData: Phaser.Types.GameObjects.Group.GroupCreateConfig[] = [];
    // looping till outside the screen
    for (let index = 0; index <= tilesQuantity; index++) {
      // where to place the tile
      const tileXPos = index === 0 ? index : groundTileSize * index;
      // ground as a static group of 2
      let topTileData: typeof tileData[0] = {
        setXY: { x: tileXPos, y: this.windowHeight - 15 },
        key: AssetKeys.Floor,
      };
      let bottomTileData: typeof tileData[0] = {
        setXY: { x: tileXPos, y: this.windowHeight - 47 },
        key: AssetKeys.Floor,
      };
      tileData.push(topTileData, bottomTileData);
    }
    this.ground.createMultiple(tileData);
  };

  // engine methods
  init() {
    this.loadWindowDimensions();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.loadPath();
    this.load.image(this.imgAssets);
    this.playerInstance.loadPlayerSprites();
  }

  create() {
    this.createBackground();
    // spreads out the ground
    this.createGround();
    // creates the player
    this.playerInstance.createPlayer(this.centerX, this.centerY, 2);
    // adds collision with the ground
    this.playerInstance.addPlayerCollider(this.ground);
  }

  update(time: number, delta: number) {
      this.playerInstance.playerMovement(this.cursors);
  }
}
