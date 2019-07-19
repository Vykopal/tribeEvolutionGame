import { Store } from 'flummox';

export default class SimulationStore extends Store {

    constructor(flux) {
        super(); // Don't forget this step

        const simulationActionIds = flux.getActionIds('simulation');
        this.register(simulationActionIds.startSimulation, this.handleStartSimulation);

        this.state = {
            simulationResult: {}
        };
    }

    handleStartSimulation(simulationData) {
        debugger;
        this.setState({
            simulationResult: simulationData
        });
    }
}