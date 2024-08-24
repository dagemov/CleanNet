using Models.Entities;
using Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.DTOS
{
    public class MedicDTO
    {
        [Key]
        public int Id { get; set; }

        public int AddresId { get; set; }
        public  string AddressName { get; set; }

        public string FirstName { get; set; }

        public Gender Gender { get; set; }

        public string LastName { get; set; }

        public string MiddleName { get; set; }

        [StringLength(10, MinimumLength = 7)]
        public string Phone { get; set; }

        public int SpecialityId { get; set; }
        public string SpecialityName { get; set; }

        public int Status { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }

        //Address Propierties

        public string NameStreet { get; set; }
        public string NumberStreet { get; set; }
        public string ZipCode { get; set; }
        public string Description { get; set; }
    }
}
