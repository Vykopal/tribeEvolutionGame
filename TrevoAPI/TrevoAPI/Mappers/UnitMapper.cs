using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrevoAPI.Logic.Strategy;
using TrevoAPI.Models;
using TrevoAPI.Models.Input;

namespace TrevoAPI.Mappers
{
    public class UnitMapper
    {
        private StrategySelector _strategySelector;

        public UnitMapper(StrategySelector strategySelector)
        {
            _strategySelector = strategySelector;
        }

        public Unit MapToUnit(UnitInput input)
        {
            var output = new Unit()
            {
                Id = input.Id,
                Damage = input.Damage,
                Energy = input.Energy,
                Health = input.Health,
                Initiative = input.Initiative,
                Strategy = _strategySelector.Get(input.MOVEMENT_STRATEGY), 
                Speed = input.Speed
            };
            return output;
        }
    }
}
