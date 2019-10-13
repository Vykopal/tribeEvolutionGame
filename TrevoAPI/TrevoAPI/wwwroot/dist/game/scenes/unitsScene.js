import "phaser";
import { SceneKeys } from "../game";
export class UnitsScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneKeys.UNITS_SCENE
        });
    }
    preload() {
        console.log(this.scene.key + " preload");
    }
    create() {
        console.log(this.scene.key + " create");
    }
}
//# sourceMappingURL=unitsScene.js.map