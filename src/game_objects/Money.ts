import Phaser from 'phaser';
import { Scene, GameObject } from './types';

class Money extends Phaser.Physics.Arcade.Sprite {
  public static readonly FRAME_WIDTH = 11;
  public static readonly FRAME_HEIGHT = 16;
  public static readonly FRAME_SPACING = 15;
  public static readonly MAX_VELOCITY = 300;
  constructor(
    scene: Scene,
    xCoord: number,
    yCoord: number,
    ground: GameObject,
    windowCenterX: number,
    playerAndOverlapCB: { player: GameObject, callback: (money: Money, player: GameObject) => void},
    key: string = 'money'
  ) {
    super(scene, xCoord, yCoord, key);
    scene.physics.add.existing(this);
    scene.add.existing(this);
    // ground collision
    scene.physics.add.collider(this, ground, this.groundCollisionCallback);
    scene.physics.add.overlap(this, playerAndOverlapCB.player, playerAndOverlapCB.callback);
    this.setScale(2);
    this.animate(key);
    // setting a random velocity
    const randomV = Math.round(Math.random() * Money.MAX_VELOCITY);
    const vX = this.x > windowCenterX ? -randomV : randomV;
    const vY = Math.ceil(randomV) * (Math.round(Math.random()) ? 1 : -1);
    this.setVelocity(vX, vY);
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
