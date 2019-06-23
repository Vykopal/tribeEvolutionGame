using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrevoAPI.Models
{
    public class Position
    {
        uint maxX;
        uint maxY;
        uint x;
        uint y;

        public uint X
        {
            get { return x; }
            set { if (value + x > maxX) { x = maxX; } else { x = value; } }
        }
        public uint Y {
            get { return y; }
            set { if (value + y > maxY) { y = maxY; } else { y = value; } }
        }

        public Position(uint maxX, uint maxY)
        {
            this.maxX = maxX;
            this.maxY = maxY;
        }

        public bool IsMaxX()
        {
            return maxX == x;
        }

        public bool IsMaxY()
        {
            return maxY == y;
        }
    }
}
