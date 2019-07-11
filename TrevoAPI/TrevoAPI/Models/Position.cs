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

        public int X { get; private set; }
        public int Y { get; private set; }

        public Position(uint maxX, uint maxY, int x, int y)
        {
            this.maxX = maxX;
            this.maxY = maxY;
            X = x;
            Y = y;
        }

        public bool IsMaxX()
        {
            return maxX == X;
        }

        public bool IsMaxY()
        {
            return maxY == Y;
        }

        public bool UpIfPossible()
        {
            var increasedY = Y + 1;
            if (increasedY <= maxY)
            {
                Y = increasedY;
                return true;
            }
            return false;
        }

        public bool DownIfPossible()
        {
            var decreasedY = Y - 1;
            if (decreasedY >= 0)
            {
                Y = decreasedY;
                return true;
            }
            return false;
        }

        public bool RightIfPossible()
        {
            var increasedX = X + 1;
            if (increasedX <= maxX)
            {
                X = increasedX;
                return true;
            }
            return false;
        }

        public bool LeftIfPossible()
        {
            var decreasedX = X - 1;
            if (decreasedX >= 0)
            {
                X = decreasedX;
                return true;
            }
            return false;
        }
    }
}
