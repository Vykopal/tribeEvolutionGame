using System;
using TrevoAPI.Logic;
using Xunit;

namespace TrevoTests
{
    public class SimulationTest
    {
        public SimulationTest(ISimulationLogic simulatioLogic)
        {

        }

        [Fact]
        public void SimpleTests()
        {
            var sLogic = new SimulationLogic();
            Assert.True(true);
        }
    }
}
