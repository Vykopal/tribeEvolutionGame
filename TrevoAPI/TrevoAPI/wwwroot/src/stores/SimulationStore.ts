import { ACTIONS } from "../flux/constants";
import { FluxFramework } from "../framework/framework";

export class SimulationStore extends FluxFramework.Store<SimulationState> {
    constructor(defaultState: SimulationState, actions: FluxFramework.ActionSet) {
        super(actions.getId(), defaultState, actions);

        this.addHandler(ACTIONS.START_SIMULATION, this.startSimulationHandler);
    }

    startSimulationHandler = (actionResult: SimulationState) => {
        //update state accordingly
        if (this.isValidState(actionResult)) {
            this.state = actionResult;
        }
    }

    isValidState = (state: SimulationState): boolean => {
        return !!state;
    }
}

export class SimulationState {
    playerId: string;
}