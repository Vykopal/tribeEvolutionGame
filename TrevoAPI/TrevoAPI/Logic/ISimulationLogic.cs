﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrevoAPI.Models.Input;
using TrevoAPI.Models.Results;

namespace TrevoAPI.Logic
{
    public interface ISimulationLogic
    {
        SimulationResult Simulate(SimulationInput simulationInput);
    }
}
