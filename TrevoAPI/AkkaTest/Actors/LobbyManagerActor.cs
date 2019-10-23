using Akka.Actor;
using AkkaTest.Constants;
using AkkaTest.Payloads;
using System;
using System.Collections.Generic;
using System.Text;
using static AkkaTest.Actors.LobbyActor;

namespace AkkaTest.Actors
{
    internal class LobbyManagerActor : BaseActor
    {
        public LobbyManagerActor() : base()
        {

            Receive<CreateLobbyPayload>(m => CreateLobby(m));
            Receive<BroadcastAllLobbyInfoPayload>(m => BroadcastAllLobbyInfo(m));
        }

        protected void CreateLobby(CreateLobbyPayload payload)
        {
            // TODO: validate
            var lobbyId = Guid.NewGuid();

            var actorRef = Context.ActorOf(Props.Create<LobbyActor>(), $"lobby-{lobbyId}");
            actorRef.Tell(new InitiateLobbyPayload() { RefId = payload.RefId, LobbyId = lobbyId, GameType = payload.GameType, MaxPlayerCount = payload.MaxPlayerCount, OwnerPlayerId = payload.OwnerPlayerId, Size = payload.Size });
        }

        protected void BroadcastAllLobbyInfo(BroadcastAllLobbyInfoPayload payload)
        {
            foreach (var child in Context.GetChildren())
            {
                //TODO: child.Tell(new SendInfoToPlayersPayload() { });
            }
        }
    }
}
