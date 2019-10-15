using Akka.Actor;
using AkkaTest.Actors;
using System;

namespace AkkaTest
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var sys = ActorSystem.Create("test-actor-system");

            var gameActor = sys.ActorOf(Props.Create<GameActor>(), "game-actor");
            gameActor.Tell(new GameActor.CreateGamePayload() { RefId = new Guid(), PlayerIds = new System.Collections.Generic.List<int>() { 1, 2 } });
            Console.ReadLine();
        }
    }
}
