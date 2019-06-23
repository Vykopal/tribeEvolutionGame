using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrevoAPI.Models;
using TrevoAPI.Models.Input;
using TrevoAPI.Models.Results;

namespace TrevoAPI.Logic
{
    public class SimulationLogic : ISimulationLogic
    {
        public IList<MapObject> MapObjects { get; set; }
        public uint Size { get; set; }

        public SimulationResult Simulate(SimulationInput simulationInput)
        {
            return null;
        }
    }
}
