using Akka.Actor;
using System;
using System.Collections.Generic;
using static AkkaTest.Actors.CommunicationActor;

namespace AkkaTest.Actors
{
    /// <summary>
    /// Purpose of this actor orchestrate the game. It is the root actor.
    /// </summary>
    public class GameActor : BaseActor
    {
        private IActorRef LobbyManagerRef = Context.ActorOf<LobbyManagerActor>("lobby-manager");
        private IActorRef PlayerManagerRef = Context.ActorOf<PlayerManagerActor>("player-manager");

        public GameActor() : base()
        {
        }
    }
}
