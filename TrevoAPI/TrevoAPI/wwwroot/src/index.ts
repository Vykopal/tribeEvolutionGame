import { TrevoFlux, STORES, ACTIONS } from "./flux/flux";

(function myTest() {
    let flux = TrevoFlux.getInstance();

    var id = STORES.SIMULATION;
    var simStore = flux.getStore(id);
    simStore.subscribe(function (action: string) {
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
})();