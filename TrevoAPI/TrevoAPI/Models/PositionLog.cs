﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrevoAPI.Models
{
    public class PositionLog
    {
        public PositionLog(uint iteration, int x, int y, int index)
        {
            Iteration = iteration;
            X = x;
            Y = y;
            Index = index;
        }
        public uint Iteration { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
        public int Index { get; set; }
    }
}
