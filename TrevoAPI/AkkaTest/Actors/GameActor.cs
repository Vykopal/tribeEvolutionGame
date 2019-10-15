using Akka.Actor;
using Akka.Event;
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
        private IActorRef CoordinatorRef;
        private IActorRef CommunicatorRef = Context.ActorOf<CommunicationActor>("communication-actor");
        public GameActor()
        {
            MessageSwitch.Add(typeof(CreateGamePayload), (a)=>CreateGame((CreateGamePayload)a));
            MessageSwitch.Add(typeof(PlayersValidatedPayload), (a) => PlayersValidated((PlayersValidatedPayload)a));             
        }

        private void PlayersValidated(PlayersValidatedPayload payload)
        {
            Log.Info("Players validated:");
            foreach (var item in payload.PlayerIds)
            {
                Log.Info($"player {item} added.");
            }
            CommunicatorRef.Tell(new MessagePayload() { RefId = payload.RefId, Message = "GAME_CREATED" });
        }

        protected override void OnReceive(object message)
        {
            Log.Info("message received in GameActor");
            if (message == null) throw new ArgumentException();
            MessageSwitch[message.GetType()]?.Invoke(message as BasePayload);
        }

        private void CreateGame(CreateGamePayload payload)
        {
            if (CoordinatorRef == null) CoordinatorRef = Context.ActorOf(Props.Create<PlayerCoordinatorActor>(), $"Game-{DateTime.Now.Ticks}");
            CoordinatorRef.Tell(new PlayerCoordinatorActor.FindPlayersPayload() { PlayerIds = payload.PlayerIds });
        }


        public struct CreateGamePayload : BasePayload
        {
            public Guid RefId { get; set; }
            public List<int> PlayerIds { get; set; }            
        }

        public struct PlayersValidatedPayload : BasePayload
        {
            public Guid RefId { get; set; }
            public List<int> PlayerIds { get; set; }
        }        
    }    
}
