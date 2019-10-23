using AkkaTest.Actors;
using AkkaTest.Constants;
using System;
using System.Collections.Generic;
using System.Text;

namespace AkkaTest.Payloads
{
    public struct DeleteLobbyPayload : BasePayload
    {
        public Guid RefId { get; set; }
        public Guid LobbyId { get; set; }
        public Guid RequesterId { get; set; }
    }


    public struct InitiateLobbyPayload : BasePayload
    {
        public Guid RefId { get; set; }
        public Guid LobbyId { get; set; }
        public Guid OwnerPlayerId { get; set; }
        public int Size { get; set; }
        public int MaxPlayerCount { get; set; }
        public GameType GameType { get; set; }
    }

    public struct AddPlayerPayload : BasePayload
    {
        public Guid RefId { get; set; }
        public Guid PlayerId { get; set; }
    }

    public struct RemovePlayerPayload : BasePayload
    {
        public Guid RefId { get; set; }
        public Guid PlayerId { get; set; }
    }

    public struct NotifyPlayerPayload : BasePayload
    {
        public Guid RefId { get; set; }
        public Guid PlayerId { get; set; }
        public InformationMessageType MessageType { get; set; }
        public string Message { get; set; }
    }

    public struct StartGamePayload : BasePayload
    {
        public Guid RefId { get; set; }
    }

    public struct EndGamePayload : BasePayload
    {
        public Guid RefId { get; set; }
    }
}
