using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MediaWebsite.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace MediaWebsite.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ConnectionsController : ControllerBase
    {
        private readonly AppDbContext _db;

        public ConnectionsController(AppDbContext db)
        {
            _db = db;
        }

        // GET api/connections/counts
        [HttpGet("counts")]
        public async Task<IActionResult> GetCounts()
        {
            var userId = User.FindFirst("sub")?.Value ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var connectionsCount = await _db.UserConnections.CountAsync(uc => uc.UserId == userId);

            // If ConnectionRequests exists, count incoming requests; otherwise return 0
            int requestsCount = 0;
            var reqEntity = _db.Model.FindEntityType(typeof(MediaWebsite.Server.Models.ConnectionRequest));
            if (reqEntity != null)
            {
                requestsCount = await _db.ConnectionRequests.CountAsync(r => r.TargetId == userId);
            }

            return Ok(new { connections = connectionsCount, requests = requestsCount });
        }

        // GET api/connections/search?query=foo
        [HttpGet("search")]
        [AllowAnonymous]
        public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] string scope = "users")
        {
            if (string.IsNullOrWhiteSpace(query)) return BadRequest();

            scope = scope?.ToLowerInvariant() ?? "users";

            switch (scope)
            {
                case "users":
                    // search every user (public)
                    var users = await _db.Users
                        .Where(u => u.UserName.Contains(query) || u.Email.Contains(query))
                        .Select(u => new { u.Id, u.UserName, u.ProfileImagePath })
                        .Take(50)
                        .ToListAsync();
                    return Ok(users);

                case "connections":
                    // search only the authenticated user's connections
                    var userId = User.FindFirst("sub")?.Value ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                    if (userId == null) return Unauthorized();

                    var connections = await _db.UserConnections
                        .Where(uc => uc.UserId == userId)
                        .Include(uc => uc.ConnectedUser)
                        .Select(uc => new { uc.ConnectedUser!.Id, uc.ConnectedUser.UserName, uc.ConnectedUser.ProfileImagePath })
                        .Where(c => c.UserName.Contains(query))
                        .Take(50)
                        .ToListAsync();

                    return Ok(connections);

                case "requests":
                    // search incoming connection requests (requires ConnectionRequests table)
                    var current = User.FindFirst("sub")?.Value ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
                    if (current == null) return Unauthorized();

                    // Ensure you add the ConnectionRequest entity + DbSet (see models/AppConnectionRequest.cs and AppDbContext)
                    var requests = await _db.ConnectionRequests
                        .Where(r => r.TargetId == current)
                        .Include(r => r.Requester)
                        .Select(r => new { r.Requester!.Id, r.Requester.UserName, r.Requester.ProfileImagePath, r.CreatedAt })
                        .Where(r => r.UserName.Contains(query))
                        .Take(50)
                        .ToListAsync();

                    return Ok(requests);

                default:
                    return BadRequest("Unsupported scope. Use 'users', 'connections' or 'requests'.");
            }
        }

        // GET api/connections
        [HttpGet]
        public async Task<IActionResult> GetMyConnections()
        {
            var userId = User.FindFirst("sub")?.Value ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            // Query only the minimal projection, order by CreatedAt for stable results
            var connections = await _db.UserConnections
                .Where(uc => uc.UserId == userId)
                .Include(uc => uc.ConnectedUser)
                .OrderByDescending(uc => uc.CreatedAt) // stable order
                .Select(uc => new
                {
                    id = uc.ConnectedUser!.Id,
                    userName = uc.ConnectedUser.UserName,
                    profileImagePath = uc.ConnectedUser.ProfileImagePath
                })
                .ToListAsync();

            return Ok(connections);
        }

        // POST api/connections/{targetId}
        [HttpPost("{targetId}")]
        public async Task<IActionResult> AddConnection(string targetId)
        {
            var userId = User.FindFirst("sub")?.Value ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();
            if (userId == targetId) return BadRequest("Cannot connect to self.");

            var exists = await _db.UserConnections.FindAsync(userId, targetId);
            if (exists != null) return Conflict("Already connected.");

            var target = await _db.Users.FindAsync(targetId);
            if (target == null) return NotFound();

            var uc = new UserConnection { UserId = userId, ConnectedUserId = targetId };
            _db.UserConnections.Add(uc);
            await _db.SaveChangesAsync();

            return Ok();
        }

        // DELETE api/connections/{targetId}
        [HttpDelete("{targetId}")]
        public async Task<IActionResult> RemoveConnection(string targetId)
        {
            var userId = User.FindFirst("sub")?.Value ?? User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Unauthorized();

            var uc = await _db.UserConnections.FindAsync(userId, targetId);
            if (uc == null) return NotFound();

            _db.UserConnections.Remove(uc);
            await _db.SaveChangesAsync();
            return Ok();
        }
    }
}