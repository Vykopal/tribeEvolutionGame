import "phaser";
export class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }
    preload() {
        console.log("main scene preload");
    }
    create() {
        console.log("main scene create");
    }
}
//# sourceMappingURL=mainScene.js.map