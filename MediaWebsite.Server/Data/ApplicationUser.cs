using Microsoft.AspNetCore.Identity;

namespace MediaWebsite.Server.Data
{
    public class ApplicationUser : IdentityUser
    {
        public string? ProfileImagePath { get; set; }
    }
}
