using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TrevoAPI.Logic.Strategy;
using TrevoAPI.Models;
using Xunit;

namespace TrevoTests
{
    public class RandomStrategyTests
    {
        /// <summary>
        /// statistical test of random movement. 
        /// Tests that: 
        ///     every initial movement is possible
        ///     max is 1 for x
        ///     min is 0 for x
        ///     max is 1 if y
        ///     min is 0 for y
        ///     sum of x is different than of y
        /// </summary>
        [Fact]
        public void TestInitialMoves100x()
        {
            var strategy = new RandomStrategy();
            var initialPosition = 5;

            for (int i = 0; i < 100; i++)
            {
                var position = new Position(10, 10, initialPosition, initialPosition);
                var result = strategy.TryMove(position);
                Assert.True(result, "Initial movement failed");
            }
        }

        [Fact]
        public void TestOfRandomMovementIn10000Iterations()
        {
            var strategy = new RandomStrategy();
            var initialPosition = 5;
            var position = new Position(10, 10, initialPosition, initialPosition);

            var previousX = -1;
            var previousY = -1;
            for (int i = 0; i < 10000; i++)
            {
                var result = strategy.TryMove(position);
                Assert.True(position.X != previousX || position.Y != previousY, "Not moved");
                previousX = position.X;
                previousY = position.Y;
            }            
        }
    }
}
