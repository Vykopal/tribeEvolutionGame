import "phaser";
export class RoundSummaryScene extends Phaser.Scene {
    constructor() {
        super({
            key: "RoundSummaryScene"
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