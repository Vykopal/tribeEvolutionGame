import { Actions } from 'flummox';

export default class SimulationActions extends Actions {

    async startSimulation(simulationSetup) {
        fetch("api/simulation", {
            method: 'post',
            body: JSON.stringify(simulationSetup),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                return {
                    content: "response"
                };
            }).catch(error => {
                console.error(error);
                return {
                    content: null
                };
            });

    }
}