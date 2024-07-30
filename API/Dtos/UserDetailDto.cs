using Core.Models;

namespace API.Dtos
{
    public class UserDetailDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Phone { get; set; }
        public Status Status { get; set; }
        public string Designation { get; set; }
    }
}