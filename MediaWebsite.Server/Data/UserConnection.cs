using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MediaWebsite.Server.Data
{
    public class UserConnection
    {
        [Key, Column(Order = 0)]
        public string UserId { get; set; } = null!;

        [Key, Column(Order = 1)]
        public string ConnectedUserId { get; set; } = null!;

        // navigation props
        public ApplicationUser? User { get; set; }
        public ApplicationUser? ConnectedUser { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}