using System;
using System.Collections.Generic;
using System.Text;

namespace AkkaTest.Actors
{
    internal class PlayerActor : BaseActor
    {
        public Guid Id { get; set; }
        public string NickName { get; set; }
        public PlayerActor() : base()
        {
        }
    }
}
