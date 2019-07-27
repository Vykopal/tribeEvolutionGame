import "phaser";
import { SceneKeys } from "../game";

export class NextRoundScene extends Phaser.Scene {

    constructor() {
        super({
            key: SceneKeys.NEXT_ROUND_SCENE
        });
    }

    preload(): void {
        console.log(this.scene.key + " preload");
    }

    create(): void {
        console.log(this.scene.key + " create");
    }
}
