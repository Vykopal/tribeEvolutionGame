﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TrevoAPI.Models.Results
{
    public class SimulationResult
    {
        public List<UnitMovement> unitMovements { get; set; } = new List<UnitMovement>();
    }
}
