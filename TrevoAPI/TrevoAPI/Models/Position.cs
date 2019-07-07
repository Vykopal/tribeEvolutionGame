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
        }
        public uint Y
        {
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

        public bool UpIfPossible()
        {
            var increasedY = y + 1;
            if (increasedY > maxY)
            {
                y = increasedY;
                return true;
            }
            return false;
        }

        public bool DownIfPossible()
        {
            var decreasedY = y - 1;
            if (decreasedY >= 0)
            {
                y = decreasedY;
                return true;
            }
            return false;
        }

        public bool RightIfPossible()
        {
            var decreasedX = x + 1;
            if (decreasedX < maxX)
            {
                y = decreasedX;
                return true;
            }
            return false;
        }

        public bool LeftIfPossible()
        {
            var decreasedX = x - 1;
            if (decreasedX >= 0)
            {
                x = decreasedX;
                return true;
            }
            return false;
        }
    }
}
