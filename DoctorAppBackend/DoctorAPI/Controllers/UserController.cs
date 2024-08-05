using Data;
using Data.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.DTOS;
using Models.Entities;
using System.Security.Cryptography;
using System.Text;

namespace DoctorAPI.Controllers
{

    public class UserController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly ITokenService _tokenService;

        public UserController(DataContext dataContext,ITokenService tokenService)
        {
            _dataContext = dataContext;
            _tokenService = tokenService;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _dataContext.Users.ToListAsync();
            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _dataContext.Users.FindAsync(id);
            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDTO>> PostUser(RegisterUserDTO register)
        {
            if(await CheckRegister(register.Email)) return BadRequest(register.Email);

            using var hmac = new HMACSHA512(); //Liberando memoria

            var user = new User
            {
                Name = register.Name,
                Email = register.Email.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
                PasswordSalt = hmac.Key
            };

            _dataContext.Users.Add(user);
            await _dataContext.SaveChangesAsync();

            UserDTO userDTO = new()
            {
                Email = register.Email,
                Token = _tokenService.CreateToken(user),

            };

            return Ok(userDTO);
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDTO>> Login(LoginUserDTO login)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(u=>u.Email == login.Email);
            if (user == null) return Unauthorized("There aren't records match with the email : "+login.Email);

            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
            }
            UserDTO userDTO = new()
            {
                Email = login.Email,
                Token = _tokenService.CreateToken(user),

            };

            return Ok(userDTO);
        }
        private async Task<bool> CheckRegister(string email)
        {
            return await _dataContext.Users.AnyAsync(u => u.Email == email.ToLower());
        }
        
    }
}
