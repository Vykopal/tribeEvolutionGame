using AkkaTest.Actors;
using System;
using System.Collections.Generic;
using System.Text;

namespace AkkaTest.Payloads
{
    internal class CommunicationPayloads
    {
        public struct ActOnPlayersActionPayload : BasePayload
        {
            public Guid RefId { get; set; }
            public Guid PlayerId { get; set; }
        }

        public struct SendInfoToPlayerPayload : BasePayload
        {
            public Guid RefId { get; set; }
            public Guid PlayerId { get; set; }
        }
    }
}
