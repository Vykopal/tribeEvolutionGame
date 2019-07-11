using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrevoAPI.Logic.IStrategy;

namespace TrevoAPI.Models
{
    public class Unit
    {
        public uint Id { get; set; }
        public uint Energy { get; set; }
        public uint Speed { get; set; }
        public uint Health { get; set; }
        public uint Damage { get; set; }
        public Position Position { get; set; }
        public IStrategy Strategy { get; set; }        
    }
}
