import "phaser";
export class UnitsScene extends Phaser.Scene {
    constructor() {
        super({
            key: "UnitsScene"
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