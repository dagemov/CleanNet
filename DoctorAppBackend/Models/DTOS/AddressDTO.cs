using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOS
{
    public class AddressDTO
    {
        public int Id { get; set; }
        [MinLength(1)]
        public string NameStreet { get; set; }
        [MinLength(1)]
        public string NumberStreet { get; set; }
        [MinLength(5)]
        public string ZipCode { get; set; }
        public string Description { get; set; }
    }
}
