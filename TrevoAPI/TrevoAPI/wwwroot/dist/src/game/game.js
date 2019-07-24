/// <reference path="./phaser.d.ts"/>
import "phaser";
import { MainScene } from "./scenes/mainScene";
// main game configuration
const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    parent: "game",
    scene: MainScene,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 }
        }
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