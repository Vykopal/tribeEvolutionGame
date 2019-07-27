import "phaser";
import { WelcomeScene } from "./scenes/welcomeScene";
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
    scene: WelcomeScene,
    scale: {
        mode: Phaser.Scale.CENTER_BOTH,
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
        window.setTimeout(() => {
            this.game.scene.start(SceneKeys.GAME_LOBBY_SCENE);
        }, 500);
        window.setTimeout(() => {
            this.game.scene.start(SceneKeys.NEXT_ROUND_SCENE);
        }, 500);
        window.setTimeout(() => {
            this.game.scene.start(SceneKeys.ROUND_SUMMARY_SCENE);
        }, 500);
        window.setTimeout(() => {
            this.game.scene.start(SceneKeys.UNITS_SCENE);
        }, 500);
        window.setTimeout(() => {
            this.game.scene.start(SceneKeys.WELCOME_SCENE);
        }, 500);
    }
}
export var SceneKeys;
(function (SceneKeys) {
    SceneKeys.WELCOME_SCENE = "WELCOME_SCENE";
    SceneKeys.GAME_LOBBY_SCENE = "GAME_LOBBY_SCENE";
    SceneKeys.NEXT_ROUND_SCENE = "NEXT_ROUND_SCENE";
    SceneKeys.ROUND_SUMMARY_SCENE = "ROUND_SUMMARY_SCENE";
    SceneKeys.UNITS_SCENE = "UNITS_SCENE";
})(SceneKeys || (SceneKeys = {}));
//# sourceMappingURL=game.js.map