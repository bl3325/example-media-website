using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using MediaWebsite.Server.Data;
using MediaWebsite.Server.Models;

namespace MediaWebsite.Server.Controllers
{
    [ApiController]
    [Route("api/user/theme")]
    public class ThemeController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ThemeController(AppDbContext db) => _db = db;

        private string GetUserId() =>
            User.FindFirstValue(ClaimTypes.NameIdentifier) ?? User.Identity?.Name ?? string.Empty;

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetTheme()
        {
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var entry = await _db.UserThemes.FirstOrDefaultAsync(u => u.UserId == userId);
            return Ok(new { theme = entry?.Theme });
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SaveTheme([FromBody] SaveThemeRequest req)
        {
            if (req == null || string.IsNullOrEmpty(req.Theme)) return BadRequest();
            var userId = GetUserId();
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var entry = await _db.UserThemes.FirstOrDefaultAsync(u => u.UserId == userId);
            if (entry == null)
            {
                entry = new UserTheme { Id = Guid.NewGuid(), UserId = userId, Theme = req.Theme };
                _db.UserThemes.Add(entry);
            }
            else
            {
                entry.Theme = req.Theme;
                _db.UserThemes.Update(entry);
            }

            await _db.SaveChangesAsync();
            return Ok();
        }

        public record SaveThemeRequest(string Theme);
    }
}