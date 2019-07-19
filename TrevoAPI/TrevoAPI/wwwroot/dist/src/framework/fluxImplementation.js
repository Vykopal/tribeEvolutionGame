import { FluxFramework } from "./framework";
export class SimulationStore extends FluxFramework.Store {
    constructor(actions) {
        let defaultState = {};
        super(actions.getId(), defaultState, actions);
        this.addHandler("START_SIMULATION", this.startSimulationHandler);
    }
    startSimulationHandler(actionResult) {
        //update state accordingly
        this.state = actionResult;
    }
}
export class SimulationActions extends FluxFramework.ActionSet {
    constructor(id) {
        super(id);
        this.addAction("START_SIMULATION", this.startSimulationAction);
    }
    startSimulationAction(payload) {
        //call api
        return {
            simulationResult: payload
        };
    }
}
export class TrevoFlux extends FluxFramework.FluxApp {
    setup() {
        const simId = "SIMULATION";
        this.addActionSet(new SimulationActions(simId));
        this.addStore(new SimulationStore(this.getActionSet(simId)));
    }
}
//# sourceMappingURL=fluxImplementation.js.map