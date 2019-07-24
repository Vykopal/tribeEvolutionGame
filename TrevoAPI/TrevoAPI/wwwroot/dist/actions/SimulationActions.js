import { ACTIONS } from "../flux/constants";
import { FluxFramework } from "../framework/framework";
export class SimulationActions extends FluxFramework.ActionSet {
    constructor(id) {
        super(id);
        this.startSimulationAction = (payload) => {
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
        };
        this.addAction(ACTIONS.START_SIMULATION, this.startSimulationAction);
    }
}
//# sourceMappingURL=SimulationActions.js.map