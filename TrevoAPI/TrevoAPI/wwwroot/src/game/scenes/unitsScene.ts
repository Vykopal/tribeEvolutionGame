import "phaser";
import { SceneKeys } from "../game";

export class UnitsScene extends Phaser.Scene {

    constructor() {
        super({
            key: SceneKeys.UNITS_SCENE
        });
    }

    preload(): void {
        console.log(this.scene.key + " preload");
    }

    create(): void {
        console.log(this.scene.key + " create");
    }
}
