import "phaser";
import { SceneKeys } from "../game";

export class WelcomeScene extends Phaser.Scene {

    constructor() {
        super({
            key: SceneKeys.WELCOME_SCENE
        });
    }

    preload(): void {
        console.log(this.scene.key + " preload");
    }

    create(): void {
        console.log(this.scene.key + " create");
    }
}
