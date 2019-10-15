using Akka.Actor;
using Akka.Event;
using System;
using System.Collections.Generic;

namespace AkkaTest.Actors
{
    public abstract class BaseActor : UntypedActor
    {

        protected readonly Dictionary<Type, Action<BasePayload>> MessageSwitch = new Dictionary<Type, Action<BasePayload>>();
        public ILoggingAdapter Log { get; } = Context.GetLogger();
    }

    public interface BasePayload
    {
        Guid RefId { get; set; }
    }
}
