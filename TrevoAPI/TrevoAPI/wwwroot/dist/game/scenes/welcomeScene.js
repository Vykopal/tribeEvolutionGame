import "phaser";
export class WelcomeScene extends Phaser.Scene {
    constructor() {
        super({
            key: "WelcomeScene"
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