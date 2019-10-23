using System;
using System.Collections.Generic;
using System.Text;

namespace AkkaTest.Actors
{
    internal class PersistanceActor: BaseActor
    {
        public PersistanceActor() : base()
        {
            Receive<PlayerModelPayload>(m => HandlePlayerAction(m));
        }

        private bool HandlePlayerAction(PlayerModelPayload m)
        {
            return true;
        }

        public struct PlayerModelPayload : BasePayload
        {
            public Guid RefId { get; set; }
            public Operation Operation { get; set; }
        }

        public enum Operation
        {
            CREATE, READ, UPDATE, DELETE
        }
    }
}
