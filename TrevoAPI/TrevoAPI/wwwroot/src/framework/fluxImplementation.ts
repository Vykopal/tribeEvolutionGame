import { FluxFramework } from "./framework";

export class SimulationStore extends FluxFramework.Store {
    constructor(actions: FluxFramework.ActionSet) {
        let defaultState = {};
        super(actions.getId(), defaultState, actions);

        this.addHandler("START_SIMULATION", this.startSimulationHandler);
    }

    startSimulationHandler(actionResult: object) {
        //update state accordingly
        this.state = actionResult;
    }
}


export class SimulationActions extends FluxFramework.ActionSet {
    constructor(id: string) {
        super(id);
        this.addAction("START_SIMULATION", this.startSimulationAction);
    }

    startSimulationAction(payload: object) {
        //call api
        return {
            simulationResult: payload
        };
    }
}

export class TrevoFlux extends FluxFramework.FluxApp {
    protected constructor() {
        super();
        const simId = "SIMULATION";
        this.addActionSet(new SimulationActions(simId));
        this.addStore(new SimulationStore(this.getActionSet(simId)));
    }

    static getInstance() {
        if (!TrevoFlux.instance) {
            TrevoFlux.instance = new TrevoFlux();
        }
        return TrevoFlux.instance;
    }

}
