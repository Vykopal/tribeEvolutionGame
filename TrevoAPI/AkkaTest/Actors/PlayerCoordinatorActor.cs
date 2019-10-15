using Akka.Actor;
using Akka.Event;
using System;
using System.Collections.Generic;
using static AkkaTest.Actors.GameActor;

namespace AkkaTest.Actors
{
    /// <summary>
    /// Purpose of this actor is to load and validate players
    /// </summary>
    public class PlayerCoordinatorActor : BaseActor
    {
        public PlayerCoordinatorActor()
        {
            MessageSwitch.Add(typeof(FindPlayersPayload), (a) => FindPlayers((FindPlayersPayload)a));
        }

        protected override void OnReceive(object message)
        {
            Log.Info("message received in PlayerCoordinatorActor");
            if (message == null) throw new ArgumentException();
            MessageSwitch[message.GetType()]?.Invoke(message as BasePayload);
        }

        private void FindPlayers(FindPlayersPayload payload)
        {
            Context.Parent.Tell(new GameActor.PlayersValidatedPayload() { PlayerIds = payload.PlayerIds });
            //check in db
        }

        public struct FindPlayersPayload : BasePayload
        {
            public Guid RefId { get; set; }
            public List<int> PlayerIds { get; set; }
        }
    }
}
