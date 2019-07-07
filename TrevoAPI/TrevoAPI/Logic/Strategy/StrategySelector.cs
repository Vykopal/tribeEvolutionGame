using System;
using TrevoAPI.Models;

namespace TrevoAPI.Logic.Strategy
{
    public class StrategySelector
    {
        public Strategy Get(MovementStrategy MOVEMENT_STRATEGY)
        {
            switch (MOVEMENT_STRATEGY)
            {
                case MovementStrategy.RANDOM:
                    return new RandomStrategy();
                default:
                    return new Strategy();
            }
        }
    }
}