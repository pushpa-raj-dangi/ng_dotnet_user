using Core.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class UserDbContext : IdentityDbContext<AppUser>
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
        }

    }
}