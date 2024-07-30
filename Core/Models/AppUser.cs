using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace Core.Models
{
    public class AppUser : IdentityUser
    {
        public string? Name { get; set; }
        public byte Age { get; set; }
        public string? Phone { get; set; }
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Status Status { get; set; }
        public string? Designation { get; set; }
    }
}