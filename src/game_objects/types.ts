import Phaser from 'phaser';

export type Scene = Phaser.Scene;
export type SpriteAsset = Phaser.Types.Loader.FileTypes.SpriteSheetFileConfig;
export type FrameNumbersConfig = Phaser.Types.Animations.GenerateFrameNumbers;
export type PlayerGameObject = Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
export type GameObject = Phaser.GameObjects.GameObject | Phaser.GameObjects.Group | Phaser.GameObjects.GameObject[] | Phaser.GameObjects.Group[];
export type Cursors = Phaser.Types.Input.Keyboard.CursorKeys;
