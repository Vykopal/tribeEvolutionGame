using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrevoAPI.Logic.IStrategy;
using TrevoAPI.Models;
using TrevoAPI.Models.Input;

namespace TrevoAPI.Mappers
{
    public interface IUnitMapper
    {
        Unit MapToUnit(UnitInput input);
    }

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
                Strategy = _strategySelector.Get(input.MOVEMENT_STRATEGY), 
                Speed = input.Speed
            };
            return output;
        }
    }
}
