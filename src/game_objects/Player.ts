import { Scene, SpriteAsset, FrameNumbersConfig } from './types';

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

class Player {
  /**
   * The scene this player belongs to. 
   */  
  public scene: Scene;
  /**
   * This game object's key. Defaulted to 'player' 
   */
  public readonly key?: string;

  constructor(sceneContext: Scene, key: string = 'player') {
    this.scene = sceneContext;
    this.key = key;
  }

  /**
   * the assets making up this game object
   */
  public spriteAssets: SpriteAsset[] = [
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

  public playerAnimations: {
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

  /**
   * Returns the player sprite game object. Takes in coordinates and optional scale.
   * Note: loadPlayerSprites method must be called before this one. Or spritesheet loaded.
   * @param xCoord x coordinate to place the sprite
   * @param yCoord y coordinate to place the sprite
   * @param scale optionally sets the scaled size for the player object. Default is 2
   * @returns The player object
   */
  public createPlayer = (xCoord: number, yCoord: number, scale: number = 2) => {
    const player = this.scene.physics.add.sprite(
      xCoord,
      yCoord,
      this.key
    );
    player.setScale(scale);
    player.setCollideWorldBounds();
    // adding player animations
    this.playerAnimations.map(({ key, frameRate, frames }) => {
      this.scene.anims.create({
        key: key,
        frames: typeof frames === 'string' ? frames : this.scene.anims.generateFrameNumbers(key, frames),
        frameRate: frameRate,
        repeat: -1,
      });
    });

    return player;
  };

  /**
   * Loads in the sprite sheet into the scene. Run this on the preload method
   */
  public loadPlayerSprites = () => {
    this.scene.load.spritesheet(this.spriteAssets);
  }

}

export default Player;
