import "phaser";
import { SceneKeys } from "../game";

export class GameLobbyScene extends Phaser.Scene {

    constructor() {
        super({
            key: SceneKeys.GAME_LOBBY_SCENE
        });
    }

    preload(): void {
        console.log(this.scene.key + " preload");
    }

    create(): void {
        console.log(this.scene.key + " create");
    }
}
