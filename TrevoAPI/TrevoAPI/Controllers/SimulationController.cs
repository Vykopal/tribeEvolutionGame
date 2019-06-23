using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TrevoAPI.Models.Input;

namespace TrevoAPI.Controllers
{
    [Route("api/[controller]")]
    public class SimulationController : Controller
    {
        // POST api/values
        [HttpPost]
        public void Post([FromBody]SimulationInput input)
        {

        }
    }
}
