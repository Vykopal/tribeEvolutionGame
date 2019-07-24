import { TrevoFlux } from "./flux/flux";
import { ACTIONS, STORES } from "./flux/constants";
import { GameInitiator } from "./game/game";
(function myTest() {
    let flux = TrevoFlux.getInstance();
    var id = STORES.SIMULATION;
    var simStore = flux.getStore(id);
    simStore.subscribe(function (action) {
        console.log(action + " happened at store " + id);
        console.log("New state:", JSON.stringify(simStore.getState()));
    });
    flux.run(id, ACTIONS.START_SIMULATION, { PlayerId: 1 });
    flux.run(id, ACTIONS.START_SIMULATION, { PlayerId: 2 });
    flux.run(id, ACTIONS.START_SIMULATION, { PlayerId: 3 });
    window.setTimeout(function () {
        flux.run(id, ACTIONS.START_SIMULATION, { PlayerId: 4 });
    }, 1000);
    window.setTimeout(function () {
        flux.run(id, ACTIONS.START_SIMULATION, { PlayerId: 5 });
    }, 500);
    let gameInitiator = new GameInitiator();
})();
//# sourceMappingURL=index.js.map