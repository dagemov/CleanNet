using Models.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Entities
{
    public class Medic
    {
        [Key]
        public int Id { get; set; }

        public int AddresId { get; set; }

        [ForeignKey(nameof(AddresId))]
        public Address Address { get; set; }

        public string FirstName { get; set; }

        public Gender Gender { get; set; }

        public string LastName { get; set; }

        public string MiddleName { get; set; }

        [StringLength(10, MinimumLength = 7)]
        public string Phone { get; set; }

        public int SpecialityId { get; set; }

        [ForeignKey(nameof(SpecialityId))]
        public Speciality Speciality { get; set; }

        public bool Status { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }
    }
}
