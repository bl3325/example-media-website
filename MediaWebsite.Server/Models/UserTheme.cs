using System;
using System.ComponentModel.DataAnnotations;

namespace MediaWebsite.Server.Models
{
    public class UserTheme
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; } = null!;

        [Required]
        public string Theme { get; set; } = "light";
    }
}