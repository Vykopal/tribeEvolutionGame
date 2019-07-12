using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TrevoAPI.Logic.Strategy;
using TrevoAPI.Mappers;
using TrevoAPI.Models;
using TrevoAPI.Models.Input;
using TrevoAPI.Models.Results;

namespace TrevoAPI.Logic
{
    public class SimulationLogic : ISimulationLogic
    {
        private SimulationResultMapper _simulationResultMapper;

        public SimulationLogic(SimulationResultMapper simulationResultMapper)
        {
            _simulationResultMapper = simulationResultMapper;
        }

        public SimulationResult Simulate(uint playerId, List<Unit> units)
        {
            ValidateInput(units, playerId);
            var map = SetupMap(units, playerId);
            var iterations = Start(units);
            return _simulationResultMapper.MapToSimulationResult(units, playerId, iterations, map);
        }

        private void ValidateInput(List<Unit> units, uint playerId)
        {
            if (playerId >= 0)
            {
                //fetch playerId from DB
                //fetch units and check availability for player and max values      
                return;
            }
            throw new ValidationException("Failed to validate simulation input");
        }

        private Map SetupMap(List<Unit> units, uint playerId)
        {
            var map = new Map();
            // based on player setup
            map.MaxX = 10;
            map.MaxY = 10;
            map.InitialX = 5;
            map.InitialY = 2;
            foreach (var unit in units)
            {
                unit.Position = new Position(map.MaxX, map.MaxY, map.InitialX, map.InitialY);
            }
            return map;
        }

        private uint Start(List<Unit> units)
        {
            var unitsOrdered = units.OrderByDescending(u => u.Initiative);
            uint iteration = 0;
            while (unitsOrdered.Any(u => u.Energy > 0))
            {
                foreach (var unit in unitsOrdered)
                {
                    for (int i = 0; i < unit.Speed; i++)
                    {
                        if (unit.Energy > 0 && unit.Strategy.TryMove(unit.Position))
                        {
                            unit.Energy--;
                            unit.PositionsLog.Add(new PositionLog(iteration, unit.Position.X, unit.Position.Y, i));
                        }
                    }
                }
                iteration++;
            }
            return iteration;
        }
    }
}
