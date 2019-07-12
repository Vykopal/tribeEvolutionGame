using System;
using System.Collections.Generic;
using System.Text;
using TrevoAPI.Mappers;
using TrevoAPI.Models;
using TrevoAPI.Models.Results;
using Xunit;

namespace TrevoTests
{
    public class SimulationResultMapperTests
    {
        public SimulationResult SetupForSingleUnit(uint pId)
        {
            var mapper = new SimulationResultMapper();
            var units = new List<Unit>();
            var unit = new Unit()
            {
                Id = 1,
                PositionsLog = new List<PositionLog>()
            };
            units.Add(unit);
            unit.PositionsLog.Add(new PositionLog(0, 0, 0, 0));
            unit.PositionsLog.Add(new PositionLog(0, 1, 1, 1));
            unit.PositionsLog.Add(new PositionLog(1, 2, 2, 0));
            unit.PositionsLog.Add(new PositionLog(1, 2, 3, 1));
            unit.PositionsLog.Add(new PositionLog(2, 3, 3, 0));
            
            var result = mapper.MapToSimulationResult(units, pId, 3, new Map() { InitialX = 5, InitialY = 5, MaxX = 10, MaxY = 10 });
            return result;
        }

        [Fact]
        public void MapToSimulationResultOneUnitPlayerId()
        {
            uint pId = 1;
            var result = SetupForSingleUnit(pId);

            Assert.True(result.PlayerId == pId, "Player id not set");            
        }
        
        [Fact]
        public void MapToSimulationResultOneUnitIterationCountTest()
        {
            uint pId = 1;
            var result = SetupForSingleUnit(pId);

            Assert.True(result.UnitMovements.Count == 3, "Itaration count is not matching");            
        }

        [Fact]
        public void MapToSimulationResultOneUnitIterationValueTest()
        {
            uint pId = 1;
            var result = SetupForSingleUnit(pId);

            var tested = result.UnitMovements.Find(u => u.Iteration == 2);
            Assert.True(tested.UnitLogs[0].X == 3 && tested.UnitLogs[0].Y == 3, "Iteration 2 with position 3 3 not match");
            tested = result.UnitMovements.Find(u => u.Iteration == 1);
            Assert.True(tested.UnitLogs.Count == 2, "Iteration 1 does not contain 2 logs");
            Assert.True(tested.UnitLogs.Find(u => u.X == 2 && u.Y == 2) != null, "Iteration 1 with 2,2 not found");
            Assert.True(tested.UnitLogs.Find(u => u.X == 2 && u.Y == 3) != null, "Iteration 1 with 2,3 not found");
        }
    }
}
