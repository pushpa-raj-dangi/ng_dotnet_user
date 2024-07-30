using API.Dtos;
using API.Errors;
using Core.Interfaces;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {

        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;

        public UserController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {

            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            if (user == null) return Unauthorized(new ApiResponse<string>(400, "User not found"));

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse<string>(401, "Invalid password"));

            return Ok(new ApiResponse<UserDto>(200, "Login successful", new UserDto
            {
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            }));
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(new ApiResponse<string>(400, string.Join("; ", result.Errors.Select(e => e.Description))));

            return Ok(new ApiResponse<UserDto>(200, "User created successfully", new UserDto
            {
                Token = _tokenService.CreateToken(user),
                Email = user.Email
            }));
        }
        [Authorize]
        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<UserDetailDto>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            var userDetailDtos = users.Select(user => new UserDetailDto
            {
                Id = user.Id,
                Name = user.UserName,
                Age = user.Age,
                Phone = user.Phone,
                Status = user.Status,
                Designation = user.Designation
            })
            .ToList();

            return Ok(userDetailDtos);
        }


        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult<UserDetailDto>> CreateUser(UserCreateDto userDetailDto)
        {
            var user = new AppUser
            {
                UserName = userDetailDto.Name,
                Age = userDetailDto.Age,
                Phone = userDetailDto.Phone,
                Status = (Core.Models.Status)userDetailDto.Status,
                Designation = userDetailDto.Designation
            };

            var result = await _userManager.CreateAsync(user, "Pa$$w0rd");

            if (!result.Succeeded) return BadRequest(new ApiResponse<string>(400));

            return new UserDetailDto
            {
                Id = user.Id,
                Name = user.UserName,
                Age = user.Age,
                Phone = user.Phone,
                Status = user.Status,
                Designation = user.Designation
            };
        }


    }
}