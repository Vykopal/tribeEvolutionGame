using Akka.Actor;
using AkkaTest.Constants;
using AkkaTest.Payloads;
using System;
using System.Collections.Generic;
using System.Text;

namespace AkkaTest.Actors
{
    internal class PlayerManagerActor : BaseActor
    {
        protected IActorRef CommunicatorRef = Context.ActorOf<CommunicationActor>("communication");
        protected IActorRef PersistanceRef = Context.ActorOf<PersistanceActor>("persistance");
        protected Dictionary<Guid, IActorRef> ConnectedPlayers = new Dictionary<Guid, IActorRef>();

        public PlayerManagerActor() : base()
        {
            Receive<InformPlayersPayload>(m => InformPlayer(m));
            Receive<ConnectPlayerPayload>(m => ConnectPlayer(m));
            Receive<DisconnectPlayerPayload>(m => DisconnectPlayer(m));
        }

        protected void InformPlayer(InformPlayersPayload payload)
        {
            payload.PlayersIds.ForEach(p =>
            {
                Log.Info($"Player {p} informed about {payload.MessageType}. Message {payload.Message}");
            });
        }

        protected void ConnectPlayer(ConnectPlayerPayload payload)
        {
            Log.Info($"Player {payload.PlayerId} connected.");
            if (!ConnectedPlayers.ContainsKey(payload.PlayerId))
            {
                ConnectedPlayers.Add(payload.PlayerId, Context.ActorOf<PlayerActor>($"player-{payload.PlayerId}"));
            }
        }

        protected void DisconnectPlayer(DisconnectPlayerPayload payload)
        {
            Log.Info($"Player {payload.PlayerId} disconnected.");
        }
    }
}
