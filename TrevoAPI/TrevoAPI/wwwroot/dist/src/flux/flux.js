import { FluxFramework } from "../framework/framework";
import { SimulationActions } from "../actions/SimulationActions";
import { SimulationStore, SimulationState } from "../stores/SimulationStore";
import { STORES } from "./constants";
export class TrevoFlux extends FluxFramework.FluxApp {
    constructor() {
        super();
        const initialSimulationState = new SimulationState();
        const simId = STORES.SIMULATION;
        this.addActionSet(new SimulationActions(simId));
        this.addStore(new SimulationStore(initialSimulationState, this.getActionSet(simId)));
    }
}
TrevoFlux.getInstance = () => {
    if (!TrevoFlux.instance) {
        TrevoFlux.instance = new TrevoFlux();
    }
    return TrevoFlux.instance;
};
//# sourceMappingURL=flux.js.map