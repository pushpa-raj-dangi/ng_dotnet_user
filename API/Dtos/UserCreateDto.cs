using Core.Models;

namespace API.Dtos
{
    public class UserCreateDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public byte Age { get; set; }
        public string Phone { get; set; }
        public int Status { get; set; }
        public string Designation { get; set; }
    }
}