using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrevoAPI.Models.Results
{
    public class UnitMovement
    {
        public uint Iteration { get; set; }
        public List<UnitLog> UnitLogs { get; set; } = new List<UnitLog>();
    }
}
