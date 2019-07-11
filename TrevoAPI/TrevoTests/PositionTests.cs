using System;
using System.Collections.Generic;
using System.Text;
using TrevoAPI.Models;
using Xunit;

namespace TrevoTests
{
    public class PositionTests
    {
        [Fact]
        public void TestOfDown()
        {
            var initialPosition = 5;
            var position = new Position(10, 10, initialPosition, initialPosition);

            var result = position.DownIfPossible();
            Assert.True(result, "Not moved down");
            Assert.True(position.Y == 4, "not moved one down");

            result = position.DownIfPossible();
            Assert.True(result, "Not moved down second time");
            Assert.True(position.Y == 3, "not moved one down by 2");
        }

        [Fact]
        public void TestOfUp()
        {
            var initialPosition = 5;
            var position = new Position(10, 10, initialPosition, initialPosition);

            var result = position.UpIfPossible();
            Assert.True(result, "Not moved up");
            Assert.True(position.Y == 6, "not moved one up");

            result = position.UpIfPossible();
            Assert.True(result, "Not moved up second time");
            Assert.True(position.Y == 7, "not moved one up by 2");
        }

        [Fact]
        public void TestOfLeft()
        {
            var initialPosition = 5;
            var position = new Position(10, 10, initialPosition, initialPosition);

            var result = position.LeftIfPossible();
            Assert.True(result, "Not moved left");
            Assert.True(position.X == 4, "not moved one left");

            result = position.LeftIfPossible();
            Assert.True(result, "Not moved left second time");
            Assert.True(position.X == 3, "not moved one left by 2");
        }

        [Fact]
        public void TestOfRight()
        {
            var initialPosition = 5;
            var position = new Position(10, 10, initialPosition, initialPosition);

            var result = position.RightIfPossible();
            Assert.True(result, "Not moved right");
            Assert.True(position.X == 6, "not moved one right");

            result = position.RightIfPossible();
            Assert.True(result, "Not moved right second time");
            Assert.True(position.X == 7, "not moved one right by 2");
        }
    }
}
