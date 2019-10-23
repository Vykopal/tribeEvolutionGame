using Akka.Actor;
using AkkaTest.Constants;
using AkkaTest.Payloads;
using System;
using System.Collections.Generic;
using System.Text;
using static AkkaTest.Actors.LobbyManagerActor;
using static AkkaTest.Actors.PlayerActor;
using static AkkaTest.Actors.PlayerManagerActor;

namespace AkkaTest.Actors
{
    internal class LobbyActor : BaseActor
    {
        protected Guid Id { get; set; }
        protected string Name { get; set; }
        protected Guid OwnerId { get; set; }
        protected int Size { get; set; }
        protected int MaxPlayerCount { get; set; }
        protected GameType GameType { get; set; }
        protected List<Guid> Players { get; set; } = new List<Guid>();

        public LobbyActor() : base()
        {
            Receive<InitiateLobbyPayload>(m => CreateLobby(m));
            Receive<DeleteLobbyPayload>(m => DeleteLobby(m));
            Receive<AddPlayerPayload>(m => AddPlayer(m));
            Receive<RemovePlayerPayload>(m => RemovePlayer(m));
            Receive<StartGamePayload>(m => StartGame(m));
            Receive<EndGamePayload>(m => EndGame(m));
            Receive<NotifyPlayerPayload>(m => NotifyPlayer(m));
        }

        protected void NotifyPlayer(NotifyPlayerPayload m)
        {
            throw new NotImplementedException();
        }

        protected void EndGame(EndGamePayload m)
        {
            throw new NotImplementedException();
        }

        protected void StartGame(StartGamePayload m)
        {
            throw new NotImplementedException();
        }

        protected void RemovePlayer(RemovePlayerPayload m)
        {
            throw new NotImplementedException();
        }

        protected void AddPlayer(AddPlayerPayload m)
        {
            throw new NotImplementedException();
        }

        protected void CreateLobby(InitiateLobbyPayload payload)
        {
            // TODO: Validate    
            Id = payload.LobbyId;
            Name = $"{payload.GameType} {new Random().Next(1000, 9999)}";
            OwnerId = payload.OwnerPlayerId;
            Size = payload.Size;
            MaxPlayerCount = payload.MaxPlayerCount;
            GameType = payload.GameType;
            Players.Add(OwnerId);
        }

        protected void DeleteLobby(DeleteLobbyPayload payload)
        {
            if (payload.RequesterId.Equals(OwnerId))
            {
                var playerManager = Context.ActorSelection(ActorPath.Parse(ActorAddresses.PLAYER_MANAGER_ACTOR));
                // TODO: Validate
                playerManager.Tell(new InformPlayersPayload() { RefId = payload.RefId, Message = Id.ToString(), MessageType = InformationMessageType.LOBBY_DELETED, PlayersIds = Players });
            }
        }        
    }
}
