import BaseScene from './BaseScene';
import { ImageAsset, SpriteAsset, Cursors, Player, FrameNumbersConfig } from './types';

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
  Death = 'death',
}

const PLAYER_WIDTH = 24;
const PLAYER_HEIGHT = 48;

export default class Game extends BaseScene {
  constructor() {
    super('game');
  }

  private cursors: Cursors;
  private player: Player;

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

  private spriteAssets: SpriteAsset[] = [
    {
      key: AnimationsKeys.Idle,
      url: 'player_idle.png',
    },
    {
      key: AnimationsKeys.Attack,
      url: 'player_attack.png',
    },
    {
      key: AnimationsKeys.Damage,
      url: 'player_hurt.png',
    },
    {
      key: AnimationsKeys.Jump,
      url: 'player_jump.png',
    },
    {
      key: AnimationsKeys.Runing,
      url: 'player_run.png',
    },
    {
      key: AnimationsKeys.Death,
      url: 'player_death.png',
    },
    // adding frame configs dynamically
  ].map((asset) => ({
    ...asset,
    frameConfig: {
      frameWidth: PLAYER_WIDTH,
      frameHeight: PLAYER_HEIGHT,
    },
  }));

  private playerAnimations: {
    key: AnimationsKeys;
    frames: string | FrameNumbersConfig;
    frameRate: number;
  }[] = [
    {
      key: AnimationsKeys.Damage,
      frames: AnimationsKeys.Damage,
      frameRate: 6,
    },
    {
      key: AnimationsKeys.Idle,
      frames: { frames: [0, 2, 4, 6] },
      frameRate: 6,
    },
    {
      key: AnimationsKeys.Attack,
      frames: AnimationsKeys.Attack,
      frameRate: 6,
    },
    {
      key: AnimationsKeys.Jump,
      frames: AnimationsKeys.Jump,
      frameRate: 6,
    },
    {
      key: AnimationsKeys.Runing,
      frames: AnimationsKeys.Runing,
      frameRate: 6,
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

  private createPlayer = () => {
    const player = this.physics.add.sprite(
      this.centerX,
      this.centerY,
      'player'
    );
    player.setScale(2);
    player.setCollideWorldBounds();
    // adding player animations
    this.playerAnimations.map(({ key, frameRate, frames }) => {
      this.anims.create({
        key: key,
        frames: typeof frames === 'string' ? frames : this.anims.generateFrameNumbers(key, frames),
        frameRate: frameRate,
        repeat: -1,
      });
    });

    return player;
  };

  init() {
    this.loadWindowDimensions();
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.loadPath();
    this.load.image(this.imgAssets);
    this.load.spritesheet(this.spriteAssets);
  }

  create() {
    this.createBackground();
    // spreads out the ground
    const ground = this.createGround();
    this.player = this.createPlayer();
    // colliding with the ground
    this.physics.add.collider(this.player, ground);
    this.player.play(AnimationsKeys.Damage);
    this.player.play(AnimationsKeys.Idle);
  }
}
