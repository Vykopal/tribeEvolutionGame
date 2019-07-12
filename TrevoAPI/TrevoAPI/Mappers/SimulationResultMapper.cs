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
        public SimulationResult MapToSimulationResult(List<Unit> units, uint playerId, uint numberOfIterations, Map map)
        {
            var result = new SimulationResult();
            result.PlayerId = playerId;
            result.Map = map;
            for (int ind = 0; ind < numberOfIterations; ind++)
            {
                var iteration = result.UnitMovements.FirstOrDefault(um => um.Iteration == ind);
                if (iteration == null)
                {
                    iteration = new UnitMovement() { Iteration = (uint)ind };
                    result.UnitMovements.Add(iteration);
                }
                foreach (var unit in units)
                {
                    foreach (var positionLog in unit.PositionsLog.Where(p => p.Iteration == ind))
                    {
                        iteration.UnitLogs.Add(new UnitLog(unit.Id, positionLog.X, positionLog.Y, positionLog.Index));
                    }
                }
            }
            return result;
        }
    }
}
