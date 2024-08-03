using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOS
{
    public class LoginUserDTO
    {
        [Required (ErrorMessage ="{0} Is required to Login")]
        public string Email { get; set; }
        [Required(ErrorMessage = "{0} Is required to Login")]
        public string Password { get; set; }
    }
}
