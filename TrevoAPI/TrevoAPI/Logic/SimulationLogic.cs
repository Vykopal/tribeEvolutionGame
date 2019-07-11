using System;
using System.Collections.Generic;
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
        private const uint MaxX = 100;
        private const uint MaxY = 100;
        private const int initialX = 50;
        private const int initialY = 50;

        public SimulationLogic(SimulationResultMapper simulationResultMapper)
        {
            _simulationResultMapper = simulationResultMapper;
        }

        public SimulationResult Simulate(uint playerId, List<Unit> units)
        {
            Setup(units);

            Start(units);
            return _simulationResultMapper.MapToSimulationResult(units);
        }

        private void Start(List<Unit> units)
        {
            var unitsOrdered = units.OrderBy(u => u.Initiative);
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
                        }
                    }
                    unit.PositionsLog.Add(new PositionLog(iteration, unit.Position.X, unit.Position.Y));
                }
                iteration++;
            }
        }

        private void Setup(List<Unit> units)
        {
            foreach (var unit in units)
            {
                unit.Position = new Position(MaxX, MaxY, initialX, initialY);
            }
        }
    }
}
