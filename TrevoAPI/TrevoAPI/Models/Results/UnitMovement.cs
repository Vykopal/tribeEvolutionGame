using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrevoAPI.Models.Results
{
    public class UnitMovement
    {
        public uint Id { get; set; }
        public List<PositionLog> PositionLogs { get; set; }
    }
}
