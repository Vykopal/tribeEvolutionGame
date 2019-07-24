import { ACTIONS } from "../flux/constants";
import { FluxFramework } from "../framework/framework";
export class SimulationStore extends FluxFramework.Store {
    constructor(defaultState, actions) {
        super(actions.getId(), defaultState, actions);
        this.startSimulationHandler = (actionResult) => {
            //update state accordingly
            if (this.isValidState(actionResult)) {
                this.state = actionResult;
            }
        };
        this.isValidState = (state) => {
            return !!state;
        };
        this.addHandler(ACTIONS.START_SIMULATION, this.startSimulationHandler);
    }
}
export class SimulationState {
}
//# sourceMappingURL=SimulationStore.js.map