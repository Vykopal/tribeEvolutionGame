using Akka.Actor;
using Akka.Event;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace AkkaTest.Actors
{
    public abstract class BaseActor : ReceiveActor
    {
        public ILoggingAdapter Log { get; } = Context.GetLogger();

        public BaseActor()
        {
            Receive<BasePayload>((m)=> { }, LogEveryMessage);
        }

        private bool LogEveryMessage(BasePayload obj)
        {
            var json = JsonConvert.SerializeObject(obj);            
            Log.Info($"\n Message received to {GetType()}.\n\t Message: {json}\n");   
            return false;
        }
    }

    public interface BasePayload
    {
        Guid RefId { get; set; }
    }
}
