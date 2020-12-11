using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Claims;
using System.Web;

namespace WebAPI.Models
{
    public class DatabaseContext: IdentityDbContext
    {
        public DatabaseContext()
        : base("DatabaseContext")
        {
        }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Vote> Votes { get; set; }
        public string getUserId()
        {
            var identity = (ClaimsIdentity)HttpContext.Current.User.Identity;
            IEnumerable<Claim> claims = identity.Claims;
            var userId = "";
            foreach (var d in claims)
            {
                if (d.Type == "userId")
                    userId = d.Value;
                    
            }
            return userId;
        }
    }
}