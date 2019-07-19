import { FluxFramework } from "../framework/framework";

export class SimulationStore extends FluxFramework.Store {
    constructor(defaultState: object, actions: FluxFramework.ActionSet) {
        super(actions.getId(), defaultState, actions);

        this.addHandler(ACTIONS.START_SIMULATION, this.startSimulationHandler);
    }

    startSimulationHandler = (actionResult: object) => {
        //update state accordingly
        this.state = actionResult;
    }
}


export class SimulationActions extends FluxFramework.ActionSet {
    constructor(id: string) {
        super(id);
        this.addAction(ACTIONS.START_SIMULATION, this.startSimulationAction);
    }

    startSimulationAction = (payload: object)  => {
        fetch("api/simulation", {
            method: 'post',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                return {
                    simulationResult: response
                };
            }).catch(error => {
                throw new Error("Failed to fetch simulation result.");
            });
    }
}

export class TrevoFlux extends FluxFramework.FluxApp {
    protected constructor() {
        super();
        const initialSimulationState = {};
        const simId = STORES.SIMULATION;
        this.addActionSet(new SimulationActions(simId));
        this.addStore(new SimulationStore(initialSimulationState, this.getActionSet(simId)));
    }

    static getInstance = () => {
        if (!TrevoFlux.instance) {
            TrevoFlux.instance = new TrevoFlux();
        }
        return TrevoFlux.instance;
    }

}

export namespace STORES {
    export const SIMULATION: string = "SIMULATION";
}

export namespace ACTIONS {
    export const START_SIMULATION: string = "START_SIMULATION";
}
