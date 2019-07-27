import "phaser";
export class GameLobbyScene extends Phaser.Scene {
    constructor() {
        super({
            key: "GameLobbyScene"
        });
    }
    preload() {
        console.log(this.scene.key + " preload");
    }
    create() {
        console.log(this.scene.key + " create");
    }
}
//# sourceMappingURL=gameLobbyScene.js.map