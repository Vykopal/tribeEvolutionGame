using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Threading.Tasks;
using TrevoAPI.Models;

namespace TrevoAPI.Repository
{
    public class UnitRepository
    {
        public Unit Get(uint id)
        {
            return new Unit()
            {
                Id = id,
                Energy = 10,
                Position = new Position(0, 0),
                Vision = 3,
                Speed = 2,
                CarryCapacity = 2,
                PositionsLog = new List<PositionLog>()
            };
        }
    }
}
