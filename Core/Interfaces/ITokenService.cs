using Core.Models;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);

    }
}