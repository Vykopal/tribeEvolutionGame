using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrevoAPI.Models.Input
{
    public class SimulationInput
    {
        public uint PlayerId { get; set; }
        public List<UnitInput> Units { get; set; }
    }
}
