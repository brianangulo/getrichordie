import Phaser from 'phaser';
import { Scene, GameObject } from './types';

class Money extends Phaser.Physics.Arcade.Sprite {
  public static readonly FRAME_WIDTH = 11;
  public static readonly FRAME_HEIGHT = 16;
  public static readonly FRAME_SPACING = 15;
  constructor(
    scene: Scene,
    xCoord: number,
    yCoord: number,
    ground?: GameObject,
    key: string = 'money'
  ) {
    super(scene, xCoord, yCoord, key);
    scene.physics.add.existing(this);
    scene.add.existing(this);
    scene.physics.add.collider(this, ground, this.groundCollisionCallback);
    this.setScale(2);
    this.animate(key);
  }
  private animate = (key: string) => {
    this.anims.create({
      key: key,
      frames: key,
      frameRate: 6,
      repeat: -1,
    });
    this.play(key);
  };
  private groundCollisionCallback = (money: this) => {
    money.destroy();
  };
}

export default Money;
