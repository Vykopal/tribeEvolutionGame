import "phaser";

export class MainScene extends Phaser.Scene {
    private phaserSprite: Phaser.GameObjects.Sprite;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload(): void {
        console.log("main scene preload");
    }

    create(): void {
        console.log("main scene create");
    }
}
