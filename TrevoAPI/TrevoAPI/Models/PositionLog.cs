using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrevoAPI.Models
{
    public class PositionLog
    {
        public PositionLog(uint iteration, int x, int y)
        {
            this.Iteration = iteration;
            this.X = x;
            this.Y = y;
        }
        public uint Iteration { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
}
