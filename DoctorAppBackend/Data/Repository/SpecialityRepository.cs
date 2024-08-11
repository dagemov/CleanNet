using Data.Interfaces.IRepository;
using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Data.Repository
{
    public class SpecialityRepository : RepositoryGeneric<Speciality>,ISpecialityRepository
    {
        private readonly DataContext _context;

        public SpecialityRepository(DataContext context) : base(context)
        {
            _context = context;
        }
             

        public void Update(Speciality speciality)
        {
            var specialityDb = _context.Specialities.FirstOrDefault(s=>s.Id == speciality.Id);

            if(specialityDb != null)
            {
                specialityDb.Name = speciality.Name;
                specialityDb.Status = speciality.Status;
                specialityDb.Description = speciality.Description;
                _context.SaveChanges();
            }
        }
    }
}
