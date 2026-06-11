using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MediaWebsite.Server.Models;

namespace MediaWebsite.Server.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<UserTheme> UserThemes { get; set; } = null!;
        public DbSet<UserConnection> UserConnections { get; set; } = null!;
        public DbSet<ConnectionRequest> ConnectionRequests { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // UserConnection
            builder.Entity<UserConnection>()
                .HasKey(uc => new { uc.UserId, uc.ConnectedUserId });

            builder.Entity<UserConnection>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.Connections)
                .HasForeignKey(uc => uc.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserConnection>()
                .HasOne(uc => uc.ConnectedUser)
                .WithMany(u => u.ConnectedBy)
                .HasForeignKey(uc => uc.ConnectedUserId)
                .OnDelete(DeleteBehavior.Cascade);

            // ConnectionRequest
            builder.Entity<ConnectionRequest>()
                .HasKey(cr => new { cr.RequesterId, cr.TargetId });

            builder.Entity<ConnectionRequest>()
                .HasOne(cr => cr.Requester)
                .WithMany()
                .HasForeignKey(cr => cr.RequesterId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<ConnectionRequest>()
                .HasOne(cr => cr.Target)
                .WithMany()
                .HasForeignKey(cr => cr.TargetId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}