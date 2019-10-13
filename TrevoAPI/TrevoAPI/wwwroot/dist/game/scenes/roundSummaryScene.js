import "phaser";
import { SceneKeys } from "../game";
export class RoundSummaryScene extends Phaser.Scene {
    constructor() {
        super({
            key: SceneKeys.ROUND_SUMMARY_SCENE
        });
    }
    preload() {
        console.log(this.scene.key + " preload");
    }
    create() {
        console.log(this.scene.key + " create");
    }
}
//# sourceMappingURL=roundSummaryScene.js.map