import Phaser from 'phaser';
import { MenuScene, Game } from './scenes';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MenuScene, Game],
};

const game = new Phaser.Game(config);
