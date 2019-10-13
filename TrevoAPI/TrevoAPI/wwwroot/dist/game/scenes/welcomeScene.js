import "phaser";
import { SceneKeys } from "../game";
export class WelcomeScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneKeys.WELCOME_SCENE
        });
    }
    preload() {
        console.log(this.scene.key + " preload");
    }
    create() {
        console.log(this.scene.key + " create");
    }
}
//# sourceMappingURL=welcomeScene.js.map