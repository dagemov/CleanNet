using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOS
{
    public class RegisterUserDTO
    {
        [Required(ErrorMessage ="{0}  Is required")]
        [StringLength(120,MinimumLength =4,ErrorMessage ="The field {0} Only can have {1} Max caracters and {2} minimum caractes")]
        public string Name { get; set; }
        [Required(ErrorMessage = "{0}  Is required")]
        public string Email { get; set; }
        [Required(ErrorMessage = "{0}  Is required")]
        [StringLength(200,MinimumLength =6)]
        public string Password { get; set; }
    }
}
