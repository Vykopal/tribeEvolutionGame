using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrevoAPI.Models;

namespace TrevoAPI.Logic.Strategy
{
    public class RandomStrategy : IStrategy
    {
        protected Random randomGenerator = new Random();
        protected List<int> waysOfMovement;

        protected int GetRandomNumber(int max)
        {
            return randomGenerator.Next(0, max);
        }

        private int GetWayAndRemove(int index)
        {
            var result = waysOfMovement.ElementAt(index);
            waysOfMovement.RemoveAt(index);
            return result;
        }

        private void Initiate()
        {
            waysOfMovement = new List<int>() { 0, 1, 2, 3 };
        }

        public bool TryMove(Position position)
        {
            bool result = false;
            Initiate();
            while (!result && waysOfMovement.Count > 0)
            {
                switch (GetWayAndRemove(GetRandomNumber(waysOfMovement.Count - 1)))
                {
                    case 0:
                        result = position.UpIfPossible();
                        if (result) break;
                        goto case 1;
                    case 1:
                        result = position.RightIfPossible();
                        if (result) break;
                        goto case 2;
                    case 2:
                        result = position.DownIfPossible();
                        if (result) break;
                        goto default;
                    default:
                        result = position.LeftIfPossible();
                        break;
                }
            }
            return result;
        }
    }
}
