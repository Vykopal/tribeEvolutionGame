using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TrevoAPI.Logic;
using TrevoAPI.Mappers;
using TrevoAPI.Models;
using TrevoAPI.Models.Input;

namespace TrevoAPI.Controllers
{
    [Route("api/[controller]")]
    public class SimulationController : Controller
    {
        private readonly ISimulationLogic _simulationLogic;
        private readonly UnitMapper _unitMapper;

        public SimulationController(ISimulationLogic simulationLogic, UnitMapper unitMapper)
        {
            _simulationLogic = simulationLogic;
            _unitMapper = unitMapper;
        }
        
        [HttpPost]
        public void Post([FromBody]SimulationInput input)
        {
            input.PlayerId = 0;
            input.Units = new List<UnitInput>();
            input.Units.Add(new UnitInput() { Id = 0, Damage = 2, Energy = 10, Health = 4, Speed = 2, Initiative = 2, MOVEMENT_STRATEGY = MovementStrategy.RANDOM });
            input.Units.Add(new UnitInput() { Id = 1, Damage = 2, Energy = 8, Health = 5, Speed = 1, Initiative = 1, MOVEMENT_STRATEGY = MovementStrategy.RANDOM });

            var units = new List<Unit>();
            input.Units.ForEach(u => units.Add(_unitMapper.MapToUnit(u)));
            _simulationLogic.Simulate(input.PlayerId, units);
        }
    }
}
