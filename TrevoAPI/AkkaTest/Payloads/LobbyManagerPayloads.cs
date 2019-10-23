using AkkaTest.Actors;
using AkkaTest.Constants;
using System;
using System.Collections.Generic;
using System.Text;

namespace AkkaTest.Payloads
{
    public struct CreateLobbyPayload : BasePayload
    {
        public Guid RefId { get; set; }
        public Guid OwnerPlayerId { get; set; }
        public int Size { get; set; }
        public int MaxPlayerCount { get; set; }
        public GameType GameType { get; set; }
    }

    public struct BroadcastAllLobbyInfoPayload : BasePayload
    {
        public Guid RefId { get; set; }
        public Guid BroadcastToPlayerId { get; set; }
    }
}
