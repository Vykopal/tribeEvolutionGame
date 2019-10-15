using System;
using Akka.Actor;

namespace AkkaTest.Actors
{
    /// <summary>
    /// purpose of this actor is to communicate with users via websockets
    /// </summary>
    public class CommunicationActor : BaseActor
    {
        public CommunicationActor()
        {
            MessageSwitch.Add(typeof(MessagePayload), (a) => SendMessage((MessagePayload)a));
        }

        protected override void OnReceive(object message)
        {
            Log.Info("message received in Communication actor");
            if (message == null) throw new ArgumentException();
            MessageSwitch[message.GetType()]?.Invoke(message as BasePayload);
        }

        private void SendMessage(MessagePayload message)
        {
            Log.Info($"Message sent to user: {message.Message}");
        }

        public struct MessagePayload : BasePayload
        {
            public Guid RefId { get; set; }
            public string Message { get; set; }
        }
    }
}
