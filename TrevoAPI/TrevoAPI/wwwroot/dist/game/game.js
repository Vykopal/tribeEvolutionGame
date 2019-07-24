import "phaser";
import { MainScene } from "./scenes/mainScene";
// main game configuration
const config = {
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
        autoRound: true,
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        resizeInterval: 5000
    }
};
// game class
class Game extends Phaser.Game {
    constructor(config) {
        super(config);
    }
}
export class GameInitiator {
    constructor() {
        this.game = new Game(config);
    }
}
//# sourceMappingURL=game.js.map