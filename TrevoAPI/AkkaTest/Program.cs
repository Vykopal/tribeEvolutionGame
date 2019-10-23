using Akka.Actor;
using AkkaTest.Actors;
using AkkaTest.Constants;
using AkkaTest.Payloads;
using System;
using static AkkaTest.Actors.LobbyActor;
using static AkkaTest.Actors.LobbyManagerActor;

namespace AkkaTest
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var sys = ActorSystem.Create("test-actor-system");
            
            var gameActor = sys.ActorOf(Props.Create<GameActor>(), "game");

            var lobbyManager = sys.ActorSelection(ActorAddresses.LOBBY_MANAGER_ACTOR);
            lobbyManager.Tell(new CreateLobbyPayload() { RefId = Guid.NewGuid(), OwnerPlayerId = Guid.NewGuid(), GameType = GameType.CASUAL, Size = 100, MaxPlayerCount = 5 });
            
            Console.ReadLine();
        }
    }
}
