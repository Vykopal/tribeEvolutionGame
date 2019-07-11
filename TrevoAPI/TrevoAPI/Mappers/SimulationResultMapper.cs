using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrevoAPI.Models;
using TrevoAPI.Models.Results;

namespace TrevoAPI.Mappers
{
    public class SimulationResultMapper
    {
        public SimulationResult MapToSimulationResult(List<Unit> input)
        {
            var output = new SimulationResult();
            foreach (var unit in input)
            {
                output.unitMovements.Add(new UnitMovement { Id = unit.Id, PositionLogs = unit.PositionsLog });
            }
            return output;
        }
    }
}
