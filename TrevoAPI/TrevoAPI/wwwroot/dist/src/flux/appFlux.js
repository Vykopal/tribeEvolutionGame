import Flux from 'flummox';
import SimulationActions from "../actions/simulationActions";
import SimulationStore from "../stores/simulationStore";
export default class AppFlux extends Flux {
    constructor() {
        super();
        this.createActions('simulation', SimulationActions);
        // The extra argument(s) are passed to the MessageStore constructor
        this.createStore('simulation', SimulationStore, this);
    }
}
//# sourceMappingURL=appFlux.js.map