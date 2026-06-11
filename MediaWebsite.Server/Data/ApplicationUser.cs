using Microsoft.AspNetCore.Identity;

namespace MediaWebsite.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string? ProfileImagePath { get; set; }

        public ICollection<UserConnection>? Connections { get; set; }
        public ICollection<UserConnection>? ConnectedBy { get; set; }
    }
}