using System;

namespace MediaWebsite.Server.Models
{
    public class ConnectionRequest
    {
        public string RequesterId { get; set; } = null!;
        public string TargetId { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        public Data.ApplicationUser? Requester { get; set; }
        public Data.ApplicationUser? Target { get; set; }
    }
}