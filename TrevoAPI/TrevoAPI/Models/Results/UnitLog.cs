using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrevoAPI.Models.Results
{
    public class UnitLog
    {
        public UnitLog(uint unitId, int x, int y, int index)
        {
            UnitId = unitId;
            X = x;
            Y = y;
            Index = index;
        }
        public uint UnitId { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Index { get; set; }
    }
}
