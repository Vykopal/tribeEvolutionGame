import "phaser";
import { WelcomeScene } from "./scenes/welcomeScene";
import { NextRoundScene } from "./scenes/nextRoundScene";
import { GameLobbyScene } from "./scenes/gameLobbyScene";
import { RoundSummaryScene } from "./scenes/roundSummaryScene";
import { UnitsScene } from "./scenes/unitsScene";

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
    scene: [WelcomeScene, GameLobbyScene, NextRoundScene, RoundSummaryScene, UnitsScene],
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

export namespace SceneKeys {
    export const WELCOME_SCENE: string = "WELCOME_SCENE";
    export const GAME_LOBBY_SCENE: string = "GAME_LOBBY_SCENE";
    export const NEXT_ROUND_SCENE: string = "NEXT_ROUND_SCENE";
    export const ROUND_SUMMARY_SCENE: string = "ROUND_SUMMARY_SCENE";
    export const UNITS_SCENE: string = "UNITS_SCENE";
}