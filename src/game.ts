import Phaser from 'phaser';
import { MenuScene, Game, GameOver } from './scenes';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MenuScene, Game, GameOver],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
