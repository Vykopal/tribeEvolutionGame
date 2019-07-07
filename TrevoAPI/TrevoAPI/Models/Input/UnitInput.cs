namespace TrevoAPI.Models.Input
{
    public class UnitInput
    {
        public uint Id { get; set; }
        public uint Energy { get; set; }
        public uint Speed { get; set; }
        public uint Health { get; set; }
        public uint Damage { get; set; }
        public MovementStrategy MOVEMENT_STRATEGY { get; set; }
    }
}