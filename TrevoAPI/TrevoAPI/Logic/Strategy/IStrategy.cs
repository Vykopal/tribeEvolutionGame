using TrevoAPI.Models;

namespace TrevoAPI.Logic.Strategy
{
    public interface IStrategy
    {
        /// <summary>
        /// Tries to move in all directions based on strategy
        /// </summary>
        /// <returns>returns if energy should be deducted (if move was possible)</returns>
        bool TryMove(Position position);
    }
}
