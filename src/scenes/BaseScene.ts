import Phaser from 'phaser';

type SceneConfig = Phaser.Types.Scenes.SettingsConfig | string;

/**
 * Base scene class extending phaser scene it includes a few extra utilities.
 * Such as `centerX` and `centerY` to easily point the middle of the screen.
 */
class BaseScene extends Phaser.Scene {
    constructor(sceneConfig: SceneConfig) {
        super(sceneConfig);
    }
    /**
     * The center of the screen from x axis. Only accesible after init method fires.
     */
    public centerX: number;
    /**
     * The center of the screen from y axis. Only accesible after init method fires.
     */
    public centerY: number;

    /**
     * The window's width
     */
    public windowWidth: number;

    /**
     * The window's height
     */
    public windowHeight: number;

    /**
     * Loads in window dimensions. Call this method during the init phase before any usage
     */
    loadWindowDimensions = () => {
        this.windowWidth = Number(this.sys.game.config.width);
        this.windowHeight = Number(this.sys.game.config.height);
        this.centerX = this.windowWidth / 2;
        this.centerY = this.windowHeight / 2;
    }
    
    /**
     * Call this method during the loading stage before loading any assets. 
     * It will fill in the path so only asset names will be needed when loading assets.
     */
    loadPath = () => {
        this.load.path = 'assets/';
    }
}

export default BaseScene;
