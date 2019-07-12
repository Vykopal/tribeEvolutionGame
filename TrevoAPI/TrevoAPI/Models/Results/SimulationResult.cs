using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrevoAPI.Models.Results
{
    public class SimulationResult
    {
        public uint PlayerId { get; set; }
        public Map Map { get; set; }
        public List<UnitMovement> UnitMovements { get; set; } = new List<UnitMovement>();
    }
}
