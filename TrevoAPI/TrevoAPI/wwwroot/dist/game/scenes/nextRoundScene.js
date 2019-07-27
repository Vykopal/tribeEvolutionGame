import "phaser";
export class NextRoundScene extends Phaser.Scene {
    constructor() {
        super({
            key: "NextRoundScene"
        });
    }
    preload() {
        console.log(this.scene.key + " preload");
    }
    create() {
        console.log(this.scene.key + " create");
    }
}
//# sourceMappingURL=nextRoundScene.js.map