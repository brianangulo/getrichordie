import Phaser from 'phaser';

export type Asset = Phaser.Types.Loader.FileTypes.ImageFileConfig;
export type Cursors = Phaser.Types.Input.Keyboard.CursorKeys;
export type PlayerGameObject =
  Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
export type StaticGround = Phaser.Physics.Arcade.StaticGroup;
export type HealthBar = Phaser.GameObjects.Graphics;
export enum AssetKeys {
  GameBg = 'game-bg',
  Floor = 'floor',
  CollectSound = 'collect-sound',
  DeathSound = 'death-sound',
  HitSound = 'hit-sound',
  JumpSound = 'jump-sound',
  RunningSound = 'running-sound',
  BackgroundSound = 'background-sound',
}
