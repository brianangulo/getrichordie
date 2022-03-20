import BaseScene from './BaseScene';
import { ImageAsset, Cursors, StaticGround, HealthBar } from './types';
import Player from '../game_objects/Player';
import Money from '../game_objects/Money';
import { GameObject } from '../game_objects/types';

enum AssetKeys {
  GameBg = 'game-bg',
  Floor = 'floor',
}

export default class Game extends BaseScene {
  constructor() {
    super('game');
    this.playerInstance = new Player(this);
  }
  public static readonly MAX_PLAYER_HEALTH = 1000;
  public static readonly PLAYER_HEALTH_UPDATE_AMOUNT = 10;
  public static readonly MONEY_STRAP = 3;
  public static readonly RAIN_INTERVAL = 500; // in ms
  private playerHealth: number = 1000;
  private playerInstance: Player;
  private cursors: Cursors;
  private ground: StaticGround;
  private healthBar: HealthBar;
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
    this.ground = this.physics.add.staticGroup();
    let tileData: Phaser.Types.GameObjects.Group.GroupCreateConfig[] = [];
    // looping till outside the screen
    for (let index = 0; index <= tilesQuantity; index++) {
      // where to place the tile
      const tileXPos = index === 0 ? index : groundTileSize * index;
      // ground as a static group of 2
      let topTileData: typeof tileData[0] = {
        setXY: { x: tileXPos, y: this.windowHeight - 15 },
        key: AssetKeys.Floor,
      };
      let bottomTileData: typeof tileData[0] = {
        setXY: { x: tileXPos, y: this.windowHeight - 47 },
        key: AssetKeys.Floor,
      };
      tileData.push(topTileData, bottomTileData);
    }
    this.ground.createMultiple(tileData);
  };

  private increasePlayerHealth = () => {
    if (
      !(this.playerHealth + Game.PLAYER_HEALTH_UPDATE_AMOUNT >
      Game.MAX_PLAYER_HEALTH)
    ) {
      this.playerHealth += Game.PLAYER_HEALTH_UPDATE_AMOUNT;
    } else {
      this.playerHealth = Game.MAX_PLAYER_HEALTH;
    }
  };

  private decreasePlayerHealth = () => {
    if (!(this.playerHealth - Game.PLAYER_HEALTH_UPDATE_AMOUNT < 0)) {
      this.playerHealth -= Game.PLAYER_HEALTH_UPDATE_AMOUNT;
    } else {
      // game over
      console.log('game over fool');
    }
  };

  private preLoadMoneyAsset = () => {
    this.load.spritesheet('money', 'Money.png', {
      frameWidth: Money.FRAME_WIDTH,
      frameHeight: Money.FRAME_HEIGHT,
      spacing: Money.FRAME_SPACING,
    });
  };

  private createPlayerHealthBar = (x: number, y: number, color: number) => {
    //draw the bar
    const bar = this.add.graphics();

    //color the bar
    bar.fillStyle(color, 1);

    //fill the bar with a rectangle
    bar.fillRect(0, 0, 200, 50);

    //position the bar
    bar.x = x;
    bar.y = y;

    // writing health bar verbiage
    this.add.text(this.centerX, bar.y - 16, 'HEALTH', {
      fontSize: '16px',
      fontStyle: 'bold',
      color: 'black',
    })

    //return the bar
    return bar;
  };
  // it updates the health bar
  private updateHealthBar(bar: HealthBar, percentage: number) {
    //scale the bar
    bar.scaleX = percentage / 100;
  }

  private slowlyLowerPlayerHealthAndMakeItRain = (delta: number, interval: number) => {
    // decreasing player health on a timer
    this.timer += delta;
    while (this.timer > interval) {
      this.decreasePlayerHealth();
      this.makeItRain(Game.MONEY_STRAP);
      this.timer -= interval;
    }
  }

  private playerAndMoneyOverlapCallback = (money: Money) => {
    money.destroy();
    this.increasePlayerHealth();
  }
       
  // makes money objects rain
  private makeItRain = (quantity: number) => {
    const randomY = Math.round(Math.random() * this.windowHeight - 100);
    // either left or right side
    const randomX = [0, this.windowWidth][Math.round(Math.random())];
    // instantiating some money, no need to clear it as they will get destroyed on collision
    for (let index = 0; index < quantity; index++) {
      new Money(this, randomX, randomY, this.ground, this.centerX, {
        player: this.playerInstance.player,
        callback: this.playerAndMoneyOverlapCallback,
      });
    }
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
    this.preLoadMoneyAsset();
  }

  create() {
    this.createBackground();
    // spreads out the ground
    this.createGround();
    // creates the player
    this.playerInstance.createPlayer(this.centerX, this.centerY, 2);
    // adds collision with the ground
    this.playerInstance.addPlayerCollider(this.ground);
    // health bar
    this.healthBar = this.createPlayerHealthBar(this.centerX, 50, 0xe74c3c);
  }
  private timer: number = 0;
  update(time: number, delta: number) {
    this.playerInstance.playerMovement(this.cursors);
    this.updateHealthBar(this.healthBar, 0.10 * this.playerHealth);
    this.slowlyLowerPlayerHealthAndMakeItRain(delta, Game.RAIN_INTERVAL);
  }
}
