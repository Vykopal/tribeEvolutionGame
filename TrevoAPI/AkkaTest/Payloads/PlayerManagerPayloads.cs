using AkkaTest.Actors;
using AkkaTest.Constants;
using System;
using System.Collections.Generic;
using System.Text;

namespace AkkaTest.Payloads
{
    public struct InformPlayersPayload : BasePayload
    {
        public Guid RefId { get; set; }
        public List<Guid> PlayersIds { get; set; }
        public InformationMessageType MessageType { get; set; }
        public string Message { get; set; }
    }

    public struct ConnectPlayerPayload : BasePayload
    {
        public Guid RefId { get; set; }
        public Guid PlayerId { get; set; }
    }

    public struct DisconnectPlayerPayload : BasePayload
    {
        public Guid RefId { get; set; }
        public Guid PlayerId { get; set; }
    }
}
