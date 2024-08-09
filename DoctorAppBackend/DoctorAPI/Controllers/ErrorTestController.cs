using Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Entities;

namespace DoctorAPI.Controllers
{
    public class ErrorTestController : BaseApiController
    {
        private readonly DataContext _context;

        public ErrorTestController(DataContext context)
        {
           _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetNotAuthorizew()
        {
            return "You no are Authorized";
        }


        [HttpGet("not-found")]
        public ActionResult<User> GetNotFound()
        {
            var user = _context.Users.Find(-1);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }


        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var user = _context.Users.Find(-1);
            var userString = user.ToString();
            return userString;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {          
            return BadRequest("Invalid required - Bad Request");
        }
    }
}
