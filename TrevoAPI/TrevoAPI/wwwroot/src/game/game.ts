import "phaser";
import { MainScene } from "./scenes/mainScene";

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
    width: window.innerWidth,
    height: window.innerHeight,
    parent: "game",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: MainScene,
    scale: {
        mode: Phaser.Scale.CENTER_BOTH,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        resizeInterval: 5000        
    }
};

// game class
class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

export class GameInitiator {
    game: Game;

    constructor() {
        this.game = new Game(config);
    }
}