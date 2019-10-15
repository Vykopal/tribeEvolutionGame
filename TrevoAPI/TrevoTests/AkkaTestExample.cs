using Akka.Actor;
using System;
using Xunit;
using AkkaTest.Actors;
using Akka.TestKit;
using Akka.Configuration;
using Akka.TestKit.Xunit2;

namespace TrevoTests
{
    public class AkkaTestExample : TestKit
    {
        [Fact]
        public void SimpleAkkaTestExample()
        {
            var result = 5;
            var probe = CreateTestProbe();
            
            //gameActor.Tell(new GameActor.CreateGamePayload() { PlayerIds = new System.Collections.Generic.List<int> { result } });
            //var response = probe.ExpectMsg<GameActor.GameCreated>(TimeSpan.FromSeconds(2));
            
            //Assert.Equal(result, response.PlayerIds[0]);
        }
    }
}
