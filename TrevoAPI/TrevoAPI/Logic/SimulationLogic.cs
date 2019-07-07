using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrevoAPI.Logic.Strategy;
using TrevoAPI.Models;
using TrevoAPI.Models.Input;
using TrevoAPI.Models.Results;

namespace TrevoAPI.Logic
{
    public class SimulationLogic : ISimulationLogic
    {
        private const uint MaxX = 100;
        private const uint MaxY = 100;

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
                    bool result = false;
                    var random = new Random();
                    switch (random.Next(0, 3))
                    {
                        case 0:
                            result = unit.Position.DownIfPossible();
                            break;
                        case 1:
                            result = unit.Position.UpIfPossible();
                            break;
                        case 3:
                            result = unit.Position.RightIfPossible();
                            break;
                        default:
                            result = unit.Position.LeftIfPossible();
                            break;
                    }
                }
            }
        }

        private void Setup(List<Unit> units)
        {
            foreach (var unit in units)
            {
                unit.Position = new Position(MaxX, MaxY);
            }
        }
    }
}
