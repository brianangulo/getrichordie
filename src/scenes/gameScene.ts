import BaseScene from './BaseScene';
import { ImageAsset, Cursors, PlayerGameObject } from './types';
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
  private player: PlayerGameObject;

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
    const ground = this.physics.add.staticGroup();
    // looping till outside the screen
    for (let index = 0; index <= tilesQuantity; index++) {
      // where to place the tile
      const tileXPos = index === 0 ? index : groundTileSize * index;
      // ground as a static group of 2
      ground.create(tileXPos, this.windowHeight - 15, AssetKeys.Floor);
      ground.create(tileXPos, this.windowHeight - 47, AssetKeys.Floor);
    }

    return ground;
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
    const ground = this.createGround();
    this.player = this.playerInstance.createPlayer(this.centerX, this.centerY, 4);
    // colliding with the ground
    this.physics.add.collider(this.player, ground);
    this.player.play('idle');
  }
}
