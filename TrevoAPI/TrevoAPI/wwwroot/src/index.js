import { TrevoFlux } from "./flux/flux";

function component() {
    const element = document.createElement('div');

    (function myTest() {
        console.log("test started");

        let flux = new TrevoFlux();

        var id = "SIMULATION";
        var simStore = flux.getStore(id);
        simStore.subscribe(function (action) {
            console.log(action + " happened at store " + id);
            console.log("New state: " + simStore.getState());
        });
        flux.run(id, "START_SIMULATION", { PlayerId: 1 });
        flux.run(id, "START_SIMULATION", { PlayerId: 2 });
        flux.run(id, "START_SIMULATION", { PlayerId: 3 });

        window.setTimeout(function () {
            flux.run(id, "START_SIMULATION", { PlayerId: 4 });
        }, 1000);

        window.setTimeout(function () {
            flux.run(id, "START_SIMULATION", { PlayerId: 5 });
        }, 500);
    })();

    return element;
}

document.body.appendChild(component());
