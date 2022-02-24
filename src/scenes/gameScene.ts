import BaseScene from './BaseScene';
import { ImageAsset } from './types';

enum AssetKeys {
  GameBg = 'game-bg',
  Floor = 'floor',
}

enum AnimationsKeys {
  Damage = 'damage',
  Idle = 'idle',
  Runing = 'runing',
  Attack = 'attack',
  Jump = 'jump',
}

const PLAYER_WIDTH = 25;
const PLAYER_HEIGHT = 50;

export default class Game extends BaseScene {
  constructor() {
    super('game');
  }

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

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

  private playerAnimations: {
    key: AnimationsKeys,
    frames: number[],
    frameRate: number,
  }[] = [
    {
      key: AnimationsKeys.Damage,
      frames: [10, 11],
      frameRate: 6,
    },
    {
      key: AnimationsKeys.Idle,
      frames: [12, 13, 14, 15],
      frameRate: 6,
    },
    {
      key: AnimationsKeys.Attack,
      frames: [2, 3, 4, 5, 6, 7, 8, 9],
      frameRate: 6,
    },
    {
      key: AnimationsKeys.Jump,
      frames: [16, 17, 18, 19],
      frameRate: 6,
    },
    {
      key: AnimationsKeys.Runing,
      frames: [20, 21, 22, 23, 24, 25],
      frameRate: 6,
    },
  ]

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

  private createPlayer = () => {
    const player = this.physics.add.sprite(this.centerX, this.centerY, 'player');
    player.setScale(2);
    player.setCollideWorldBounds();
    // adding player animations
    this.playerAnimations.map(({ key, frameRate, frames }) => {
      this.anims.create({
        key: key,
        frames: this.anims.generateFrameNumbers('player', {
          frames: frames,
        }),
        frameRate: frameRate,
        repeat: -1,
      });
    })

    return player;
  };

  init() {
    this.loadWindowDimensions();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.loadPath();
    this.load.image(this.imgAssets);
    this.load.spritesheet('player', 'player.png', {
      frameWidth: PLAYER_WIDTH,
      frameHeight: PLAYER_HEIGHT,
    });
  }

  create() {
    this.createBackground();
    // spreads out the ground
    const ground = this.createGround();
    this.player = this.createPlayer();
    // colliding with the ground
    this.physics.add.collider(this.player, ground);
    this.player.play(AnimationsKeys.Idle);
  }
}
