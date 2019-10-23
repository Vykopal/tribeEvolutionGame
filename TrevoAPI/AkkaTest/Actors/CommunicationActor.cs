using System;
using Akka.Actor;
using AkkaTest.Payloads;
using static AkkaTest.Payloads.CommunicationPayloads;

namespace AkkaTest.Actors
{
    /// <summary>
    /// purpose of this actor is to communicate with users via websockets
    /// </summary>
    public class CommunicationActor : BaseActor
    {
        public CommunicationActor() : base()
        {
            Receive<SendInfoToPlayerPayload>(m => SendInfoToPlayer(m));
            Receive<ActOnPlayersActionPayload>(m => ActOnPlayersAction(m));
            Receive<ConnectPlayerPayload>(m => ConnectPlayer(m));
            Receive<DisconnectPlayerPayload>(m => DisconnectPlayer(m));

        }

        private void DisconnectPlayer(DisconnectPlayerPayload m)
        {
            throw new NotImplementedException();
        }

        private void ConnectPlayer(ConnectPlayerPayload m)
        {
            throw new NotImplementedException();
        }

        private void ActOnPlayersAction(ActOnPlayersActionPayload m)
        {
            throw new NotImplementedException();
        }

        private void SendInfoToPlayer(SendInfoToPlayerPayload m)
        {
            throw new NotImplementedException();
        }
    }
}
