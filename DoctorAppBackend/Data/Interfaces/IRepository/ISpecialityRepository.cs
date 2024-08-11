using Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Interfaces.IRepository
{
    public interface ISpecialityRepository : IRepositoryGeneric<Speciality>
    {
        void Update(Speciality speciality);

    }
}
