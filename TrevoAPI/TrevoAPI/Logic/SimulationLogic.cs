using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrevoAPI.Logic.IStrategy;
using TrevoAPI.Models;
using TrevoAPI.Models.Input;
using TrevoAPI.Models.Results;

namespace TrevoAPI.Logic
{
    public class SimulationLogic : ISimulationLogic
    {
        private const uint MaxX = 100;
        private const uint MaxY = 100;
        private const int initialX = 50;
        private const int initialY = 50;

        public SimulationResult Simulate(uint playerId, List<Unit> units)
        {
            Setup(units);

            Start(units);
            return new SimulationResult();
        }

        private void Start(List<Unit> units)
        {
            foreach (var unit in units)
            {

                if (unit.Strategy is RandomStrategy)
                {
                    
                }
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
